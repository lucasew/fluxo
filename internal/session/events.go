package session

import (
	"fmt"
	"sync"

	"github.com/cenkalti/rain/torrent"
)

// EventType defines constants for specific domain events occurring within the session.
type EventType string

const (
	EventTorrentAdded   EventType = "torrent_added"
	EventTorrentRemoved EventType = "torrent_removed"
	EventTorrentUpdated EventType = "torrent_updated"
	EventTorrentStarted EventType = "torrent_started"
	EventTorrentStopped EventType = "torrent_stopped"
	EventStatsUpdated   EventType = "stats_updated"
)

// Event represents a single state change or data snapshot in the system.
// Depending on EventType, either Torrent, Stats, or ID will be populated.
type Event struct {
	Type    EventType
	Torrent *torrent.Torrent // nil for stats events
	Stats   *torrent.SessionStats
	ID      string // torrent ID for removed events
}

// EventBus manages thread-safe broadcast pub/sub routing for application events.
type EventBus struct {
	mu          sync.RWMutex
	subscribers map[string]chan Event
	nextID      int
}

// NewEventBus initializes an empty broadcast hub for event distribution.
func NewEventBus() *EventBus {
	return &EventBus{
		subscribers: make(map[string]chan Event),
		nextID:      1,
	}
}

// Subscribe allocates a new buffered channel (capacity 100) and returns its ID.
// Callers *must* invoke Unsubscribe when finished to prevent memory/goroutine leaks.
func (eb *EventBus) Subscribe() (string, <-chan Event) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	id := fmt.Sprintf("sub-%d", eb.nextID)
	eb.nextID++

	ch := make(chan Event, 100) // buffered to prevent blocking
	eb.subscribers[id] = ch

	return id, ch
}

// Unsubscribe safely removes a subscriber and closes its channel, freeing resources.
func (eb *EventBus) Unsubscribe(id string) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	if ch, ok := eb.subscribers[id]; ok {
		close(ch)
		delete(eb.subscribers, id)
	}
}

// Publish broadcasts an event to all active subscribers.
// Uses a non-blocking select; if a subscriber's buffer is full, the event is dropped for them.
func (eb *EventBus) Publish(event Event) {
	eb.mu.RLock()
	defer eb.mu.RUnlock()

	for _, ch := range eb.subscribers {
		select {
		case ch <- event:
		default:
			// Skip if channel is full (non-blocking)
		}
	}
}

// Close forcefully drains and shuts down all active subscriptions.
func (eb *EventBus) Close() {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	for id, ch := range eb.subscribers {
		close(ch)
		delete(eb.subscribers, id)
	}
}
