package session

import (
	"errors"
	"fmt"
	"testing"
)

func TestErrorChanged(t *testing.T) {
	tests := []struct {
		name string
		a, b error
		want bool
	}{
		{"both nil", nil, nil, false},
		{"nil to error", nil, errors.New("boom"), true},
		{"error to nil", errors.New("boom"), nil, true},
		{"same message different instances", errors.New("boom"), errors.New("boom"), false},
		{"different messages", errors.New("a"), errors.New("b"), true},
		{"wrapped same text", fmt.Errorf("boom"), errors.New("boom"), false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := errorChanged(tt.a, tt.b); got != tt.want {
				t.Fatalf("errorChanged(%v, %v) = %v, want %v", tt.a, tt.b, got, tt.want)
			}
		})
	}
}
