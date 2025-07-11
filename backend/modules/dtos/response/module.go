package response

import (
	"time"
)

type ModuleDTO struct {
	ID        string       `json:"id"`
	Title     string       `json:"title"`
	Slug      string       `json:"slug"`
	CourseID  string       `json:"course_id"`
	Order     int          `json:"order"`
	Contents  []ContentDTO `json:"contents,omitempty"`
	QuizID    *string      `json:"quiz_id,omitempty"`
	Quiz      *QuizDTO     `json:"quiz,omitempty"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
}
