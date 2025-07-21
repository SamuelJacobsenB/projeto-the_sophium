package services

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type CourseService struct {
	repository *repositories.CourseRepository
	fileRepo   *repositories.FileRepository
}

func NewCourseService(repository *repositories.CourseRepository, fileRepo *repositories.FileRepository) *CourseService {
	return &CourseService{repository, fileRepo}
}

func (service *CourseService) FindAll() ([]*entities.Course, error) {
	return service.repository.FindAll()
}

func (service *CourseService) FindByID(id string) (*entities.Course, error) {
	return service.repository.FindByID(id)
}

func (service *CourseService) FindBySlug(slug string) (*entities.Course, error) {
	return service.repository.FindBySlug(slug)
}

func (service *CourseService) Create(course *entities.Course) error {
	if course.FileID != nil {
		_, err := service.fileRepo.FindByID(*course.FileID)

		if err != nil {
			return err
		}
	}

	return service.repository.Create(course)
}

func (service *CourseService) Update(course *entities.Course, id string) error {
	return service.repository.Update(course, id)
}

func (service *CourseService) DeleteByID(id string) error {
	course, err := service.repository.FindByID(id)
	if err != nil {
		return err
	}

	if course.FileID != nil {
		if err := service.fileRepo.DeleteByID(*course.FileID); err != nil {
			return err
		}
	}

	return service.repository.DeleteByID(id)
}
