package utils

import (
	"os"
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/golang-jwt/jwt"
)

func GenerateJwtToken(userID string, userRoles []types.Role) (string, error) {
	claims := jwt.MapClaims{
		"user_id":    userID,
		"user_roles": userRoles,
		"exp":        time.Now().Add(time.Hour * 48).Unix(),
	}

	secret := os.Getenv("JWT_SECRET")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func ValidateJwtToken(tokenString string) (*jwt.Token, error) {
	secret := os.Getenv("JWT_SECRET")

	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
}
