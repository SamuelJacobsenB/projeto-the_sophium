package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/middlewares"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/gin-gonic/gin"
)

func RegisterModuleRoutes(routerGroup *gin.RouterGroup, controller *controllers.ModuleController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.GET("/:id/slug", controller.FindBySlug)
	routerGroup.POST("/", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.Create)
	routerGroup.PATCH("/:id/order", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.ChangeOrder)
	routerGroup.PUT("/:id", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.Update)
	routerGroup.DELETE("/:id", middlewares.AuthMiddleware([]types.Role{types.USER, types.ADMIN}), controller.DeleteByID)
}
