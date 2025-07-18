package services

import (
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/request"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type FileService struct {
	repository *repositories.FileRepository
}

func NewFileService(repository *repositories.FileRepository) *FileService {
	return &FileService{repository: repository}
}

func (service *FileService) FindByID(id string) (*entities.File, error) {
	return service.repository.FindByID(id)
}

func (service *FileService) Create(formFile *multipart.FileHeader) (*entities.File, error) {
	ext := filepath.Ext(formFile.Filename)
	ext = strings.TrimPrefix(ext, ".")

	fileDTO := &request.FileDto{
		Name:      formFile.Filename,
		Size:      formFile.Size,
		Extension: types.Extension(ext),
	}

	if err := fileDTO.Validate(); err != nil {
		return nil, err
	}

	file := fileDTO.ToEntity()

	if err := service.repository.Create(file); err != nil {
		return nil, err
	}

	fileName := fmt.Sprintf("%s.%s", file.ID, ext)
	uploadPath := filepath.Join("uploads", ext, fileName)
	fullPath := os.Getenv("BACKEND_URL") + "/" + uploadPath

	if err := utils.SaveFile(formFile, uploadPath); err != nil {
		return nil, err
	}

	file.Path = fullPath
	service.repository.Update(file, file.ID)

	return file, nil
}

func (service *FileService) Update(file *entities.File, id string) error {
	return service.repository.Update(file, id)
}

func (service *FileService) DeleteByID(id string) error {
	file, err := service.repository.FindByID(id)

	if err != nil {
		return err
	}

	if err := service.repository.DeleteByID(id); err != nil {
		return err
	}

	fileName := fmt.Sprintf("%s.%s", file.ID, file.Extension)
	path := filepath.Join("../../uploads", string(file.Extension), fileName)

	if err := os.Remove(path); err != nil {
		return err
	}

	return nil
}
