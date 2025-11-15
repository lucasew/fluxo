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

	return &Torrent{
		ID:              t.ID(),
		Name:            stats.Name,
		InfoHash:        t.InfoHash().String(),
		AddedAt:         stats.AddedAt,
		Status:          MapTorrentStatus(stats.Status),
		BytesCompleted:  strconv.FormatInt(stats.BytesCompleted, 10),
		BytesTotal:      strconv.FormatInt(stats.BytesTotal, 10),
		BytesDownloaded: strconv.FormatInt(stats.BytesDownloaded, 10),
		BytesUploaded:   strconv.FormatInt(stats.BytesUploaded, 10),
		BytesMissing:    strconv.FormatInt(stats.BytesMissing, 10),
		DownloadSpeed:   int(stats.DownloadSpeed),
		UploadSpeed:     int(stats.UploadSpeed),
		Eta:             eta,
		SeedingTime:     int(stats.SeededFor.Seconds()),
		DownloadTime:    int(stats.DownloadedFor.Seconds()),
		PiecesTotal:     int(stats.Pieces.Total),
		PiecesHave:      int(stats.Pieces.Have),
		PiecesAvailable: int(stats.Pieces.Available),
		PieceLength:     int(stats.Pieces.Length),
		Peers:           MapPeerStats(&stats.Peers),
		Files:           MapFiles(stats.Files),
		Trackers:        MapTrackers(stats.Trackers),
		Webseeds:        MapWebseeds(stats.Webseeds),
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
func MapPeerStats(peers *torrent.PeerStats) *PeerStats {
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
			Path:           f.Path,
			Length:         strconv.FormatInt(f.Length, 10),
			BytesCompleted: strconv.FormatInt(f.BytesCompleted, 10),
			Priority:       int(f.Priority),
		}
	}
	return result
}

// MapTrackers converts Rain trackers
func MapTrackers(trackers []torrent.TrackerStats) []*Tracker {
	result := make([]*Tracker, len(trackers))
	for i, tr := range trackers {
		var errStr *string
		if tr.Error != nil {
			msg := tr.Error.Error()
			errStr = &msg
		}

		var leechers, seeders *int
		if tr.Leechers != nil {
			l := *tr.Leechers
			leechers = &l
		}
		if tr.Seeders != nil {
			s := *tr.Seeders
			seeders = &s
		}

		result[i] = &Tracker{
			URL:          tr.URL,
			Status:       MapTrackerStatus(tr.Status),
			Leechers:     leechers,
			Seeders:      seeders,
			Error:        errStr,
			NextAnnounce: tr.NextAnnounce,
			LastAnnounce: tr.LastAnnounce,
		}
	}
	return result
}

// MapTrackerStatus converts Rain tracker status
func MapTrackerStatus(status torrent.TrackerStatus) TrackerStatus {
	switch status {
	case torrent.TrackerIdle:
		return TrackerStatusIdle
	case torrent.TrackerAnnouncing:
		return TrackerStatusAnnouncing
	case torrent.TrackerWaiting:
		return TrackerStatusWaiting
	case torrent.TrackerError:
		return TrackerStatusError
	default:
		return TrackerStatusIdle
	}
}

// MapWebseeds converts Rain webseeds
func MapWebseeds(webseeds []torrent.WebseedStats) []*Webseed {
	result := make([]*Webseed, len(webseeds))
	for i, ws := range webseeds {
		var errStr *string
		if ws.Error != nil {
			msg := ws.Error.Error()
			errStr = &msg
		}

		result[i] = &Webseed{
			URL:              ws.URL,
			DownloadSpeed:    int(ws.DownloadSpeed),
			BytesDownloaded:  strconv.FormatInt(ws.BytesDownloaded, 10),
			Error:            errStr,
		}
	}
	return result
}

// MapPeers converts Rain peers
func MapPeers(peers []*torrent.Peer) []*Peer {
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
			DownloadSpeed:      int(p.DownloadSpeed),
			UploadSpeed:        int(p.UploadSpeed),
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
