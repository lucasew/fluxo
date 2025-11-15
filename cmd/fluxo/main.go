package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"

	"github.com/lucasew/fluxo/internal/config"
	"github.com/lucasew/fluxo/internal/server"
)

func main() {
	if err := newRootCmd().Execute(); err != nil {
		log.Fatal(err)
	}
}

func newRootCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fluxo",
		Short: "Fluxo - Modern BitTorrent client with web UI",
		Long: `Fluxo is a modern BitTorrent client built with Go and React.
It provides a clean web interface powered by GraphQL subscriptions
for real-time updates.`,
		RunE: runServer,
	}

	// Add flags
	config.AddFlags(cmd)

	return cmd
}

func runServer(cmd *cobra.Command, args []string) error {
	// Load configuration
	cfg, err := config.Load(cmd)
	if err != nil {
		return fmt.Errorf("loading config: %w", err)
	}

	// Create server
	srv, err := server.New(cfg)
	if err != nil {
		return fmt.Errorf("creating server: %w", err)
	}

	// Setup signal handling for graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	// Start server in background
	errChan := make(chan error, 1)
	go func() {
		errChan <- srv.Start(ctx)
	}()

	// Wait for signal or error
	select {
	case <-sigChan:
		log.Println("Received shutdown signal, stopping gracefully...")
		cancel()

		// Give server time to shutdown
		shutdownCtx, shutdownCancel := context.WithCancel(context.Background())
		defer shutdownCancel()

		if err := srv.Stop(shutdownCtx); err != nil {
			return fmt.Errorf("shutdown error: %w", err)
		}

		log.Println("Server stopped")
		return nil

	case err := <-errChan:
		if err != nil {
			return fmt.Errorf("server error: %w", err)
		}
		return nil
	}
}
