package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
)

type ContentDto struct {
	ModuleID string  `json:"module_id"`
	Title    string  `json:"title"`
	HTML     *string `json:"html"`
	VideoURL *string `json:"video_url,omitempty"`
	FileID   *string `json:"file_id,omitempty"`
}

func (dto *ContentDto) Validate() error {
	dto.ModuleID = strings.TrimSpace(dto.ModuleID)
	dto.Title = strings.TrimSpace(dto.Title)

	if dto.ModuleID == "" {
		return errors.New("module_id is required")
	}

	if dto.Title == "" {
		return errors.New("title is required")
	}

	if len(dto.Title) > 50 {
		return errors.New("title must be less than 50 characters")
	}

	if dto.HTML != nil {
		html := strings.TrimSpace(*dto.HTML)
		dto.HTML = &html

		if len(*dto.HTML) > 10000 {
			return errors.New("html must be less than 10000 characters")
		}
	}

	return nil
}

func (dto *ContentDto) ToEntity() *entities.Content {
	return &entities.Content{
		ModuleID: dto.ModuleID,
		Title:    dto.Title,
		HTML:     dto.HTML,
		VideoURL: dto.VideoURL,
		FileID:   dto.FileID,
	}
}
