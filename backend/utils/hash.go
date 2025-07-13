package utils

import (
	"golang.org/x/crypto/bcrypt"
)

func Hash(str string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
	return string(bytes), err
}

func CompareHash(str, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(str))
}
