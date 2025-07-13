package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type ProgressService struct {
	repository     *repositories.ProgressRepository
	enrollmentRepo *repositories.EnrollmentRepository
}

func NewProgressService(repository *repositories.ProgressRepository, enrollmentRepo *repositories.EnrollmentRepository) *ProgressService {
	return &ProgressService{repository, enrollmentRepo}
}

func (service *ProgressService) FindByID(id string) (*entities.Progress, error) {
	return service.repository.FindByID(id)
}

func (service *ProgressService) Create(progress *entities.Progress) error {
	enrollmentExists, err := service.enrollmentRepo.FindByID(progress.EnrollmentID)
	if err != nil {
		return err
	}
	if enrollmentExists == nil {
		return errors.New("enrollment not found")
	}

	progressExists, err := service.repository.FindByID(progress.ID)
	if err == nil {
		return err
	}
	if progressExists != nil {
		return errors.New("progress already exists")
	}

	return service.repository.Create(progress)
}

func (service *ProgressService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
