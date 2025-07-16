package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
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
	Avatar            *File        `json:"avatar,omitempty" gorm:"foreignKey:AvatarID;constraint:OnDelete:CASCADE"`
	Enrollments       []Enrollment `json:"enrollments,omitempty" gorm:"foreignKey:UserID"`
	VerificationToken *string      `json:"-" gorm:"not null,omitempty"`
	TokenCreatedAt    *time.Time   `json:"-" gorm:"not null,omitempty"`
	IsVerified        bool         `json:"is_verified" gorm:"default:false"`
	CreatedAt         time.Time    `json:"created_at"`
	UpdatedAt         time.Time    `json:"updated_at"`
}

func (user *User) ToResponseDTO() *response.UserDTO {
	responseEnrollments := make([]response.EnrollmentDTO, len(user.Enrollments))
	for i, enrollment := range user.Enrollments {
		responseEnrollments[i] = *enrollment.ToResponseDTO()
	}

	return &response.UserDTO{
		ID:          user.ID,
		Name:        user.Name,
		Email:       user.Email,
		Phone:       user.Phone,
		Bio:         user.Bio,
		AvatarID:    user.AvatarID,
		Roles:       user.Roles,
		Enrollments: responseEnrollments,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
	}
}
