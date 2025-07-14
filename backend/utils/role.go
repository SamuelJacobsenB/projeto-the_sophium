package utils

import "github.com/SamuelJacobsenB/projeto-the_sophium/back/types"

func HasAllRoles(requiredRoles, userRoles []types.Role) bool {
	userRolesMap := make(map[types.Role]bool)

	for _, role := range userRoles {
		userRolesMap[role] = true
	}

	for _, role := range requiredRoles {
		if !userRolesMap[role] {
			return false
		}
	}

	return true
}
