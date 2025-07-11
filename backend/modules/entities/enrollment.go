package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/dtos/response"
)

type Enrollment struct {
	ID        string     `json:"id" gorm:"primaryKey"`
	UserID    string     `json:"user_id" gorm:"not null"`
	CourseID  string     `json:"course_id" gorm:"not null"`
	Progress  []Progress `json:"progress,omitempty" gorm:"foreignKey:EnrollmentID"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

func (enrollment *Enrollment) ToResponseDTO() *response.EnrollmentDTO {
	responseProgresses := make([]response.ProgressDTO, len(enrollment.Progress))
	for i, progress := range enrollment.Progress {
		responseProgresses[i] = *progress.ToResponseDTO()
	}

	return &response.EnrollmentDTO{
		ID:        enrollment.ID,
		UserID:    enrollment.UserID,
		CourseID:  enrollment.CourseID,
		Progress:  responseProgresses,
		CreatedAt: enrollment.CreatedAt,
		UpdatedAt: enrollment.UpdatedAt,
	}
}
