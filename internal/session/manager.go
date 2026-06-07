package session

import (
	"fmt"

	"github.com/cenkalti/rain/torrent"
)

// Manager orchestrates the underlying Rain torrent session alongside a local event bus
// and UPnP lifecycle. It acts as the central coordinator for torrent operations.
type Manager struct {
	session     *torrent.Session
	eventBus    *EventBus
	upnpManager *UPNPManager
}

// New initializes a Rain torrent session, event bus, and starts UPnP port mapping discovery.
func New(cfg torrent.Config) (*Manager, error) {
	session, err := torrent.NewSession(cfg)
	if err != nil {
		return nil, fmt.Errorf("creating session: %w", err)
	}

	eb := NewEventBus()
	upnp := NewUPNPManager(eb)
	upnp.Start()

	return &Manager{
		session:     session,
		eventBus:    eb,
		upnpManager: upnp,
	}, nil
}

// Session provides direct access to the underlying Rain session.
func (m *Manager) Session() *torrent.Session {
	return m.session
}

// EventBus exposes the centralized bus for torrent and stats lifecycle events.
func (m *Manager) EventBus() *EventBus {
	return m.eventBus
}

// AddTorrent adds a torrent via magnet link or remote URI and publishes an EventTorrentAdded.
func (m *Manager) AddTorrent(uri string, opts *torrent.AddTorrentOptions) (*torrent.Torrent, error) {
	if uri == "" {
		return nil, fmt.Errorf("%w: empty URI", ErrInvalidURI)
	}

	t, err := m.session.AddURI(uri, opts)
	if err != nil {
		// Wrap URI parsing errors
		return nil, fmt.Errorf("%w: %v", ErrInvalidURI, err)
	}

	// Publish event
	m.eventBus.Publish(Event{
		Type:    EventTorrentAdded,
		Torrent: t,
	})

	return t, nil
}

// RemoveTorrent drops a torrent from the active session and deletes its state from the database.
// Note: This does not delete actual downloaded file data from disk.
func (m *Manager) RemoveTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}

	if err := m.session.RemoveTorrent(id); err != nil {
		return fmt.Errorf("removing torrent: %w", err)
	}

	// Publish event
	m.eventBus.Publish(Event{
		Type: EventTorrentRemoved,
		ID:   id,
	})

	return nil
}

// GetTorrent retrieves an active torrent, returning an error if it does not exist.
func (m *Manager) GetTorrent(id string) (*torrent.Torrent, error) {
	t := m.session.GetTorrent(id)
	if t == nil {
		return nil, fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	return t, nil
}

// GetTorrents retrieves all currently tracked torrents in the session.
func (m *Manager) GetTorrents() []*torrent.Torrent {
	return m.session.ListTorrents()
}

// GetStats retrieves global aggregated statistics for the entire session.
func (m *Manager) GetStats() torrent.SessionStats {
	return m.session.Stats()
}

// Close halts UPnP, cleans up the event bus, and gracefully shuts down the Rain session.
func (m *Manager) Close() error {
	m.upnpManager.Stop()
	m.eventBus.Close()
	return m.session.Close()
}

// StartTorrent resumes downloading/seeding for a stopped torrent and emits EventTorrentStarted.
func (m *Manager) StartTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	err := t.Start()
	if err == nil {
		m.eventBus.Publish(Event{
			Type:    EventTorrentStarted,
			Torrent: t,
		})
	}
	return err
}

// StopTorrent halts downloading/seeding for an active torrent and emits EventTorrentStopped.
func (m *Manager) StopTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	err := t.Stop()
	if err == nil {
		m.eventBus.Publish(Event{
			Type:    EventTorrentStopped,
			Torrent: t,
		})
	}
	return err
}

// VerifyTorrent triggers a full piece hash check of the downloaded files on disk.
func (m *Manager) VerifyTorrent(id string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	return t.Verify()
}

// AnnounceTorrent manually triggers a scrape/announce to trackers for immediate peer discovery.
func (m *Manager) AnnounceTorrent(id string) {
	t := m.session.GetTorrent(id)
	if t == nil {
		return
	}
	t.Announce()
}

// AddTracker dynamically registers a new tracker URL to an existing torrent.
func (m *Manager) AddTracker(id, url string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	return t.AddTracker(url)
}

// AddPeer manually forces a connection attempt to a specific peer address.
func (m *Manager) AddPeer(id, addr string) error {
	t := m.session.GetTorrent(id)
	if t == nil {
		return fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	return t.AddPeer(addr)
}

// GetPeers retrieves a snapshot of all active peer connections for a given torrent.
func (m *Manager) GetPeers(id string) ([]torrent.Peer, error) {
	t := m.session.GetTorrent(id)
	if t == nil {
		return nil, fmt.Errorf("%w: %s", ErrTorrentNotFound, id)
	}
	return t.Peers(), nil
}

// StartAll triggers start operations across all torrents in the session.
func (m *Manager) StartAll() {
	for _, t := range m.session.ListTorrents() {
		err := t.Start()
		if err == nil {
			m.eventBus.Publish(Event{
				Type:    EventTorrentStarted,
				Torrent: t,
			})
		}
	}
}

// StopAll halts all active torrents in the session.
func (m *Manager) StopAll() {
	for _, t := range m.session.ListTorrents() {
		err := t.Stop()
		if err == nil {
			m.eventBus.Publish(Event{
				Type:    EventTorrentStopped,
				Torrent: t,
			})
		}
	}
}
