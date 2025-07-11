package db

import (
	"fmt"
	"log"
)

func Migrate() {
	err := DB.AutoMigrate()

	if err != nil {
		log.Panicln("Failed to migrate database: " + err.Error())
	}

	fmt.Println("Database migrated successfully")
}
