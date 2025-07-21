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
}

func (dto *ModuleDto) Validate() error {
	dto.Title = strings.TrimSpace(dto.Title)
	dto.CourseID = strings.TrimSpace(dto.CourseID)
	dto.Slug = utils.NormalizeSlug(dto.Slug)

	if dto.Title == "" {
		return errors.New("title is required")
	}

	if len(dto.Title) > 50 {
		return errors.New("title must be less than 50 characters")
	}

	if dto.Slug == "" {
		return errors.New("slug is required")
	}

	if len(dto.Slug) > 50 {
		return errors.New("slug must be less than 50 characters")
	}

	if dto.CourseID == "" {
		return errors.New("course_id is required")
	}

	return nil
}

func (dto *ModuleDto) ToEntity() *entities.Module {
	return &entities.Module{
		Title:    dto.Title,
		Slug:     dto.Slug,
		CourseID: dto.CourseID,
	}
}
