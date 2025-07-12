package utils

import (
	"errors"
	"regexp"
	"strings"
)

func ValidateName(name string) error {
	name = strings.TrimSpace(name)

	if len(name) < 3 || len(name) > 50 {
		return errors.New("name must be between 3 and 50 characters")
	}

	regex := regexp.MustCompile(`^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$`)
	if !regex.MatchString(name) {
		return errors.New("name must not contain special characters or digits")
	}

	return nil
}
