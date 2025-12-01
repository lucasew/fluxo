package embed

import (
	"embed"
	"io/fs"
)

//go:embed all:web/dist
var webDist embed.FS

// WebDist returns the embedded web distribution files
func WebDist() (fs.FS, error) {
	return fs.Sub(webDist, "web/dist")
}
