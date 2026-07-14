package config

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/spf13/cobra"
)

func TestLoadKeepsDefaultPaths(t *testing.T) {
	cmd := &cobra.Command{Use: "fluxo"}
	AddFlags(cmd)
	if err := cmd.ParseFlags([]string{}); err != nil {
		t.Fatal(err)
	}
	cfg, err := Load(cmd)
	if err != nil {
		t.Fatal(err)
	}

	home, err := os.UserHomeDir()
	if err != nil {
		// DefaultConfig falls back to $HOME env or "."; mirror getHomeDir for assert
		home = os.Getenv("HOME")
		if home == "" {
			home = "."
		}
	}
	// getHomeDir prefers $HOME over UserHomeDir — match that
	if h := os.Getenv("HOME"); h != "" {
		home = h
	}

	wantDB := filepath.Join(home, ".fluxo", "session.db")
	wantData := filepath.Join(home, ".fluxo", "downloads")
	// DefaultConfig uses string concat not Join — keep same form
	wantDB = home + "/.fluxo/session.db"
	wantData = home + "/.fluxo/downloads"

	if cfg.Torrent.Database != wantDB {
		t.Errorf("Database = %q, want %q", cfg.Torrent.Database, wantDB)
	}
	if cfg.Torrent.DataDir != wantData {
		t.Errorf("DataDir = %q, want %q", cfg.Torrent.DataDir, wantData)
	}
}

func TestLoadExplicitDatabaseOverride(t *testing.T) {
	cmd := &cobra.Command{Use: "fluxo"}
	AddFlags(cmd)
	if err := cmd.ParseFlags([]string{"--database", "/tmp/custom.db", "--data-dir", "/tmp/dl"}); err != nil {
		t.Fatal(err)
	}
	cfg, err := Load(cmd)
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Torrent.Database != "/tmp/custom.db" {
		t.Errorf("Database = %q, want /tmp/custom.db", cfg.Torrent.Database)
	}
	if cfg.Torrent.DataDir != "/tmp/dl" {
		t.Errorf("DataDir = %q, want /tmp/dl", cfg.Torrent.DataDir)
	}
}
