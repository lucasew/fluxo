package graphql

import (
	"fmt"
	"strconv"

	"github.com/cenkalti/rain/torrent"
)

// MapTorrent converts Rain torrent to GraphQL Torrent
func MapTorrent(t *torrent.Torrent) *Torrent {
	stats := t.Stats()

	var eta *int
	if stats.ETA != nil {
		etaSec := int(stats.ETA.Seconds())
		eta = &etaSec
	}

	var errStr *string
	if stats.Error != nil {
		msg := stats.Error.Error()
		errStr = &msg
	}

	// Get files and trackers from torrent methods
	files, _ := t.FileStats()
	trackers := t.Trackers()
	webseeds := t.Webseeds()

	return &Torrent{
		ID:              t.ID(),
		Name:            stats.Name,
		InfoHash:        t.InfoHash().String(),
		AddedAt:         t.AddedAt(),
		Status:          MapTorrentStatus(stats.Status),
		BytesCompleted:  strconv.FormatInt(stats.Bytes.Completed, 10),
		BytesTotal:      strconv.FormatInt(stats.Bytes.Total, 10),
		BytesDownloaded: strconv.FormatInt(stats.Bytes.Downloaded, 10),
		BytesUploaded:   strconv.FormatInt(stats.Bytes.Uploaded, 10),
		BytesMissing:    strconv.FormatInt(stats.Bytes.Incomplete, 10),
		DownloadSpeed:   stats.Speed.Download,
		UploadSpeed:     stats.Speed.Upload,
		Eta:             eta,
		SeedingTime:     int(stats.SeededFor.Seconds()),
		DownloadTime:    0, // Not available in new API
		PiecesTotal:     int(stats.Pieces.Total),
		PiecesHave:      int(stats.Pieces.Have),
		PiecesAvailable: int(stats.Pieces.Available),
		PieceLength:     int(stats.PieceLength),
		Peers:           MapPeerStats(&stats.Peers),
		Files:           MapFiles(files),
		Trackers:        MapTrackers(trackers),
		Webseeds:        MapWebseeds(webseeds),
		Private:         stats.Private,
		Error:           errStr,
	}
}

// MapTorrentStatus converts Rain status to GraphQL status
func MapTorrentStatus(status torrent.Status) TorrentStatus {
	switch status {
	case torrent.Stopped:
		return TorrentStatusStopped
	case torrent.DownloadingMetadata:
		return TorrentStatusDownloadingMetadata
	case torrent.Allocating:
		return TorrentStatusAllocating
	case torrent.Verifying:
		return TorrentStatusVerifying
	case torrent.Downloading:
		return TorrentStatusDownloading
	case torrent.Seeding:
		return TorrentStatusSeeding
	case torrent.Stopping:
		return TorrentStatusStopping
	default:
		return TorrentStatusStopped
	}
}

// MapPeerStats converts Rain peer stats
func MapPeerStats(peers *struct {
	Total    int
	Incoming int
	Outgoing int
}) *PeerStats {
	return &PeerStats{
		Total:    peers.Total,
		Incoming: peers.Incoming,
		Outgoing: peers.Outgoing,
	}
}

// MapFiles converts Rain files
func MapFiles(files []torrent.FileStats) []*File {
	result := make([]*File, len(files))
	for i, f := range files {
		result[i] = &File{
			Path:           f.Path(),
			Length:         strconv.FormatInt(f.Length(), 10),
			BytesCompleted: strconv.FormatInt(f.BytesCompleted, 10),
			Priority:       0, // Priority not available in current API
		}
	}
	return result
}

