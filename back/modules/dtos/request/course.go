package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type CourseDto struct {
	Title       string  `json:"title"`
	Slug        string  `json:"slug"`
	Description string  `json:"description"`
	FileID      *string `json:"file_id,omitempty"`
}

func (dto *CourseDto) Validate() error {
	dto.Title = strings.TrimSpace(dto.Title)
	dto.Description = strings.TrimSpace(dto.Description)
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

	if dto.Description == "" {
		return errors.New("description is required")
	}

	return nil
}

func (dto *CourseDto) ToEntity() *entities.Course {
	return &entities.Course{
		Title:       dto.Title,
		Slug:        dto.Slug,
		Description: dto.Description,
		FileID:      dto.FileID,
	}
}
