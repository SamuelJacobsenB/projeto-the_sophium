package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
)

type Module struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title" gorm:"not null"`
	Slug      string    `json:"slug" gorm:"uniqueIndex"`
	CourseID  string    `json:"course_id" gorm:"not null"`
	Order     int       `json:"order" gorm:"not null"`
	Contents  []Content `json:"contents,omitempty" gorm:"foreignKey:ModuleID"`
	QuizID    *string   `json:"quiz_id,omitempty"`
	Quiz      *Quiz     `json:"quiz,omitempty" gorm:"foreignKey:QuizID"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (module *Module) ToResponseDTO() *response.ModuleDTO {
	responseContents := make([]response.ContentDTO, len(module.Contents))
	for i, content := range module.Contents {
		responseContents[i] = *content.ToResponseDTO()
	}

	return &response.ModuleDTO{
		ID:        module.ID,
		Title:     module.Title,
		Slug:      module.Slug,
		CourseID:  module.CourseID,
		Order:     module.Order,
		Contents:  responseContents,
		QuizID:    module.QuizID,
		Quiz:      module.Quiz.ToResponseDTO(),
		CreatedAt: module.CreatedAt,
		UpdatedAt: module.UpdatedAt,
	}
}
