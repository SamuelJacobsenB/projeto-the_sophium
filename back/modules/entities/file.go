package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

type File struct {
	ID        string          `json:"id" gorm:"primaryKey"`
	Name      string          `json:"name" gorm:"not null"`
	Path      string          `json:"path" gorm:"not null"`
	Extension types.Extension `json:"extension" gorm:"not null;type:text"`
	Size      int64           `json:"size" gorm:"not null"`
	CreatedAt time.Time       `json:"created_at" gorm:"not null"`
	UpdatedAt time.Time       `json:"updated_at" gorm:"not null"`
}

func (file *File) ToResponseDTO() *response.FileDTO {
	return &response.FileDTO{
		ID:        file.ID,
		Name:      file.Name,
		Path:      file.Path,
		Extension: file.Extension,
		Size:      file.Size,
		CreatedAt: file.CreatedAt,
		UpdatedAt: file.UpdatedAt,
	}
}
