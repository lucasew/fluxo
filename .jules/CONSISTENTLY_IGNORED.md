## IGNORE: Over-reporting Expected User Errors

**- Pattern:** Adding centralized error reporting (e.g., `reportError`, Sentry) to catch blocks that handle expected user errors, such as invalid `.torrent` file uploads or GraphQL mutation input errors.
**- Justification:** User-generated errors are expected, recoverable conditions. Logging them to a centralized error tracker creates noise and false positives.
**- Files Affected:** `web/src/pages/AddTorrent.tsx`, `web/src/utils/error.ts`

## IGNORE: Extracting UPnP Logic to Separate Package

**- Pattern:** Moving UPnP port mapping logic out of `internal/session/upnp.go` into a standalone `internal/upnp` package or service.
**- Justification:** UPnP orchestration is intentionally co-located within the `internal/session` package alongside the BitTorrent manager logic.
**- Files Affected:** `internal/upnp/manager.go`, `internal/upnp/service.go`, `internal/session/upnp.go`, `internal/session/manager.go`

## IGNORE: Backend .torrent File Parsing

**- Pattern:** Modifying the GraphQL schema and backend Go code to accept raw `.torrent` file data or base64 strings.
**- Justification:** The project architecture dictates that `.torrent` files must be parsed strictly client-side using `parse-torrent`, passing only the resulting Magnet URI to the backend.
**- Files Affected:** `internal/graphql/schema.graphql`, `internal/graphql/schema.resolvers.go`, `internal/session/manager.go`

## IGNORE: Obvious/Verbose Docstrings

**- Pattern:** Adding JSDoc or Go docstrings that simply restate the obvious functionality of a component or function.
**- Justification:** Documentation guidelines specify that docstrings must avoid stating obvious functionality, focusing instead on the "why", non-obvious nuances, and edge cases.
**- Files Affected:** `web/src/utils/format.ts`, `web/src/pages/AddTorrent.tsx`, `web/src/relay/environment.ts`

## IGNORE: False Positive "Unsafe" Interface Casting for embed.FS

**- Pattern:** Replacing the type assertion `index.(io.ReadSeeker)` with "safe" type checks or HTTP request clones in `internal/server/listener.go`.
**- Justification:** Files opened from a Go `embed.FS` are guaranteed to implement `io.ReadSeeker`. Flagging this as an unsafe interface cast is a false positive.
**- Files Affected:** `internal/server/listener.go`

## IGNORE: Restricting DevMode Wildcard CORS / WebSocket CheckOrigin

**- Pattern:** Modifying the development-mode server configuration to restrict CORS headers or WebSocket `CheckOrigin` policies.
**- Justification:** Permissive wildcard CORS and open WebSocket origins are intentional features enabled by the `DevMode` flag for local development. Flagging them as vulnerabilities is a false positive.
**- Files Affected:** `internal/server/listener.go`

## IGNORE: Unpinned Tool Versions

**- Pattern:** Using "latest" for tool versions in `mise.toml`.
**- Justification:** Tool versions must be strictly pinned to specific versions to avoid version conflicts and ensure reproducibility.
**- Files Affected:** `mise.toml`

## IGNORE: Downgrading CI Dependencies

**- Pattern:** Downgrading GitHub Actions dependencies (e.g., `actions/checkout@v4`, `jdx/mise-action@v2`).
**- Justification:** Dependencies should not be downgraded unless explicitly asked.
**- Files Affected:** `.github/workflows/autorelease.yml`

## IGNORE: Expanding Scope Beyond Explicit Request

**- Pattern:** Bundling unrelated changes (e.g., UPnP logic extraction) into a PR focused on a specific fix or feature.
**- Justification:** Execute only the explicitly requested outcome. Do not expand scope on your own, and do not bundle "nice to have" changes into the implementation.
**- Files Affected:** Various (e.g., `internal/upnp/service.go`)
