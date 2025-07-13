package utils

import (
	"math/rand"
	"strconv"
	"time"
)

func GenerateToken() string {
	source := rand.NewSource(time.Now().UnixNano())
	random := rand.New(source)
	code := random.Intn(900000) + 100000
	return strconv.Itoa(code)
}
