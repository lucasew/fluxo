package upnp

import (
	"context"
	"fmt"
	"net"
	"sync"
	"time"

	"github.com/cenkalti/rain/torrent"
	"github.com/huin/goupnp/dcps/internetgateway2"
	"github.com/lucasew/fluxo/internal/session"
)

// Manager handles UPnP port forwarding for torrents
type Manager struct {
	session     *session.Manager
	enabled     bool
	description string

	// UPnP client
	client *internetgateway2.WANIPConnection2

	// Port mappings tracking
	mu              sync.Mutex
	tcpMappings     map[int]bool // port -> active
	udpMappings     map[int]bool // port -> active

	// Lifecycle
	ctx    context.Context
	cancel context.CancelFunc
	wg     sync.WaitGroup
}

// Config holds UPnP manager configuration
type Config struct {
	Enabled     bool
	Description string
	DHTPort     uint16
}

// New creates a new UPnP manager
func New(sess *session.Manager, cfg Config) *Manager {
	ctx, cancel := context.WithCancel(context.Background())
	return &Manager{
		session:     sess,
		enabled:     cfg.Enabled,
		description: cfg.Description,
		tcpMappings: make(map[int]bool),
		udpMappings: make(map[int]bool),
		ctx:         ctx,
		cancel:      cancel,
	}
}

// Start initializes UPnP and sets up port forwarding
func (m *Manager) Start(dhtPort uint16) error {
	if !m.enabled {
		return nil
	}

	// Discover UPnP gateway
	client, err := m.discoverGateway()
	if err != nil {
		// Don't fail startup if UPnP is not available
		fmt.Printf("UPnP: Failed to discover gateway: %v (continuing without UPnP)\n", err)
		m.enabled = false
		return nil
	}
	m.client = client

	// Get external IP
	extIP, err := m.getExternalIP()
	if err != nil {
		fmt.Printf("UPnP: Warning - could not get external IP: %v\n", err)
	} else {
		fmt.Printf("UPnP: External IP is %s\n", extIP)
	}

	// Add DHT port mapping (UDP)
	if dhtPort > 0 {
		if err := m.addUDPMapping(int(dhtPort)); err != nil {
			fmt.Printf("UPnP: Warning - could not map DHT port %d: %v\n", dhtPort, err)
		} else {
			fmt.Printf("UPnP: Mapped DHT port UDP/%d\n", dhtPort)
		}
	}

	// Start event listener
	m.wg.Add(1)
	go m.eventListener()

	// Add existing torrents
	for _, t := range m.session.GetTorrents() {
		if port := t.Port(); port > 0 {
			if err := m.addTCPMapping(port); err != nil {
				fmt.Printf("UPnP: Warning - could not map torrent port %d: %v\n", port, err)
			}
		}
	}

	fmt.Println("UPnP: Manager started successfully")
	return nil
}

// Stop closes all port mappings and shuts down
func (m *Manager) Stop() error {
	if !m.enabled {
		return nil
	}

	fmt.Println("UPnP: Stopping and cleaning up port mappings...")
	m.cancel()
	m.wg.Wait()

	// Remove all mappings
	m.mu.Lock()
	defer m.mu.Unlock()

	for port := range m.tcpMappings {
		_ = m.deletePortMapping("TCP", port)
	}
	for port := range m.udpMappings {
		_ = m.deletePortMapping("UDP", port)
	}

	fmt.Println("UPnP: Stopped")
	return nil
}

// eventListener listens for torrent events and manages port mappings
func (m *Manager) eventListener() {
	defer m.wg.Done()

	subID, eventChan := m.session.EventBus().Subscribe()
	defer m.session.EventBus().Unsubscribe(subID)

	for {
		select {
		case <-m.ctx.Done():
			return
		case event, ok := <-eventChan:
			if !ok {
				return
			}
			m.handleEvent(event)
		}
	}
}

