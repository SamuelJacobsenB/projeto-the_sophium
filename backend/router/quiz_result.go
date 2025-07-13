package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterQuizResultRoutes(routerGroup *gin.RouterGroup, controller *controllers.QuizResultController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.POST("/", controller.Create)
	routerGroup.PUT("/:id", controller.Update)
	routerGroup.DELETE("/:id", controller.DeleteByID)
}
