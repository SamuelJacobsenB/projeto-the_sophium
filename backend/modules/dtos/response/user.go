package response

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

type UserDTO struct {
	ID          string          `json:"id"`
	Name        string          `json:"name"`
	Email       string          `json:"email"`
	Phone       *string         `json:"phone,omitempty"`
	Bio         *string         `json:"bio,omitempty"`
	AvatarID    *string         `json:"avatar_id,omitempty"`
	Avatar      *FileDTO        `json:"avatar,omitempty"`
	Roles       types.Roles     `json:"roles"`
	Enrollments []EnrollmentDTO `json:"enrollments,omitempty"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}
