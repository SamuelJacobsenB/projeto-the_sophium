package services

import (
	"errors"
	"fmt"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type ContentService struct {
	repository *repositories.ContentRepository
	moduleRepo *repositories.ModuleRepository
	fileRepo   *repositories.FileRepository
}

func NewContentService(repository *repositories.ContentRepository, moduleRepo *repositories.ModuleRepository, fileRepo *repositories.FileRepository) *ContentService {
	return &ContentService{repository, moduleRepo, fileRepo}
}

func (service *ContentService) FindByID(id string) (*entities.Content, error) {
	return service.repository.FindByID(id)
}

func (service *ContentService) Create(content *entities.Content) error {
	module, err := service.moduleRepo.FindByID(content.ModuleID)
	if err != nil {
		return err
	}
	if module == nil {
		return errors.New("module not found")
	}

	content.Order = len(module.Contents)

	if content.FileID != nil {
		file, err := service.fileRepo.FindByID(*content.FileID)
		fmt.Println("hello", file)
		if err != nil {
			return err
		}
		if file == nil {
			return errors.New("file not found")
		}
	}

	return service.repository.Create(content)
}

func (service *ContentService) UpdateFile(file *entities.File, id string) (string, error) {
	content, err := service.repository.FindByID(id)
	if err != nil {
		return "", err
	}

	lastFileID := content.FileID
	content.FileID = &file.ID

	if err := service.repository.Update(content, id); err != nil {
		return "", err
	}

	return *lastFileID, nil
}

func (service *ContentService) Update(content *entities.Content, id string) error {
	return service.repository.Update(content, id)
}

func (service *ContentService) ChangeOrder(id string) error {
	content, err := service.repository.FindByID(id)
	if err != nil {
		return err
	}

	if content.Order == 0 {
		return nil
	}

	previous, err := service.repository.FindByOrder(content.Order-1, content.ModuleID)
	if err != nil {
		return err
	}

	content.Order, previous.Order = previous.Order, content.Order

	if err := service.repository.Update(content, content.ID); err != nil {
		return err
	}
	if err := service.repository.Update(previous, previous.ID); err != nil {
		return err
	}

	return nil
}

func (service *ContentService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
