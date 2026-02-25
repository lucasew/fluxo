package upnp

import (
	"context"
	"fmt"
	"log"
	"net"
	"strings"
	"sync"
	"time"

	"github.com/huin/goupnp"
	"github.com/huin/goupnp/dcps/internetgateway2"
)

// Service manages UPnP discovery and port mapping
type Service struct {
	clientsMu sync.RWMutex
	clients   []*internetgateway2.WANIPConnection1

	mappedPorts   map[int]struct{}
	mappedPortsMu sync.Mutex

	discoveryOnce sync.Once
	discoveryDone chan struct{}
}

// NewService creates a new UPnP service
func NewService() *Service {
	return &Service{
		mappedPorts:   make(map[int]struct{}),
		discoveryDone: make(chan struct{}),
	}
}

// Start starts the UPnP discovery process
func (s *Service) Start() {
	go s.ensureDiscovery()
}

// Stop clears all mappings and stops the service
func (s *Service) Stop() {
	s.mappedPortsMu.Lock()
	portsToUnmap := make([]int, 0, len(s.mappedPorts))
	for port := range s.mappedPorts {
		portsToUnmap = append(portsToUnmap, port)
	}
	s.mappedPortsMu.Unlock()

	var wg sync.WaitGroup
	for _, port := range portsToUnmap {
		wg.Add(1)
		go func(p int) {
			defer wg.Done()
			_ = s.RemoveMapping(p)
		}(port)
	}

	// Wait for unmapping
	done := make(chan struct{})
	go func() {
		wg.Wait()
		close(done)
	}()

	select {
	case <-done:
	case <-time.After(5 * time.Second):
		log.Printf("UPnP: Shutdown timed out waiting for unmapping")
	}
}

func (s *Service) ensureDiscovery() {
	s.discoveryOnce.Do(func() {
		s.discover()
		close(s.discoveryDone)
	})
}

func (s *Service) discover() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	devs, err := goupnp.DiscoverDevicesCtx(ctx, internetgateway2.URN_WANConnectionDevice_1)
	if err != nil {
		log.Printf("UPnP: Discovery failed: %v", err)
		return
	}

	var newClients []*internetgateway2.WANIPConnection1
	for _, dev := range devs {
		if dev.Root == nil {
			continue
		}

		clients, err := internetgateway2.NewWANIPConnection1ClientsFromRootDevice(dev.Root, dev.Location)
		if err != nil {
			continue
		}
		newClients = append(newClients, clients...)
	}

	s.clientsMu.Lock()
	s.clients = newClients
	s.clientsMu.Unlock()

	if len(newClients) > 0 {
		log.Printf("UPnP: Discovered %d IGD clients", len(newClients))
	} else {
		log.Printf("UPnP: No IGD clients discovered")
	}
}

// AddMapping attempts to add a port mapping using UPnP
func (s *Service) AddMapping(port int, description string) error {
	// Wait for initial discovery to complete
	select {
	case <-s.discoveryDone:
	case <-time.After(15 * time.Second): // Wait longer than discovery timeout
		return fmt.Errorf("timeout waiting for UPnP discovery")
	}

	s.clientsMu.RLock()
	clients := s.clients
	s.clientsMu.RUnlock()

	if len(clients) == 0 {
		return fmt.Errorf("no UPnP clients available")
	}

	found := false
	for _, client := range clients {
		localIP, err := getLocalIPForClient(client)
		if err != nil {
			localIP, err = s.getLocalIP()
			if err != nil {
				continue
			}
		}

		err = client.AddPortMapping("", uint16(port), "UDP", uint16(port), localIP, true, description, 0)
		if err == nil {
			found = true
			break
		}
	}

	if !found {
		return fmt.Errorf("mapping failed on all devices")
	}

	s.mappedPortsMu.Lock()
	s.mappedPorts[port] = struct{}{}
	s.mappedPortsMu.Unlock()

	return nil
}

// RemoveMapping attempts to remove a port mapping using UPnP
func (s *Service) RemoveMapping(port int) error {
	s.clientsMu.RLock()
	clients := s.clients
	s.clientsMu.RUnlock()

	for _, client := range clients {
		_ = client.DeletePortMapping("", uint16(port), "UDP")
	}

	s.mappedPortsMu.Lock()
	delete(s.mappedPorts, port)
	s.mappedPortsMu.Unlock()

	return nil
}

func (s *Service) getLocalIP() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}
	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String(), nil
			}
		}
	}
	return "", fmt.Errorf("no suitable local IP found")
}

func getLocalIPForClient(client *internetgateway2.WANIPConnection1) (string, error) {
	host := client.ServiceClient.Location.Host
	if strings.Contains(host, ":") {
		h, _, err := net.SplitHostPort(host)
		if err == nil {
			host = h
		}
	}

	conn, err := net.Dial("udp", host+":80")
	if err != nil {
		return "", err
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP.String(), nil
}
