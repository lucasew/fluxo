package graphql

import (
	"context"
	"fmt"
)

// Torrents implements query resolver for torrents
func (r *queryResolver) Torrents(ctx context.Context) ([]*Torrent, error) {
	torrents := r.manager.GetTorrents()
	result := make([]*Torrent, len(torrents))
	for i, t := range torrents {
		result[i] = MapTorrent(t)
	}
	return result, nil
}

// Torrent implements query resolver for single torrent
func (r *queryResolver) Torrent(ctx context.Context, id string) (*Torrent, error) {
	t, err := r.manager.GetTorrent(id)
	if err != nil {
		return nil, fmt.Errorf("torrent not found: %w", err)
	}
	return MapTorrent(t), nil
}

// SessionStats implements query resolver for session stats
func (r *queryResolver) SessionStats(ctx context.Context) (*SessionStats, error) {
	stats := r.manager.GetStats()
	return MapSessionStats(&stats), nil
}

// TorrentPeers implements query resolver for torrent peers
func (r *queryResolver) TorrentPeers(ctx context.Context, id string) ([]*Peer, error) {
	peers, err := r.manager.GetPeers(id)
	if err != nil {
		return nil, fmt.Errorf("getting peers: %w", err)
	}
	return MapPeers(peers), nil
}

type queryResolver struct{ *Resolver }

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}
