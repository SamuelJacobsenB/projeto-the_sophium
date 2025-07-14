package types

type Role string

const (
	USER  Role = "user"
	ADMIN Role = "admin"
)

func ContainsRole(roles []Role, role Role) bool {
	for _, r := range roles {
		if r == role {
			return true
		}
	}

	return false
}
