package graphql

import (
	"github.com/lucasew/fluxo/internal/session"
)

// Resolver is the root resolver
type Resolver struct {
	manager *session.Manager
}

// NewResolver creates a new resolver
func NewResolver(manager *session.Manager) *Resolver {
	return &Resolver{
		manager: manager,
	}
}
