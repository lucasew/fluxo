package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// Load loads configuration from flags, env vars, and config file
func Load(cmd *cobra.Command) (*Config, error) {
	v := viper.New()

	// Set config file search paths
	if configFile := cmd.Flag("config").Value.String(); configFile != "" {
		v.SetConfigFile(configFile)
	} else {
		v.SetConfigName("fluxo")
		v.SetConfigType("yaml")

		// Add search paths
		v.AddConfigPath(".")
		if home, err := os.UserHomeDir(); err == nil {
			v.AddConfigPath(filepath.Join(home, ".fluxo"))
		}
		v.AddConfigPath("/etc/fluxo")
	}

	// Environment variables
	v.SetEnvPrefix("FLUXO")
	v.SetEnvKeyReplacer(strings.NewReplacer("-", "_"))
	v.AutomaticEnv()

	// Read config file (ignore error if not found)
	_ = v.ReadInConfig()

	// Bind command flags
	if err := v.BindPFlags(cmd.Flags()); err != nil {
		return nil, fmt.Errorf("binding flags: %w", err)
	}

	// Unmarshal to Config struct
	cfg := DefaultConfig()
	if err := v.Unmarshal(cfg); err != nil {
		return nil, fmt.Errorf("unmarshaling config: %w", err)
	}

	return cfg, nil
}
