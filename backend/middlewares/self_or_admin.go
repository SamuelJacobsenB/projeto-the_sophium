package middlewares

import (
	"net/http"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/gin-gonic/gin"
)

func SelfOrAdminMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		paramID := ctx.Param("id")

		userID, ok := ctx.Get("user_id")
		if !ok {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "usuário não autenticado"})
			return
		}

		rolesRaw, ok := ctx.Get("roles")
		if !ok {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "roles não disponíveis"})
			return
		}

		userRoles, ok := rolesRaw.([]types.Role)
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
