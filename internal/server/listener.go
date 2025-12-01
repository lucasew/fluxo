package server

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/websocket"

	"github.com/lucasew/fluxo/internal/config"
	"github.com/lucasew/fluxo/internal/graphql"
	"github.com/lucasew/fluxo/internal/session"
	"github.com/lucasew/fluxo/web"
)

// HTTPListener implements the HTTP/WebSocket listener
type HTTPListener struct {
	config  *config.Config
	manager *session.Manager
	server  *http.Server
}

// NewHTTPListener creates a new HTTP listener
func NewHTTPListener(cfg *config.Config, manager *session.Manager) *HTTPListener {
	return &HTTPListener{
		config:  cfg,
		manager: manager,
	}
}

// Start starts the HTTP server
func (l *HTTPListener) Start(ctx context.Context) error {
	// Create GraphQL resolver
	resolver := graphql.NewResolver(l.manager)

	// Create GraphQL schema
	schema := l.createSchema(resolver)

	// Create router
	mux := http.NewServeMux()

	// GraphQL endpoint
	mux.Handle("/graphql", schema)

	// GraphiQL playground
	mux.Handle("/graphiql", playground.Handler("GraphQL Playground", "/graphql"))

	// Static files (React app)
	if l.config.DevMode {
		// Proxy to Vite dev server in dev mode
		mux.HandleFunc("/", l.proxyToVite)
	} else {
		// Serve embedded files in production
		webFS, err := web.WebDist()
		if err != nil {
			return fmt.Errorf("accessing embedded files: %w", err)
		}
		mux.Handle("/", http.FileServer(http.FS(webFS)))
	}

	// Create server
	addr := fmt.Sprintf("%s:%d", l.config.APIHost, l.config.APIPort)
	l.server = &http.Server{
		Addr:         addr,
		Handler:      l.withMiddleware(mux),
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		BaseContext:  func(net.Listener) context.Context { return ctx },
	}

	log.Printf("Starting HTTP server on %s", addr)

	// Start server
	if err := l.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		return fmt.Errorf("HTTP server error: %w", err)
	}

	return nil
}

// Stop stops the HTTP server
func (l *HTTPListener) Stop(ctx context.Context) error {
	if l.server == nil {
		return nil
	}
	return l.server.Shutdown(ctx)
}

func (l *HTTPListener) createSchema(resolver *graphql.Resolver) *handler.Server {
	srv := handler.NewDefaultServer(&graphql.ExecutableSchema{Resolver: resolver})

	// Add WebSocket transport for subscriptions
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 30 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // Allow all origins in dev mode
			},
		},
	})

	// Add other transports
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.GET{})

	// Add introspection
	srv.Use(extension.Introspection{})

	return srv
}

func (l *HTTPListener) withMiddleware(handler http.Handler) http.Handler {
	// CORS middleware
	cors := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	// Logging middleware
	logging := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			next.ServeHTTP(w, r)
			log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
		})
	}

	// Recovery middleware
	recovery := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					log.Printf("panic: %v", err)
					http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}

	return recovery(logging(cors(handler)))
}

func (l *HTTPListener) proxyToVite(w http.ResponseWriter, r *http.Request) {
	target, err := url.Parse(l.config.DevProxy)
	if err != nil {
		http.Error(w, "Invalid dev proxy URL", http.StatusInternalServerError)
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(target)
	proxy.ServeHTTP(w, r)
}
