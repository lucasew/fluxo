package config

import (
	"os"
	"time"

	"github.com/cenkalti/rain/torrent"
)

// Config holds all configuration for Fluxo
type Config struct {
	// API settings
	APIPort  int    `mapstructure:"api-port"`
	APIHost  string `mapstructure:"api-host"`
	Debug    bool   `mapstructure:"debug"`
	DevMode  bool   `mapstructure:"dev-mode"`
	DevProxy string `mapstructure:"dev-proxy"`

	// Watcher settings
	WatchInterval time.Duration `mapstructure:"watch-interval"`

	// Rain torrent config (embedded)
	Torrent TorrentConfig `mapstructure:",squash"`
}

// TorrentConfig wraps Rain's config with our custom defaults
type TorrentConfig struct {
	Database          string        `mapstructure:"database"`
	DataDir           string        `mapstructure:"data-dir"`
	DataDirIncludesTorrentID bool   `mapstructure:"data-dir-includes-torrent-id"`
	PortBegin         uint16        `mapstructure:"port-begin"`
	PortEnd           uint16        `mapstructure:"port-end"`
	DHTEnabled        bool          `mapstructure:"dht-enabled"`
	DHTPort           uint16        `mapstructure:"dht-port"`
	DHTHost           string        `mapstructure:"dht-host"`
	PEXEnabled        bool          `mapstructure:"pex-enabled"`
	RPCEnabled        bool          `mapstructure:"rpc-enabled"`
	RPCHost           string        `mapstructure:"rpc-host"`
	RPCPort           uint16        `mapstructure:"rpc-port"`
	MaxOpenFiles      uint          `mapstructure:"max-open-files"`
	BlocklistURL      string        `mapstructure:"blocklist-url"`
	ResumeWriteInterval time.Duration `mapstructure:"resume-write-interval"`
	HealthCheckInterval time.Duration `mapstructure:"health-check-interval"`
	HealthCheckTimeout  time.Duration `mapstructure:"health-check-timeout"`
}

// DefaultConfig returns the default configuration
func DefaultConfig() *Config {
	homeDir := getHomeDir()

	return &Config{
		APIPort:       8080,
		APIHost:       "127.0.0.1",
		Debug:         false,
		DevMode:       false,
		DevProxy:      "http://localhost:5173",
		WatchInterval: 1 * time.Second,
		Torrent: TorrentConfig{
			Database:          homeDir + "/.fluxo/session.db",
			DataDir:           homeDir + "/.fluxo/downloads",
			DataDirIncludesTorrentID: false,
			PortBegin:         50000,
			PortEnd:           60000,
			DHTEnabled:        true,
			DHTPort:           7246,
			DHTHost:           "0.0.0.0",
			PEXEnabled:        true,
			RPCEnabled:        false,
			RPCHost:           "127.0.0.1",
			RPCPort:           7245,
			MaxOpenFiles:      1024,
			BlocklistURL:      "",
			ResumeWriteInterval: 30 * time.Second,
			HealthCheckInterval: 30 * time.Second,
			HealthCheckTimeout:  5 * time.Minute,
		},
	}
}

// ToRainConfig converts TorrentConfig to Rain's torrent.Config
func (c *TorrentConfig) ToRainConfig() *torrent.Config {
	return &torrent.Config{
		Database:          c.Database,
		DataDir:           c.DataDir,
		DataDirIncludesTorrentID: c.DataDirIncludesTorrentID,
		PortBegin:         c.PortBegin,
		PortEnd:           c.PortEnd,
		DHTEnabled:        c.DHTEnabled,
		DHTPort:           c.DHTPort,
		DHTHost:           c.DHTHost,
		PEXEnabled:        c.PEXEnabled,
		RPCEnabled:        c.RPCEnabled,
		RPCHost:           c.RPCHost,
		RPCPort:           int(c.RPCPort),
		MaxOpenFiles:      uint64(c.MaxOpenFiles),
		BlocklistURL:      c.BlocklistURL,
		ResumeWriteInterval: c.ResumeWriteInterval,
		HealthCheckInterval: c.HealthCheckInterval,
		HealthCheckTimeout:  c.HealthCheckTimeout,
	}
}

func getHomeDir() string {
	// Try $HOME first
	if home := os.Getenv("HOME"); home != "" {
		return home
	}
	// Fallback to current directory
	return "."
}
