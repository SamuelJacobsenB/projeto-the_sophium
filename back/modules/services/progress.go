package services

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type ProgressService struct {
	repository *repositories.ProgressRepository
}

func NewProgressService(repository *repositories.ProgressRepository) *ProgressService {
	return &ProgressService{repository}
}

func (service *ProgressService) FindByID(id string) (*entities.Progress, error) {
	return service.repository.FindByID(id)
}

func (service *ProgressService) Create(progress *entities.Progress) error {
	// Verify if a content and enrollment exists
	exists, err := service.repository.FindByID(progress.ID)
	if err == nil {
		return err
	}
	if exists != nil {
		return nil
	}

	return service.repository.Create(progress)
}

func (service *ProgressService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
