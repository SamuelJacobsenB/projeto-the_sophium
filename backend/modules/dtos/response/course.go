package response

import (
	"time"
)

type CourseDTO struct {
	ID          string      `json:"id"`
	Title       string      `json:"title"`
	Slug        string      `json:"slug"`
	Description string      `json:"description"`
	FileID      *string     `json:"file_id,omitempty"`
	File        *FileDTO    `json:"file,omitempty"`
	Modules     []ModuleDTO `json:"modules,omitempty"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}
