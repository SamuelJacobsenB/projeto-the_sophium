package response

import (
	"time"
)

type ProgressDTO struct {
	ID           string    `json:"id"`
	EnrollmentID string    `json:"enrollment_id"`
	ContentID    string    `json:"content_id"`
	CreatedAt    time.Time `json:"created_at"`
}
