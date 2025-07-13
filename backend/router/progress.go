package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterProgressRoutes(routerGroup *gin.RouterGroup, controller *controllers.ProgressController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.POST("/", controller.Create)
	routerGroup.DELETE("/:id", controller.DeleteByID)
}
