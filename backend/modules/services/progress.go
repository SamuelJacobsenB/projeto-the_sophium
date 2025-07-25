package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type ProgressService struct {
	repository  *repositories.ProgressRepository
	contentRepo *repositories.ContentRepository
}

func NewProgressService(repository *repositories.ProgressRepository, contentRepo *repositories.ContentRepository) *ProgressService {
	return &ProgressService{repository, contentRepo}
}

func (service *ProgressService) FindByID(id string) (*entities.Progress, error) {
	return service.repository.FindByID(id)
}

func (service *ProgressService) Create(progress *entities.Progress) error {
	contentExists, err := service.contentRepo.FindByID(progress.ContentID)
	if err != nil {
		return err
	}
	if contentExists == nil {
		return errors.New("content not found")
	}

	progressExists, err := service.repository.FindByContentID(progress.ContentID)
	if err == nil && progressExists != nil {
		return errors.New("progress already exists")
	}

	return service.repository.Create(progress)
}

func (service *ProgressService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
