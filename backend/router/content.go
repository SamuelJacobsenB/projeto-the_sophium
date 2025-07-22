package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/middlewares"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/gin-gonic/gin"
)

func RegisterContentRoutes(routerGroup *gin.RouterGroup, controller *controllers.ContentController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.POST("/", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.Create)
	routerGroup.PATCH("/:id/order", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.ChangeOrder)
	routerGroup.PATCH("/:id/file", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.UpdateFile)
	routerGroup.PUT("/:id", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.Update)
	routerGroup.DELETE("/:id", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.DeleteByID)
}
