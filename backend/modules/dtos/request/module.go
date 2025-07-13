package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type ModuleDto struct {
	Title    string  `json:"title"`
	Slug     string  `json:"slug"`
	CourseID string  `json:"course_id"`
	Order    int     `json:"order"`
	QuizID   *string `json:"quiz_id,omitempty"`
}

func (dto *ModuleDto) Validate() error {
	dto.Title = strings.TrimSpace(dto.Title)
	dto.CourseID = strings.TrimSpace(dto.CourseID)
	dto.Slug = utils.NormalizeSlug(dto.Slug)

	if dto.Title == "" {
		return errors.New("title is required")
	}

	if len(dto.Title) > 100 {
		return errors.New("title must be less than 100 characters")
	}

	if dto.Slug == "" {
		return errors.New("slug is required")
	}

	if len(dto.Slug) > 100 {
		return errors.New("slug must be less than 100 characters")
	}

	if dto.CourseID == "" {
		return errors.New("course_id is required")
	}

	if dto.Order < 0 {
		return errors.New("order must be greater than or equal to 0")
	}

	return nil
}

func (dto *ModuleDto) ToEntity() *entities.Module {
	return &entities.Module{
		Title:    dto.Title,
		Slug:     dto.Slug,
		CourseID: dto.CourseID,
		Order:    dto.Order,
		QuizID:   dto.QuizID,
	}
}
