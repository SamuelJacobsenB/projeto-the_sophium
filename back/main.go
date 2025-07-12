package main

import (
	"log"
	"os"
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/db"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/router"
	"github.com/gin-contrib/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Panicln("Failed to load env file")
	}

	db.Connect()
	db.Migrate()

	router := router.RegisterRoutes()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.Run(":" + os.Getenv("PORT"))
}
