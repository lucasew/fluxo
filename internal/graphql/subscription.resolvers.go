package graphql

import (
	"context"

	"github.com/lucasew/fluxo/internal/session"
)

// TorrentAdded implements subscription resolver
func (r *subscriptionResolver) TorrentAdded(ctx context.Context) (<-chan *Torrent, error) {
	subID, eventChan := r.manager.EventBus().Subscribe()
	out := make(chan *Torrent)

	go func() {
		defer r.manager.EventBus().Unsubscribe(subID)
		defer close(out)

		for {
			select {
			case <-ctx.Done():
				return
			case event, ok := <-eventChan:
				if !ok {
					return
				}
				if event.Type == session.EventTorrentAdded && event.Torrent != nil {
					select {
					case out <- MapTorrent(event.Torrent):
					case <-ctx.Done():
						return
					}
				}
			}
		}
	}()

	return out, nil
}

// TorrentRemoved implements subscription resolver
func (r *subscriptionResolver) TorrentRemoved(ctx context.Context) (<-chan string, error) {
	subID, eventChan := r.manager.EventBus().Subscribe()
	out := make(chan string)

	go func() {
		defer r.manager.EventBus().Unsubscribe(subID)
		defer close(out)

		for {
			select {
			case <-ctx.Done():
				return
			case event, ok := <-eventChan:
				if !ok {
					return
				}
				if event.Type == session.EventTorrentRemoved {
					select {
					case out <- event.ID:
					case <-ctx.Done():
						return
					}
				}
			}
		}
	}()

	return out, nil
}

// TorrentUpdated implements subscription resolver
func (r *subscriptionResolver) TorrentUpdated(ctx context.Context, id *string) (<-chan *Torrent, error) {
	subID, eventChan := r.manager.EventBus().Subscribe()
	out := make(chan *Torrent)

	go func() {
		defer r.manager.EventBus().Unsubscribe(subID)
		defer close(out)

		for {
			select {
			case <-ctx.Done():
				return
			case event, ok := <-eventChan:
				if !ok {
					return
				}
				if event.Type == session.EventTorrentUpdated && event.Torrent != nil {
					// Filter by ID if specified
					if id != nil && event.Torrent.ID() != *id {
						continue
					}

					select {
					case out <- MapTorrent(event.Torrent):
					case <-ctx.Done():
						return
					}
				}
			}
		}
	}()

	return out, nil
}

// StatsUpdated implements subscription resolver
func (r *subscriptionResolver) StatsUpdated(ctx context.Context) (<-chan *SessionStats, error) {
	subID, eventChan := r.manager.EventBus().Subscribe()
	out := make(chan *SessionStats)

	go func() {
		defer r.manager.EventBus().Unsubscribe(subID)
		defer close(out)

		for {
			select {
			case <-ctx.Done():
				return
			case event, ok := <-eventChan:
				if !ok {
					return
				}
				if event.Type == session.EventStatsUpdated && event.Stats != nil {
					select {
					case out <- MapSessionStats(event.Stats):
					case <-ctx.Done():
						return
					}
				}
			}
		}
	}()

	return out, nil
}

type subscriptionResolver struct{ *Resolver }

func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}
