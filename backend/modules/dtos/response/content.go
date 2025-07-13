package response

import (
	"time"
)

type ContentDTO struct {
	ID        string    `json:"id"`
	ModuleID  string    `json:"module_id"`
	Title     string    `json:"title"`
	HTML      *string   `json:"html,omitempty"`
	VideoURL  *string   `json:"video_url,omitempty"`
	FileID    *string   `json:"file_id,omitempty"`
	File      *FileDTO  `json:"file,omitempty"`
	Order     int       `json:"order"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
