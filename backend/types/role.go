package types

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
)

type Role string

const (
	USER  Role = "user"
	ADMIN Role = "admin"
)

func ContainsRole(roles Roles, role Role) bool {
	for _, r := range roles {
		if r == role {
			return true
		}
	}

	return false
}

type Roles []Role

func (roles Roles) Value() (driver.Value, error) {
	return json.Marshal(roles)
}

func (roles *Roles) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New("erro ao converter roles")
	}
	return json.Unmarshal(bytes, roles)
}
