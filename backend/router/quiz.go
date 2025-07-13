package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterQuizRoutes(routerGroup *gin.RouterGroup, controller *controllers.QuizController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.GET("/:id/questions", controller.FindWithQuestions)
	routerGroup.POST("/", controller.Create)
	routerGroup.PUT("/:id", controller.Update)
	routerGroup.DELETE("/:id", controller.DeleteByID)
}
