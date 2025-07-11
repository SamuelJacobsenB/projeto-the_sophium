package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/dtos/response"
)

type Progress struct {
	ID           string    `json:"id" gorm:"primaryKey"`
	EnrollmentID string    `json:"enrollment_id" gorm:"not null"`
	ContentID    string    `json:"content_id" gorm:"not null"`
	CreatedAt    time.Time `json:"created_at"`
}

func (progress *Progress) ToResponseDTO() *response.ProgressDTO {
	return &response.ProgressDTO{
		ID:           progress.ID,
		EnrollmentID: progress.EnrollmentID,
		ContentID:    progress.ContentID,
		CreatedAt:    progress.CreatedAt,
	}
}
