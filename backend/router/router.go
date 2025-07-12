package router

import "github.com/gin-gonic/gin"

func RegisterRoutes() *gin.Engine {
	router := gin.Default()

	router.Static("/uploads", "./uploads")

	return router
}
