package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
)

type Course struct {
	ID          string    `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Slug        string    `json:"slug" gorm:"uniqueIndex"`
	Description string    `json:"description" gorm:"type:text"`
	FileID      *string   `json:"file_id,omitempty"`
	File        *File     `json:"file,omitempty" gorm:"foreignKey:FileID;constraint:OnDelete:CASCADE"`
	Modules     []Module  `json:"modules,omitempty" gorm:"foreignKey:CourseID"`
	QuizID      *string   `json:"quiz_id,omitempty"`
	Quiz        *Quiz     `json:"quiz,omitempty" gorm:"foreignKey:QuizID;constraint:OnDelete:CASCADE"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (course *Course) ToResponseDTO() *response.CourseDTO {
	responseModules := make([]response.ModuleDTO, len(course.Modules))
	for i, module := range course.Modules {
		responseModules[i] = *module.ToResponseDTO()
	}

	var fileDTO *response.FileDTO
	if course.File != nil {
		fileDTO = course.File.ToResponseDTO()
	}

	var quizDTO *response.QuizDTO
	if course.Quiz != nil {
		quizDTO = course.Quiz.ToResponseDTO()
	}

	return &response.CourseDTO{
		ID:          course.ID,
		Title:       course.Title,
		Slug:        course.Slug,
		Description: course.Description,
		FileID:      course.FileID,
		File:        fileDTO,
		Modules:     responseModules,
		QuizID:      course.QuizID,
		Quiz:        quizDTO,
		CreatedAt:   course.CreatedAt,
		UpdatedAt:   course.UpdatedAt,
	}
}
