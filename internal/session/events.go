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
	EventTorrentStarted EventType = "torrent_started"
	EventTorrentStopped EventType = "torrent_stopped"
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

// Publish sends an event to all subscribers without blocking the publisher.
// If a subscriber's buffer is full, the oldest buffered event is dropped so
// the newest event is delivered. Preferring freshness avoids permanently
// losing later signals (e.g. torrent_removed) behind a backlog of updates.
func (eb *EventBus) Publish(event Event) {
	eb.mu.RLock()
	defer eb.mu.RUnlock()

	for _, ch := range eb.subscribers {
		select {
		case ch <- event:
		default:
			// Drop oldest to make room; a concurrent consumer may empty the
			// channel between the failed send and the drain — still non-blocking.
			select {
			case <-ch:
			default:
			}
			select {
			case ch <- event:
			default:
				// Still full (racing with another Publish); skip this subscriber.
			}
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
