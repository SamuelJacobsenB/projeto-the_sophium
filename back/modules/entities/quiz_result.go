package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/dtos/response"
	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/types"
)

type QuizResult struct {
	ID           string             `json:"id" gorm:"primaryKey"`
	EnrollmentID string             `json:"enrollment_id" gorm:"not null"`
	QuizID       string             `json:"quiz_id" gorm:"not null"`
	Attempts     int                `json:"attempts"`
	Corrections  []types.Correction `json:"corrections" gorm:"type:json"`
	CreatedAt    time.Time          `json:"created_at"`
	UpdatedAt    time.Time          `json:"updated_at"`
}

func (quizResult *QuizResult) ToResponseDTO() *response.QuizResultDTO {
	return &response.QuizResultDTO{
		ID:           quizResult.ID,
		EnrollmentID: quizResult.EnrollmentID,
		QuizID:       quizResult.QuizID,
		Attempts:     quizResult.Attempts,
		Corrections:  quizResult.Corrections,
		CreatedAt:    quizResult.CreatedAt,
		UpdatedAt:    quizResult.UpdatedAt,
	}
}
