package session

import (
	"context"
	"time"

	"github.com/cenkalti/rain/torrent"
)

// Watcher periodically polls the session state and diffs it against an in-memory cache.
// It exists because the underlying library does not natively stream granular stat changes.
type Watcher struct {
	manager  *Manager
	interval time.Duration
	cache    map[string]*torrent.Stats
}

// NewWatcher initializes a stat watcher targeting the specified polling interval.
func NewWatcher(manager *Manager, interval time.Duration) *Watcher {
	return &Watcher{
		manager:  manager,
		interval: interval,
		cache:    make(map[string]*torrent.Stats),
	}
}

// Start blocks and runs the ticker loop, dispatching EventTorrentUpdated or
// EventStatsUpdated whenever a cached diff detects a change.
func (w *Watcher) Start(ctx context.Context) {
	ticker := time.NewTicker(w.interval)
	defer ticker.Stop()

	// Initial check
	w.check()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			w.check()
		}
	}
}

func (w *Watcher) check() {
	// Get current torrents
	torrents := w.manager.GetTorrents()
	currentIDs := make(map[string]bool)

	// Check for updates
	for _, t := range torrents {
		id := t.ID()
		currentIDs[id] = true

		stats := t.Stats()

		// Check if changed
		if cached, ok := w.cache[id]; ok {
			if statsChanged(cached, &stats) {
				w.manager.eventBus.Publish(Event{
					Type:    EventTorrentUpdated,
					Torrent: t,
				})
				w.cache[id] = &stats
			}
		} else {
			// New torrent detected (not added via AddTorrent)
			w.cache[id] = &stats
		}
	}

	// Check for removed torrents
	for id := range w.cache {
		if !currentIDs[id] {
			delete(w.cache, id)
		}
	}

	// Publish stats update
	stats := w.manager.GetStats()
	w.manager.eventBus.Publish(Event{
		Type:  EventStatsUpdated,
		Stats: &stats,
	})
}

// statsChanged evaluates a subset of high-frequency fields to determine if a broadcast is necessary.
func statsChanged(old, new *torrent.Stats) bool {
	// Compare key fields that change frequently
	return old.Status != new.Status ||
		old.Bytes.Completed != new.Bytes.Completed ||
		old.Speed.Download != new.Speed.Download ||
		old.Speed.Upload != new.Speed.Upload ||
		old.Peers.Total != new.Peers.Total ||
		old.Error != new.Error
}
