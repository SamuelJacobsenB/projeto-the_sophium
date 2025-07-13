package response

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

type QuizResultDTO struct {
	ID           string             `json:"id"`
	EnrollmentID string             `json:"enrollment_id"`
	QuizID       string             `json:"quiz_id"`
	Attempts     int                `json:"attempts"`
	Corrections  []types.Correction `json:"corrections"`
	CreatedAt    time.Time          `json:"created_at"`
	UpdatedAt    time.Time          `json:"updated_at"`
}
