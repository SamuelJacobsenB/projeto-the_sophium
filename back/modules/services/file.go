package services

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/repositories"
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

func (service *FileService) Create(file *entities.File) error {
	if err := service.repository.Create(file); err != nil {
		return err
	}

	fileName := fmt.Sprintf("%s.%s", file.ID, file.Extension)
	path := filepath.Join("../../uploads", string(file.Extension), fileName)

	if _, err := os.Create(path); err != nil {
		return err
	}

	return nil
}

func (service *FileService) Update(file *entities.File) error {
	return service.repository.Update(file)
}

func (service *FileService) DeleteByID(id string) error {
	file, err := service.repository.FindByID(id)

	if err != nil {
		return err
	}

	if err := service.repository.DeleteByID(id); err != nil {
		return err
	}

	path := fmt.Sprintf("../../uploads/%s/%s.%s", file.Extension, file.Name, file.Extension)

	if err := os.Remove(path); err != nil {
		return err
	}

	return nil
}
