package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/dtos/response"
	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/types"
)

type User struct {
	ID                string       `json:"id" gorm:"primaryKey"`
	Name              string       `json:"name" gorm:"not null"`
	Email             string       `json:"email" gorm:"uniqueIndex;not null"`
	Password          string       `json:"-" gorm:"not null"`
	Phone             *string      `json:"phone,omitempty"`
	Bio               *string      `json:"bio,omitempty"`
	Roles             []types.Role `json:"roles" gorm:"type:text[]"`
	AvatarID          *string      `json:"avatar_id,omitempty"`
	Avatar            *File        `json:"avatar,omitempty" gorm:"foreignKey:AvatarID"`
	VerificationToken *string      `json:"-" gorm:"not null,omitempty"`
	TokenCreatedAt    *time.Time   `json:"-" gorm:"not null,omitempty"`
	Enrollments       []Enrollment `json:"enrollments,omitempty" gorm:"foreignKey:UserID"`
	CreatedAt         time.Time    `json:"created_at"`
	UpdatedAt         time.Time    `json:"updated_at"`
}

func (user *User) ToResponseDTO() *response.UserDTO {
	return &response.UserDTO{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Phone:     user.Phone,
		Bio:       user.Bio,
		AvatarID:  user.AvatarID,
		Roles:     user.Roles,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
}
