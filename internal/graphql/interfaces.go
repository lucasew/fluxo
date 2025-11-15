package graphql

import "context"

// QueryResolver is the interface for query resolvers
type QueryResolver interface {
	Torrents(ctx context.Context) ([]*Torrent, error)
	Torrent(ctx context.Context, id string) (*Torrent, error)
	SessionStats(ctx context.Context) (*SessionStats, error)
	TorrentPeers(ctx context.Context, id string) ([]*Peer, error)
}

// MutationResolver is the interface for mutation resolvers
type MutationResolver interface {
	AddTorrent(ctx context.Context, input AddTorrentInput) (*Torrent, error)
	RemoveTorrent(ctx context.Context, id string) (bool, error)
	StartTorrent(ctx context.Context, id string) (bool, error)
	StopTorrent(ctx context.Context, id string) (bool, error)
	StartAllTorrents(ctx context.Context) (bool, error)
	StopAllTorrents(ctx context.Context) (bool, error)
	VerifyTorrent(ctx context.Context, id string) (bool, error)
	AnnounceTorrent(ctx context.Context, id string) (bool, error)
	AddTracker(ctx context.Context, id string, url string) (bool, error)
	AddPeer(ctx context.Context, id string, addr string) (bool, error)
}

// SubscriptionResolver is the interface for subscription resolvers
type SubscriptionResolver interface {
	TorrentAdded(ctx context.Context) (<-chan *Torrent, error)
	TorrentRemoved(ctx context.Context) (<-chan string, error)
	TorrentUpdated(ctx context.Context, id *string) (<-chan *Torrent, error)
	StatsUpdated(ctx context.Context) (<-chan *SessionStats, error)
}

// ResolverRoot is the root interface
type ResolverRoot interface {
	Query() QueryResolver
	Mutation() MutationResolver
	Subscription() SubscriptionResolver
}
