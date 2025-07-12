package response

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/types"
)

type FileDTO struct {
	ID        string          `json:"id"`
	Name      string          `json:"name"`
	Path      string          `json:"path"`
	Extension types.Extension `json:"extension"`
	Size      int64           `json:"size"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
}
