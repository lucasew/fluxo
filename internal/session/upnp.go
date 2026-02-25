package session

import (
	"log"
	"sync"

	"github.com/lucasew/fluxo/internal/upnp"
)

type UPNPManager struct {
	eventBus *EventBus
	subID    string
	mappings map[string]int // torrent ID -> port
	mu       sync.Mutex
	stopCh   chan struct{}
	service  *upnp.Service
}

func NewUPNPManager(eb *EventBus, service *upnp.Service) *UPNPManager {
	return &UPNPManager{
		eventBus: eb,
		mappings: make(map[string]int),
		stopCh:   make(chan struct{}),
		service:  service,
	}
}

func (m *UPNPManager) Start() {
	id, ch := m.eventBus.Subscribe()
	m.subID = id

	go func() {
		for {
			select {
			case event, ok := <-ch:
				if !ok {
					return
				}
				m.handleEvent(event)
			case <-m.stopCh:
				return
			}
		}
	}()
}

func (m *UPNPManager) Stop() {
	close(m.stopCh)
	if m.subID != "" {
		m.eventBus.Unsubscribe(m.subID)
	}

	m.mu.Lock()
	defer m.mu.Unlock()

	// Service handles clearing mappings on its Stop()
	m.mappings = make(map[string]int)
}

func (m *UPNPManager) handleEvent(event Event) {
	switch event.Type {
	case EventTorrentStarted:
		if event.Torrent != nil {
			go m.addMappingForTorrent(event.Torrent.ID(), event.Torrent.Port())
		}
	case EventTorrentStopped:
		if event.Torrent != nil {
			go m.removeMappingForTorrent(event.Torrent.ID())
		}
	}
}

func (m *UPNPManager) addMappingForTorrent(id string, port int) {
	if port <= 0 {
		return
	}

	m.mu.Lock()
	if _, exists := m.mappings[id]; exists {
		m.mu.Unlock()
		return
	}
	m.mappings[id] = port
	m.mu.Unlock()

	err := m.service.AddMapping(port, "fluxo torrent")
	if err != nil {
		log.Printf("UPnP: Failed to map port %d for torrent %s: %v", port, id, err)
		// Clean up on failure
		m.mu.Lock()
		delete(m.mappings, id)
		m.mu.Unlock()
	} else {
		log.Printf("UPnP: Mapped port %d for torrent %s", port, id)
	}
}

func (m *UPNPManager) removeMappingForTorrent(id string) {
	m.mu.Lock()
	port, exists := m.mappings[id]
	if !exists {
		m.mu.Unlock()
		return
	}
	delete(m.mappings, id)
	m.mu.Unlock()

	err := m.service.RemoveMapping(port)
	if err != nil {
		log.Printf("UPnP: Failed to unmap port %d for torrent %s: %v", port, id, err)
	} else {
		log.Printf("UPnP: Unmapped port %d for torrent %s", port, id)
	}
}
