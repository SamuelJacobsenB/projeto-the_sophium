package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(routerGroup *gin.RouterGroup, controller *controllers.UserController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.POST("/", controller.Create)
	routerGroup.PATCH("/:id/request-password-change", controller.RequestPasswordChange)
	routerGroup.PATCH("/:id/verify", controller.VerifyToken)
	routerGroup.PATCH("/:id/change-password", controller.ChangePassword)
	routerGroup.PUT("/:id", controller.Update)
	routerGroup.DELETE("/:id", controller.DeleteByID)
}
