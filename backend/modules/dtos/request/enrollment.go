package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
)

type EnrollmentDto struct {
	UserID   string `json:"user_id"`
	CourseID string `json:"course_id"`
}

func (dto *EnrollmentDto) Validate() error {
	dto.UserID = strings.TrimSpace(dto.UserID)
	dto.CourseID = strings.TrimSpace(dto.CourseID)

	if dto.UserID == "" {
		return errors.New("user_id is required")
	}

	if dto.CourseID == "" {
		return errors.New("course_id is required")
	}

	return nil
}

func (dto *EnrollmentDto) ToEntity() *entities.Enrollment {
	return &entities.Enrollment{
		UserID:   dto.UserID,
		CourseID: dto.CourseID,
	}
}
