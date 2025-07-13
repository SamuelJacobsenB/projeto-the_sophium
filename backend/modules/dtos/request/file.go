package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type FileDto struct {
	Name      string          `json:"name"`
	Path      string          `json:"path"`
	Extension types.Extension `json:"extension"`
	Size      int64           `json:"size"`
}

func (dto *FileDto) Validate() error {
	dto.Name = strings.ReplaceAll(strings.ToLower(strings.TrimSpace(dto.Name)), " ", "-")
	dto.Path = strings.ReplaceAll(strings.ToLower(strings.TrimSpace(dto.Path)), " ", "-")
	dto.Extension = types.Extension(strings.ToLower(strings.TrimSpace(string(dto.Extension))))

	if dto.Name == "" {
		return errors.New("name is required")
	}

	if len(dto.Name) > 100 {
		return errors.New("name must be less than 100 characters")
	}

	if dto.Path == "" {
		return errors.New("path is required")
	}

	if dto.Extension == "" {
		return errors.New("extension is required")
	}

	if !utils.ValidateExtension(dto.Extension) {
		return errors.New("extension is invalid")
	}

	if dto.Size == 0 {
		return errors.New("size is required")
	}

	return nil
}

func (dto *FileDto) ToEntity() *entities.File {
	return &entities.File{
		Name:      dto.Name,
		Path:      dto.Path,
		Extension: dto.Extension,
		Size:      dto.Size,
	}
}
