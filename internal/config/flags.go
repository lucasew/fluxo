package config

import (
	"time"

	"github.com/spf13/cobra"
)

// AddFlags adds all configuration flags to the command
func AddFlags(cmd *cobra.Command) {
	flags := cmd.Flags()

	// Config file
	flags.String("config", "", "config file path")

	// API settings
	flags.Int("api-port", 8080, "API server port")
	flags.String("api-host", "127.0.0.1", "API server host")
	flags.Bool("debug", false, "enable debug logging")
	flags.Bool("dev-mode", false, "development mode (proxy to Vite)")
	flags.String("dev-proxy", "http://localhost:5173", "Vite dev server URL")

	// Watcher settings
	flags.Duration("watch-interval", 1*time.Second, "torrent watch interval")

	// Rain/Torrent settings
	flags.String("database", "", "path to session database")
	flags.String("data-dir", "", "path to downloads directory")
	flags.Bool("data-dir-includes-torrent-id", false, "include torrent ID in data directory path")
	flags.Uint16("port-begin", 50000, "beginning of port range for incoming connections")
	flags.Uint16("port-end", 60000, "end of port range for incoming connections")
	flags.Bool("dht-enabled", true, "enable DHT")
	flags.Uint16("dht-port", 7246, "DHT UDP port")
	flags.String("dht-host", "0.0.0.0", "DHT host to bind to")
	flags.Bool("pex-enabled", true, "enable Peer Exchange (PEX)")
	flags.Bool("rpc-enabled", false, "enable Rain RPC server")
	flags.String("rpc-host", "127.0.0.1", "RPC server host")
	flags.Uint16("rpc-port", 7245, "RPC server port")
	flags.Uint("max-open-files", 1024, "maximum number of open files")
	flags.Int64("piece-cache-size", 256*1024*1024, "piece cache size in bytes")
	flags.Int("parallel-metadata", 2, "number of parallel metadata downloads")
	flags.Bool("blocklist-enabled", false, "enable peer blocklist")
	flags.String("blocklist-url", "", "URL to download blocklist from")
	flags.Duration("resume-write-interval", 30*time.Second, "interval to write resume data")
	flags.Duration("health-check-interval", 30*time.Second, "interval to check torrent health")
	flags.Duration("health-check-timeout", 5*time.Minute, "timeout before crashing on unresponsive torrent")
}