// handleEvent processes session events
func (m *Manager) handleEvent(event session.Event) {
	switch event.Type {
	case session.EventTorrentAdded:
		if event.Torrent != nil {
			// Wait a bit for torrent to start and get a port
			go m.waitAndMapTorrent(event.Torrent)
		}
	case session.EventTorrentRemoved:
		// Port is already closed by Rain, just clean up our tracking
		// We could try to get the port from cache if we tracked it
	}
}

// waitAndMapTorrent waits for torrent to get a port and maps it
func (m *Manager) waitAndMapTorrent(t *torrent.Torrent) {
	// Try to get port, with retries
	for i := 0; i < 10; i++ {
		port := t.Port()
		if port > 0 {
			if err := m.addTCPMapping(port); err != nil {
				fmt.Printf("UPnP: Warning - could not map torrent port %d: %v\n", port, err)
			} else {
				fmt.Printf("UPnP: Mapped torrent port TCP/%d for %s\n", port, t.Name())
			}
			return
		}
		time.Sleep(500 * time.Millisecond)
	}
}

// discoverGateway discovers the UPnP gateway
func (m *Manager) discoverGateway() (*internetgateway2.WANIPConnection2, error) {
	clients, _, err := internetgateway2.NewWANIPConnection2Clients()
	if err != nil {
		return nil, fmt.Errorf("discovering UPnP gateway: %w", err)
	}
	if len(clients) == 0 {
		return nil, fmt.Errorf("no UPnP gateway found")
	}
	return clients[0], nil
}

// getExternalIP gets the external IP address from the gateway
func (m *Manager) getExternalIP() (string, error) {
	if m.client == nil {
		return "", fmt.Errorf("no UPnP client")
	}
	ip, err := m.client.GetExternalIPAddress()
	if err != nil {
		return "", err
	}
	return ip, nil
}

// addTCPMapping adds a TCP port mapping
func (m *Manager) addTCPMapping(port int) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.tcpMappings[port] {
		return nil // Already mapped
	}

	if err := m.addPortMapping("TCP", port); err != nil {
		return err
	}

	m.tcpMappings[port] = true
	return nil
}

// addUDPMapping adds a UDP port mapping
func (m *Manager) addUDPMapping(port int) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.udpMappings[port] {
		return nil // Already mapped
	}

	if err := m.addPortMapping("UDP", port); err != nil {
		return err
	}

	m.udpMappings[port] = true
	return nil
}

// addPortMapping adds a port mapping to the gateway
func (m *Manager) addPortMapping(protocol string, port int) error {
	if m.client == nil {
		return fmt.Errorf("no UPnP client")
	}

	// Get local IP
	localIP, err := getLocalIP()
	if err != nil {
		return fmt.Errorf("getting local IP: %w", err)
	}

	// Add port mapping (external port, internal IP, internal port, description, duration in seconds)
	// Duration 0 means permanent (until reboot or manual deletion)
	err = m.client.AddPortMapping(
		"",                   // NewRemoteHost (empty = any)
		uint16(port),         // NewExternalPort
		protocol,             // NewProtocol
		uint16(port),         // NewInternalPort
		localIP,              // NewInternalClient
		true,                 // NewEnabled
		m.description,        // NewPortMappingDescription
		0,                    // NewLeaseDuration (0 = permanent)
	)
	if err != nil {
		return fmt.Errorf("adding %s/%d mapping: %w", protocol, port, err)
	}

	return nil
}

// deletePortMapping removes a port mapping
func (m *Manager) deletePortMapping(protocol string, port int) error {
	if m.client == nil {
		return fmt.Errorf("no UPnP client")
	}

	err := m.client.DeletePortMapping("", uint16(port), protocol)
	if err != nil {
		return fmt.Errorf("deleting %s/%d mapping: %w", protocol, port, err)
	}

	return nil
}

// getLocalIP gets the local IP address
func getLocalIP() (string, error) {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		return "", err
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP.String(), nil
}
