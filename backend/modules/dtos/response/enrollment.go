package response

import (
	"time"
)

type EnrollmentDTO struct {
	ID        string          `json:"id"`
	UserID    string          `json:"user_id"`
	CourseID  string          `json:"course_id"`
	Progress  []ProgressDTO   `json:"progress,omitempty"`
	Quizes    []QuizResultDTO `json:"quizes,omitempty"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
}
