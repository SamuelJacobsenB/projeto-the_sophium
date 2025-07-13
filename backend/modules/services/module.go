package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type ModuleService struct {
	repository *repositories.ModuleRepository
	courseRepo *repositories.CourseRepository
}

func NewModuleService(repository *repositories.ModuleRepository, courseRepo *repositories.CourseRepository) *ModuleService {
	return &ModuleService{repository, courseRepo}
}

func (service *ModuleService) FindByID(id string) (*entities.Module, error) {
	return service.repository.FindByID(id)
}

func (service *ModuleService) FindBySlug(slug string) (*entities.Module, error) {
	return service.repository.FindBySlug(slug)
}

func (service *ModuleService) Create(module *entities.Module) error {
	course, err := service.courseRepo.FindByID(module.CourseID)
	if err != nil {
		return err
	}
	if course == nil {
		return errors.New("course not found")
	}

	return service.repository.Create(module)
}

func (service *ModuleService) Update(module *entities.Module, id string) error {
	return service.repository.Update(module, id)
}

func (service *ModuleService) ChangeOrder(id string) error {
	module, err := service.repository.FindByID(id)
	if err != nil {
		return err
	}

	if module.Order == 0 {
		return nil
	}

	previous, err := service.repository.FindByOrder(module.Order-1, module.CourseID)
	if err != nil {
		return err
	}

	module.Order, previous.Order = previous.Order, module.Order

	if err := service.repository.Update(module, module.ID); err != nil {
		return err
	}
	if err := service.repository.Update(previous, previous.ID); err != nil {
		return err
	}

	return nil
}

func (service *ModuleService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
