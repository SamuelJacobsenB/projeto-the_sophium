package services

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type EnrollmentService struct {
	repository *repositories.EnrollmentRepository
}

func NewEnrollmentService(repository *repositories.EnrollmentRepository) *EnrollmentService {
	return &EnrollmentService{repository}
}

func (service *EnrollmentService) FindByID(id string) (*entities.Enrollment, error) {
	return service.repository.FindByID(id)
}

func (service *EnrollmentService) Create(enrollment *entities.Enrollment) error {
	// Verify User ID
	// Verify Course ID

	return service.repository.Create(enrollment)
}

func (service *EnrollmentService) Update(enrollment *entities.Enrollment, id string) error {
	return service.repository.Update(enrollment, id)
}

func (service *EnrollmentService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
