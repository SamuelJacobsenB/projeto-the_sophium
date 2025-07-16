package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

type Question struct {
	ID           string             `json:"id" gorm:"primaryKey"`
	QuizID       string             `json:"quiz_id" gorm:"not null"`
	Statement    string             `json:"statement" gorm:"type:text;not null"`
	Type         types.QuestionType `json:"type" gorm:"type:text;not null"`
	FileID       *string            `json:"file_id,omitempty"`
	File         *File              `json:"file,omitempty" gorm:"foreignKey:FileID;constraint:OnDelete:CASCADE"`
	Options      []string           `json:"options" gorm:"-"`
	CorrectIndex *int               `json:"correct_index,omitempty"`
	CreatedAt    time.Time          `json:"created_at"`
	UpdatedAt    time.Time          `json:"updated_at"`
}

func (question *Question) ToResponseDTO() *response.QuestionDTO {
	return &response.QuestionDTO{
		ID:        question.ID,
		QuizID:    question.QuizID,
		Statement: question.Statement,
		Type:      question.Type,
		FileID:    question.FileID,
		File:      question.File.ToResponseDTO(),
		Options:   question.Options,
		CreatedAt: question.CreatedAt,
		UpdatedAt: question.UpdatedAt,
	}
}
