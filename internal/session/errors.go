package session

import "errors"

// Common errors that can be checked with errors.Is
var (
	// ErrTorrentNotFound is returned when a torrent ID is not found
	ErrTorrentNotFound = errors.New("torrent not found")

	// ErrInvalidURI is returned when a torrent URI is invalid
	ErrInvalidURI = errors.New("invalid torrent URI")

	// ErrAlreadyExists is returned when trying to add a torrent that already exists
	ErrAlreadyExists = errors.New("torrent already exists")

	// ErrSessionClosed is returned when operating on a closed session
	ErrSessionClosed = errors.New("session is closed")

	// ErrInvalidID is returned when a torrent ID format is invalid
	ErrInvalidID = errors.New("invalid torrent ID")
)
