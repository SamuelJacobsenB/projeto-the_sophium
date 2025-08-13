package middlewares

import (
	"net/http"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/gin-gonic/gin"
)

func SelfOrAdminMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		paramID := ctx.Param("id")

		userID := ctx.GetString("user_id")
		if userID == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "usuário não autenticado"})
			return
		}

		rolesRaw, ok := ctx.Get("user_roles")
		if !ok {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "roles não disponíveis"})
			return
		}

		userRoles, ok := rolesRaw.(types.Roles)
		if !ok {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "formato inválido de roles"})
			return
		}

		if userID == paramID || types.ContainsRole(userRoles, types.ADMIN) {
			ctx.Next()
			return
		}

		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "permissão negada"})
	}
}
