package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterCourseRoutes(routerGroup *gin.RouterGroup, controller *controllers.CourseController) {
	routerGroup.GET("/:id", controller.FindByID)
	routerGroup.GET("/:id/slug", controller.FindBySlug)
	routerGroup.POST("/", controller.Create)
	routerGroup.PUT("/:id", controller.Update)
	routerGroup.DELETE("/:id", controller.DeleteByID)
}
