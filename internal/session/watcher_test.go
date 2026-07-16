package session

import (
	"errors"
	"fmt"
	"testing"

	"github.com/cenkalti/rain/torrent"
)

func TestErrorChanged(t *testing.T) {
	tests := []struct {
		name string
		a, b error
		want bool
	}{
		{"both nil", nil, nil, false},
		{"nil to error", nil, errors.New("boom"), true},
		{"error to nil", errors.New("boom"), nil, true},
		{"same message different instances", errors.New("boom"), errors.New("boom"), false},
		{"different messages", errors.New("a"), errors.New("b"), true},
		{"wrapped same text", fmt.Errorf("boom"), errors.New("boom"), false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := errorChanged(tt.a, tt.b); got != tt.want {
				t.Fatalf("errorChanged(%v, %v) = %v, want %v", tt.a, tt.b, got, tt.want)
			}
		})
	}
}

func TestStatsChangedNameAndMetadata(t *testing.T) {
	base := &torrent.Stats{
		Name:   "magnet-hash",
		Status: torrent.DownloadingMetadata,
	}
	base.Bytes.Total = 0
	base.Bytes.Completed = 0
	base.Bytes.Uploaded = 0
	base.Pieces.Have = 0

	t.Run("name change after metadata", func(t *testing.T) {
		next := *base
		next.Name = "Real Torrent Name"
		if !statsChanged(base, &next) {
			t.Fatal("expected statsChanged when Name updates")
		}
	})

	t.Run("bytes total after metadata", func(t *testing.T) {
		next := *base
		next.Bytes.Total = 1 << 30
		if !statsChanged(base, &next) {
			t.Fatal("expected statsChanged when Bytes.Total updates")
		}
	})

	t.Run("uploaded while speed idle", func(t *testing.T) {
		next := *base
		next.Bytes.Uploaded = 1024
		if !statsChanged(base, &next) {
			t.Fatal("expected statsChanged when Bytes.Uploaded updates")
		}
	})

	t.Run("pieces have", func(t *testing.T) {
		next := *base
		next.Pieces.Have = 3
		if !statsChanged(base, &next) {
			t.Fatal("expected statsChanged when Pieces.Have updates")
		}
	})

	t.Run("unchanged", func(t *testing.T) {
		next := *base
		if statsChanged(base, &next) {
			t.Fatal("expected no change for identical stats")
		}
	})
}
