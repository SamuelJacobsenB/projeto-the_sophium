package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/middlewares"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(routerGroup *gin.RouterGroup, controller *controllers.AuthController) {
	routerGroup.GET("/verify/user", middlewares.AuthMiddleware(nil), controller.VerifyUser)
	routerGroup.GET("/verify/admin", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.VerifyAdmin)
	routerGroup.POST("/login", controller.Login)
	routerGroup.POST("/logout", middlewares.AuthMiddleware(nil), controller.Logout)
}
