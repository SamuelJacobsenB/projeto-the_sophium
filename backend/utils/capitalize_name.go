package utils

import (
	"strings"
	"unicode"
)

func CapitalizeName(name string) string {
	words := strings.Fields(strings.ToLower(name))

	for i, word := range words {
		if len(word) > 0 {
			runes := []rune(word)
			runes[0] = unicode.ToUpper(runes[0])
			words[i] = string(runes)
		}
	}

	return strings.Join(words, " ")
}
