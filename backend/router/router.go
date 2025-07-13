package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/bootstrap"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/db"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes() *gin.Engine {
	router := gin.Default()

	router.Static("/uploads", "./uploads")

	api := router.Group("/api")

	v1 := api.Group("/v1")

	controllers := bootstrap.InitializeControllers(db.DB)

	RegisterFileRoutes(v1, controllers.FileController)

	return router
}
