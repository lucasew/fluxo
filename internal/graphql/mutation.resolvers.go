package graphql

import (
	"context"
	"fmt"

	"github.com/cenkalti/rain/torrent"
)

// AddTorrent implements mutation resolver
func (r *mutationResolver) AddTorrent(ctx context.Context, input AddTorrentInput) (*Torrent, error) {
	opts := &torrent.AddTorrentOptions{}
	if input.Stopped != nil {
		opts.Stopped = *input.Stopped
	}
	if input.StopAfterDownload != nil {
		opts.StopAfterDownload = *input.StopAfterDownload
	}
	if input.StopAfterMetadata != nil {
		opts.StopAfterMetadata = *input.StopAfterMetadata
	}

	t, err := r.manager.AddTorrent(input.URI, opts)
	if err != nil {
		return nil, fmt.Errorf("adding torrent: %w", err)
	}

	return MapTorrent(t), nil
}

// RemoveTorrent implements mutation resolver
func (r *mutationResolver) RemoveTorrent(ctx context.Context, id string) (bool, error) {
	if err := r.manager.RemoveTorrent(id); err != nil {
		return false, err
	}
	return true, nil
}

// StartTorrent implements mutation resolver
func (r *mutationResolver) StartTorrent(ctx context.Context, id string) (bool, error) {
	if err := r.manager.StartTorrent(id); err != nil {
		return false, err
	}
	return true, nil
}

// StopTorrent implements mutation resolver
func (r *mutationResolver) StopTorrent(ctx context.Context, id string) (bool, error) {
	if err := r.manager.StopTorrent(id); err != nil {
		return false, err
	}
	return true, nil
}

// StartAllTorrents implements mutation resolver
func (r *mutationResolver) StartAllTorrents(ctx context.Context) (bool, error) {
	r.manager.StartAll()
	return true, nil
}

// StopAllTorrents implements mutation resolver
func (r *mutationResolver) StopAllTorrents(ctx context.Context) (bool, error) {
	r.manager.StopAll()
	return true, nil
}

// VerifyTorrent implements mutation resolver
func (r *mutationResolver) VerifyTorrent(ctx context.Context, id string) (bool, error) {
	if err := r.manager.VerifyTorrent(id); err != nil {
		return false, err
	}
	return true, nil
}

// AnnounceTorrent implements mutation resolver
func (r *mutationResolver) AnnounceTorrent(ctx context.Context, id string) (bool, error) {
	r.manager.AnnounceTorrent(id)
	return true, nil
}

// AddTracker implements mutation resolver
func (r *mutationResolver) AddTracker(ctx context.Context, id string, url string) (bool, error) {
	if err := r.manager.AddTracker(id, url); err != nil {
		return false, err
	}
	return true, nil
}

// AddPeer implements mutation resolver
func (r *mutationResolver) AddPeer(ctx context.Context, id string, addr string) (bool, error) {
	if err := r.manager.AddPeer(id, addr); err != nil {
		return false, err
	}
	return true, nil
}

type mutationResolver struct{ *Resolver }

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
