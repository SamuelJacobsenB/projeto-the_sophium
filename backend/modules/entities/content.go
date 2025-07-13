package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
)

type Content struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	ModuleID  string    `json:"module_id" gorm:"not null"`
	Title     string    `json:"title" gorm:"not null"`
	VideoURL  *string   `json:"video_url,omitempty"`
	FileID    *string   `json:"file_id,omitempty"`
	File      *File     `json:"file,omitempty" gorm:"foreignKey:FileID"`
	HTML      *string   `json:"html" gorm:"type:text;not null"`
	Order     int       `json:"order" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"not null"`
}

func (content *Content) ToResponseDTO() *response.ContentDTO {
	return &response.ContentDTO{
		ID:        content.ID,
		ModuleID:  content.ModuleID,
		Title:     content.Title,
		VideoURL:  content.VideoURL,
		FileID:    content.FileID,
		HTML:      content.HTML,
		Order:     content.Order,
		CreatedAt: content.CreatedAt,
		UpdatedAt: content.UpdatedAt,
	}
}
