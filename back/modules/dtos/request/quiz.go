package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/entities"
)

type QuizDto struct {
	Title       string  `json:"title"`
	Description *string `json:"description"`
	OwnerID     string  `json:"owner_id"`
}

func (dto *QuizDto) Validate() error {
	dto.Title = strings.TrimSpace(dto.Title)
	dto.OwnerID = strings.TrimSpace(dto.OwnerID)

	if dto.Title == "" {
		return errors.New("title is required")
	}

	if len(dto.Title) > 100 {
		return errors.New("title must be less than 100 characters")
	}

	if dto.Description != nil {
		*dto.Description = strings.TrimSpace(*dto.Description)

		if len(*dto.Description) > 1000 {
			return errors.New("description must be less than 1000 characters")
		}
	}

	if dto.OwnerID == "" {
		return errors.New("owner_id is required")
	}

	return nil
}

func (dto *QuizDto) ToEntity() *entities.Quiz {
	return &entities.Quiz{
		Title:       dto.Title,
		Description: dto.Description,
		OwnerID:     dto.OwnerID,
	}
}
