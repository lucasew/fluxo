package session

import (
	"fmt"
	"sync"

	"github.com/cenkalti/rain/torrent"
)

// EventType represents the type of event
type EventType string

const (
	EventTorrentAdded   EventType = "torrent_added"
	EventTorrentRemoved EventType = "torrent_removed"
	EventTorrentUpdated EventType = "torrent_updated"
	EventStatsUpdated   EventType = "stats_updated"
)

// Event represents an event in the system
type Event struct {
	Type    EventType
	Torrent *torrent.Torrent // nil for stats events
	Stats   *torrent.SessionStats
	ID      string // torrent ID for removed events
}

// EventBus manages event subscriptions
type EventBus struct {
	mu          sync.RWMutex
	subscribers map[string]chan Event
	nextID      int
}

// NewEventBus creates a new event bus
func NewEventBus() *EventBus {
	return &EventBus{
		subscribers: make(map[string]chan Event),
		nextID:      1,
	}
}

// Subscribe creates a new subscription and returns the channel and subscription ID
func (eb *EventBus) Subscribe() (string, <-chan Event) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	id := fmt.Sprintf("sub-%d", eb.nextID)
	eb.nextID++

	ch := make(chan Event, 100) // buffered to prevent blocking
	eb.subscribers[id] = ch

	return id, ch
}

// Unsubscribe removes a subscription
func (eb *EventBus) Unsubscribe(id string) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	if ch, ok := eb.subscribers[id]; ok {
		close(ch)
		delete(eb.subscribers, id)
	}
}

// Publish sends an event to all subscribers (non-blocking)
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

// Close closes all subscriptions
func (eb *EventBus) Close() {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	for id, ch := range eb.subscribers {
		close(ch)
		delete(eb.subscribers, id)
	}
}
