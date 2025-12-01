package session

import (
	"fmt"

	"github.com/cenkalti/rain/torrent"
)

// Manager wraps Rain's session and provides event bus
type Manager struct {
	session  *torrent.Session
	eventBus *EventBus
}

// New creates a new session manager
func New(cfg torrent.Config) (*Manager, error) {
	session, err := torrent.NewSession(cfg)
	if err != nil {
		return nil, fmt.Errorf("creating session: %w", err)
	}

	return &Manager{
		session:  session,
		eventBus: NewEventBus(),
	}, nil
}

// Session returns the underlying Rain session
func (m *Manager) Session() *torrent.Session {
	return m.session
}

// EventBus returns the event bus
func (m *Manager) EventBus() *EventBus {
	return m.eventBus
}

// AddTorrent adds a new torrent
func (m *Manager) AddTorrent(uri string, opts *torrent.AddTorrentOptions) (*torrent.Torrent, error) {
	t, err := m.session.AddURI(uri, opts)
	if err != nil {
		return nil, err
	}

	// Publish event
	m.eventBus.Publish(Event{
		Type:    EventTorrentAdded,
		Torrent: t,
	})

	return t, nil
}

// RemoveTorrent removes a torrent
func (m *Manager) RemoveTorrent(id string) error {
	if err := m.session.RemoveTorrent(id); err != nil {
		return err
	}

	// Publish event
	m.eventBus.Publish(Event{
		Type: EventTorrentRemoved,
		ID:   id,
	})

	return nil
}

// GetTorrent returns a torrent by ID
func (m *Manager) GetTorrent(id string) (*torrent.Torrent, error) {
	t := m.session.GetTorrent(id)
	if t == nil {
		return nil, fmt.Errorf("torrent not found: %s", id)
	}
	return t, nil
}

// GetTorrents returns all torrents
func (m *Manager) GetTorrents() []*torrent.Torrent {
	return m.session.ListTorrents()
}

// GetStats returns session statistics
func (m *Manager) GetStats() torrent.SessionStats {
	return m.session.Stats()
}

// Close closes the session and event bus
func (m *Manager) Close() error {
	m.eventBus.Close()
	return m.session.Close()
}

// StartTorrent starts a torrent
func (m *Manager) StartTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("torrent not found: %s", id)
	}
	return t.Start()
}

// StopTorrent stops a torrent
func (m *Manager) StopTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("torrent not found: %s", id)
	}
	return t.Stop()
}

// VerifyTorrent verifies a torrent's data
func (m *Manager) VerifyTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("torrent not found: %s", id)
	}
	return t.Verify()
}

// AnnounceTorrent forces an announce to trackers
func (m *Manager) AnnounceTorrent(id string) {
	t := m.session.GetTorrent(id)
	if t == nil {
		return
	}
	t.Announce()
}

// AddTracker adds a tracker to a torrent
func (m *Manager) AddTracker(id, url string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("torrent not found: %s", id)
	}
	return t.AddTracker(url)
}

// AddPeer adds a peer to a torrent
func (m *Manager) AddPeer(id, addr string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("torrent not found: %s", id)
	}
	return t.AddPeer(addr)
}

// GetPeers returns peers for a torrent
func (m *Manager) GetPeers(id string) ([]torrent.Peer, error) {
	t := m.session.GetTorrent(id)
	if t == nil {
		return nil, fmt.Errorf("torrent not found: %s", id)
	}
	return t.Peers(), nil
}

// StartAll starts all torrents
func (m *Manager) StartAll() {
	for _, t := range m.session.ListTorrents() {
		_ = t.Start()
	}
}

// StopAll stops all torrents
func (m *Manager) StopAll() {
	for _, t := range m.session.ListTorrents() {
		_ = t.Stop()
	}
}
