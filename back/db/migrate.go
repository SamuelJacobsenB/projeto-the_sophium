package db

import (
	"fmt"
	"log"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/entities"
)

func Migrate() {
	err := DB.AutoMigrate(&entities.User{}, &entities.Enrollment{}, &entities.Progress{}, &entities.QuizResult{}, &entities.Course{}, &entities.Module{}, &entities.Content{}, &entities.Quiz{}, &entities.Question{}, &entities.File{})

	if err != nil {
		log.Panicln("Failed to migrate database: " + err.Error())
	}

	fmt.Println("Database migrated successfully")
}
