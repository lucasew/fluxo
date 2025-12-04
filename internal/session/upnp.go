package session

import (
	"log"
	"sync"

	"gitlab.com/NebulousLabs/go-upnp"
)

type UPnPManager struct {
	router      *upnp.IGD
	mu          sync.RWMutex
	mappedPorts map[int]string
}

func NewUPnPManager() *UPnPManager {
	m := &UPnPManager{
		mappedPorts: make(map[int]string),
	}
	go m.discover()
	return m
}

func (m *UPnPManager) discover() {
	// connect to router
	d, err := upnp.Discover()
	if err != nil {
		log.Printf("UPnP discovery failed: %v", err)
		return
	}

	m.mu.Lock()
	m.router = d

	// Apply pending mappings
	for port, desc := range m.mappedPorts {
		m.applyMapping(d, port, desc)
	}
	m.mu.Unlock()

	log.Println("UPnP router discovered")
}

func (m *UPnPManager) applyMapping(router *upnp.IGD, port int, desc string) {
	// Map both UDP and TCP using Forward (which does both)
	if err := router.Forward(uint16(port), desc); err != nil {
		log.Printf("Failed to map port %d (TCP+UDP): %v", port, err)
	} else {
		log.Printf("Mapped port %d (TCP+UDP)", port)
	}
}

func (m *UPnPManager) AddMapping(port int, desc string) {
	m.mu.Lock()
	m.mappedPorts[port] = desc
	router := m.router
	m.mu.Unlock()

	if router != nil {
		m.applyMapping(router, port, desc)
	}
}

func (m *UPnPManager) DeleteMapping(port int) {
	m.mu.Lock()
	delete(m.mappedPorts, port)
	router := m.router
	m.mu.Unlock()

	if router == nil {
		return
	}

	if err := router.Clear(uint16(port)); err != nil {
		log.Printf("Failed to unmap port %d: %v", port, err)
	} else {
		log.Printf("Unmapped port %d", port)
	}
}

func (m *UPnPManager) Close() {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.router == nil {
		return
	}

	for port := range m.mappedPorts {
		if err := m.router.Clear(uint16(port)); err != nil {
			log.Printf("Failed to close unmap port %d: %v", port, err)
		}
	}
	// Clear the map
	m.mappedPorts = make(map[int]string)
}
