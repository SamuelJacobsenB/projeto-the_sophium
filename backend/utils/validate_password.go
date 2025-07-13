package utils

import (
	"errors"
	"regexp"
)

func ValidatePassword(password string) error {
	if len(password) < 8 || len(password) > 15 {
		return errors.New("password must be between 8 and 15 characters")
	}

	var (
		hasUpper   = regexp.MustCompile(`[A-Z]`)
		hasLower   = regexp.MustCompile(`[a-z]`)
		hasNumber  = regexp.MustCompile(`[0-9]`)
		hasSpecial = regexp.MustCompile(`[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\.\?/\\|]`)
	)

	switch {
	case !hasUpper.MatchString(password):
		return errors.New("password must contain at least one uppercase letter")
	case !hasLower.MatchString(password):
		return errors.New("password must contain at least one lowercase letter")
	case !hasNumber.MatchString(password):
		return errors.New("password must contain at least one digit")
	case !hasSpecial.MatchString(password):
		return errors.New("password must contain at least one special character")
	}

	return nil
}
