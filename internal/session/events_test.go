package session

import (
	"testing"
	"time"
)

func TestEventBusSubscribePublish(t *testing.T) {
	eb := NewEventBus()
	defer eb.Close()

	id, ch := eb.Subscribe()
	if id == "" {
		t.Fatal("expected non-empty subscription id")
	}

	eb.Publish(Event{Type: EventTorrentAdded, ID: "t1"})

	select {
	case ev := <-ch:
		if ev.Type != EventTorrentAdded || ev.ID != "t1" {
			t.Fatalf("got %+v", ev)
		}
	case <-time.After(time.Second):
		t.Fatal("timeout waiting for event")
	}
}

func TestEventBusUnsubscribe(t *testing.T) {
	eb := NewEventBus()
	defer eb.Close()

	id, ch := eb.Subscribe()
	eb.Unsubscribe(id)

	// Channel should be closed
	if _, ok := <-ch; ok {
		t.Fatal("expected closed channel after unsubscribe")
	}

	// Publish must not panic with no subscribers
	eb.Publish(Event{Type: EventStatsUpdated})
}

func TestEventBusPublishDropsOldestWhenFull(t *testing.T) {
	eb := NewEventBus()
	defer eb.Close()

	_, ch := eb.Subscribe()

	// Fill the buffer (capacity 100) without a consumer.
	for i := 0; i < 100; i++ {
		eb.Publish(Event{Type: EventTorrentUpdated, ID: "old"})
	}

	// One more event must not be dropped entirely: oldest is discarded.
	eb.Publish(Event{Type: EventTorrentRemoved, ID: "critical"})

	// Drain: expect 100 events; the newest must be present; pure drop-new
	// would leave only "old" events and lose the remove.
	var sawRemove bool
	var count int
	for {
		select {
		case ev, ok := <-ch:
			if !ok {
				t.Fatal("channel closed unexpectedly")
			}
			count++
			if ev.Type == EventTorrentRemoved && ev.ID == "critical" {
				sawRemove = true
			}
			if count == 100 {
				goto done
			}
		case <-time.After(time.Second):
			t.Fatalf("timeout draining; got %d events, sawRemove=%v", count, sawRemove)
		}
	}
done:
	if !sawRemove {
		t.Fatal("expected drop-oldest to deliver EventTorrentRemoved after buffer was full")
	}
	if count != 100 {
		t.Fatalf("expected buffer still size 100, got %d", count)
	}
}

func TestEventBusClose(t *testing.T) {
	eb := NewEventBus()
	_, ch := eb.Subscribe()
	eb.Close()

	if _, ok := <-ch; ok {
		t.Fatal("expected closed channel after Close")
	}
}
