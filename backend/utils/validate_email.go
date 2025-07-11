package utils

import (
	"errors"
	"net"
	"net/mail"
	"regexp"
	"strings"
)

func ValidateEmail(email string) error {
	addr, err := mail.ParseAddress(email)
	if err != nil {
		return errors.New("email format is invalid")
	}

	if addr.Address != email {
		return errors.New("email must not contain display name")
	}

	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	if !emailRegex.MatchString(email) {
		return errors.New("email structure is invalid")
	}

	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return errors.New("email must contain a single '@'")
	}

	domain := parts[1]

	mxRecords, err := net.LookupMX(domain)
	if err != nil || len(mxRecords) == 0 {
		return errors.New("email domain does not accept mail (no MX records)")
	}

	return nil
}
