# Fluxo

Modern BitTorrent client with a GraphQL API and React web interface.

## Features

- **BitTorrent Client**: Built on Rain, a robust BitTorrent library
- **GraphQL API**: Full-featured GraphQL API with subscriptions
- **Real-time Updates**: WebSocket subscriptions for live torrent updates
- **Modern Web UI**: React + Relay + DaisyUI interface
- **Flexible Configuration**: CLI flags, environment variables, or config file

## Architecture

### Backend (Go)
- **Rain**: BitTorrent protocol implementation
- **Cobra + Viper**: CLI and configuration management
- **gqlgen**: GraphQL server with subscription support
- **Event Bus**: Internal event system for real-time updates

### Frontend (TypeScript/React)
- **React 18**: Modern React with hooks
- **Relay**: GraphQL client with normalized cache
- **DaisyUI 5**: Component library built on Tailwind 4
- **Vite**: Fast build tool and dev server

## Building

### Prerequisites
- Go 1.24+
- Node.js 18+

### Build Backend
```bash
go build -o fluxo ./cmd/fluxo
```

### Build Frontend
```bash
cd web
npm install
npm run build
cd ..
```

### Build All
The backend embeds the frontend, so build in order:
```bash
cd web && npm install && npm run build && cd ..
go build -o fluxo ./cmd/fluxo
```

## Running

### Production Mode
```bash
./fluxo
```

### Development Mode
Terminal 1 (Backend with dev proxy):
```bash
go run ./cmd/fluxo --dev-mode
```

Terminal 2 (Frontend dev server):
```bash
cd web
npm run dev
```

## Configuration

### CLI Flags
```bash
./fluxo --help
```

Key flags:
- `--api-port`: API server port (default: 8080)
- `--api-host`: API server host (default: 127.0.0.1)
- `--data-dir`: Downloads directory (default: ~/.fluxo/downloads)
- `--database`: Session database path (default: ~/.fluxo/session.db)
- `--debug`: Enable debug logging

### Environment Variables
All flags can be set via environment variables with `FLUXO_` prefix:
```bash
export FLUXO_API_PORT=9090
export FLUXO_DATA_DIR=/mnt/torrents
./fluxo
```

### Config File
Create `fluxo.yaml` in current directory, `~/.fluxo/`, or `/etc/fluxo/`:
```yaml
api-port: 8080
api-host: 127.0.0.1
data-dir: /mnt/torrents
database: /var/lib/fluxo/session.db
```

## API

### GraphQL Endpoint
```
POST http://localhost:8080/graphql
```

### GraphQL Playground
```
http://localhost:8080/graphiql
```

### WebSocket (Subscriptions)
```
ws://localhost:8080/graphql
```

## Project Structure

```
fluxo/
├── cmd/fluxo/          # Main application entry point
├── internal/
│   ├── config/         # Configuration (Cobra + Viper)
│   ├── server/         # HTTP server and listener
│   ├── graphql/        # GraphQL schema and resolvers
│   └── session/        # Torrent session manager and event bus
├── web/                # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   └── relay/      # Relay environment
│   └── dist/           # Built frontend (embedded in Go binary)
├── go.mod
└── README.md
```

## License

MIT
