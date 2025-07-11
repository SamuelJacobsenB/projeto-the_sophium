package utils

import "strings"

func NormalizeSlug(slug string) string {
	return strings.ReplaceAll(strings.ToLower(strings.TrimSpace(slug)), " ", "-")
}
