package utils

import (
	"errors"
	"regexp"
	"strings"
)

func ValidatePhone(phone string) error {
	phone = strings.TrimSpace(phone)

	regex := regexp.MustCompile(`^(?:(?:\+|00)?55\s?)?(?:\(?[1-9][0-9]\)?\s?)?(?:9[1-9][0-9]{3})\-?[0-9]{4}$`)

	if !regex.MatchString(phone) {
		return errors.New("invalid phone number format")
	}

	return nil
}
