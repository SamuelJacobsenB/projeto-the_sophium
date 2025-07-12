package bootstrap

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/services"
	"gorm.io/gorm"
)

type AppControllers struct {
	FileController *controllers.FileController
}

func InitializeControllers(db *gorm.DB) *AppControllers {
	fileRepository := repositories.NewFileRepository(db)

	fileService := services.NewFileService(fileRepository)

	fileController := controllers.NewFileController(fileService)

	return &AppControllers{FileController: fileController}
}
