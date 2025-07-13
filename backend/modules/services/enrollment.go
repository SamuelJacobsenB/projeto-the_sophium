package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type EnrollmentService struct {
	repository *repositories.EnrollmentRepository
	userRepo   *repositories.UserRepository
	courseRepo *repositories.CourseRepository
}

func NewEnrollmentService(repository *repositories.EnrollmentRepository, userRepo *repositories.UserRepository, courseRepo *repositories.CourseRepository) *EnrollmentService {
	return &EnrollmentService{repository, userRepo, courseRepo}
}

func (service *EnrollmentService) FindByID(id string) (*entities.Enrollment, error) {
	return service.repository.FindByID(id)
}

func (service *EnrollmentService) Create(enrollment *entities.Enrollment) error {
	courseExists, err := service.courseRepo.FindByID(enrollment.CourseID)
	if err != nil {
		return err
	}
	if courseExists == nil {
		return errors.New("course not found")
	}

	userExists, err := service.userRepo.FindByID(enrollment.UserID)
	if err != nil {
		return err
	}
	if userExists == nil {
		return errors.New("user not found")
	}

	return service.repository.Create(enrollment)
}

func (service *EnrollmentService) Update(enrollment *entities.Enrollment, id string) error {
	return service.repository.Update(enrollment, id)
}

func (service *EnrollmentService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