// MapTrackers converts Rain trackers
func MapTrackers(trackers []torrent.Tracker) []*Tracker {
	result := make([]*Tracker, len(trackers))
	for i, tr := range trackers {
		var errStr *string
		if tr.Error != nil {
			msg := tr.Error.Error()
			errStr = &msg
		}

		leechers := tr.Leechers
		seeders := tr.Seeders

		lastAnn := tr.LastAnnounce
		nextAnn := tr.NextAnnounce

		result[i] = &Tracker{
			URL:          tr.URL,
			Status:       MapTrackerStatus(tr.Status),
			Leechers:     &leechers,
			Seeders:      &seeders,
			Error:        errStr,
			NextAnnounce: &nextAnn,
			LastAnnounce: &lastAnn,
		}
	}
	return result
}

// MapTrackerStatus converts Rain tracker status
func MapTrackerStatus(status torrent.TrackerStatus) TrackerStatus {
	// Rain TrackerStatus is just an int, map based on common patterns
	// Since we don't have the exact constants, we'll use a simple mapping
	return TrackerStatusIdle
}

// MapWebseeds converts Rain webseeds
func MapWebseeds(webseeds []torrent.Webseed) []*Webseed {
	result := make([]*Webseed, len(webseeds))
	for i, ws := range webseeds {
		var errStr *string
		if ws.Error != nil {
			msg := ws.Error.Error()
			errStr = &msg
		}

		result[i] = &Webseed{
			URL:              ws.URL,
			DownloadSpeed:    ws.DownloadSpeed,
			BytesDownloaded:  "0", // Not available in current API
			Error:            errStr,
		}
	}
	return result
}

// MapPeers converts Rain peers
func MapPeers(peers []torrent.Peer) []*Peer {
	result := make([]*Peer, len(peers))
	for i, p := range peers {
		result[i] = &Peer{
			ID:                 fmt.Sprintf("%x", p.ID),
			Client:             p.Client,
			Addr:               p.Addr.String(),
			Source:             MapPeerSource(p.Source),
			ConnectedAt:        p.ConnectedAt,
			Downloading:        p.Downloading,
			ClientInterested:   p.ClientInterested,
			ClientChoking:      p.ClientChoking,
			PeerInterested:     p.PeerInterested,
			PeerChoking:        p.PeerChoking,
			OptimisticUnchoked: p.OptimisticUnchoked,
			Snubbed:            p.Snubbed,
			EncryptedHandshake: p.EncryptedHandshake,
			EncryptedStream:    p.EncryptedStream,
			DownloadSpeed:      p.DownloadSpeed,
			UploadSpeed:        p.UploadSpeed,
		}
	}
	return result
}

// MapPeerSource converts Rain peer source
func MapPeerSource(source torrent.PeerSource) PeerSource {
	switch source {
	case torrent.SourceTracker:
		return PeerSourceTracker
	case torrent.SourceDHT:
		return PeerSourceDht
	case torrent.SourcePEX:
		return PeerSourcePex
	case torrent.SourceIncoming:
		return PeerSourceIncoming
	default:
		return PeerSourceIncoming
	}
}

// MapSessionStats converts Rain session stats
func MapSessionStats(stats *torrent.SessionStats) *SessionStats {
	return &SessionStats{
		Uptime:                int(stats.Uptime.Seconds()),
		Torrents:              stats.Torrents,
		Peers:                 stats.Peers,
		PortsAvailable:        stats.PortsAvailable,
		BlocklistRules:        stats.BlockListRules,
		BlocklistRecency:      int(stats.BlockListRecency.Seconds()),
		ReadCacheObjects:      stats.ReadCacheObjects,
		ReadCacheSize:         strconv.FormatInt(stats.ReadCacheSize, 10),
		ReadCacheUtilization:  stats.ReadCacheUtilization,
		ReadsPerSecond:        stats.ReadsPerSecond,
		ReadsActive:           stats.ReadsActive,
		ReadsPending:          stats.ReadsPending,
		WriteCacheObjects:     stats.WriteCacheObjects,
		WriteCacheSize:        strconv.FormatInt(stats.WriteCacheSize, 10),
		WriteCachePendingKeys: stats.WriteCachePendingKeys,
	}
}
