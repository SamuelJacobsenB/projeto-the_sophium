package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
)

type ProgressDto struct {
	EnrollmentID string `json:"enrollment_id"`
	ContentID    string `json:"content_id"`
}

func (dto *ProgressDto) Validate() error {
	dto.EnrollmentID = strings.TrimSpace(dto.EnrollmentID)
	dto.ContentID = strings.TrimSpace(dto.ContentID)

	if dto.EnrollmentID == "" {
		return errors.New("enrollment_id is required")
	}

	if dto.ContentID == "" {
		return errors.New("content_id is required")
	}

	return nil
}

func (dto *ProgressDto) ToEntity() *entities.Progress {
	return &entities.Progress{
		EnrollmentID: dto.EnrollmentID,
		ContentID:    dto.ContentID,
	}
}
