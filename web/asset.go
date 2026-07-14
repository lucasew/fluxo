package web

import (
	"embed"
	"io/fs"
)

// Placeholder tree lives in dist/ so packages compile without a prior Vite build.
// Production images should run `npm run build` in web/ so this tree is replaced
// by the real SPA assets before `go build`.
//
//go:embed all:dist
var webDist embed.FS

// WebDist returns the embedded web distribution files
func WebDist() (fs.FS, error) {
	return fs.Sub(webDist, "dist")
}
