package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type ModuleRepository struct {
	db *gorm.DB
}

func NewModuleRepository(db *gorm.DB) *ModuleRepository {
	return &ModuleRepository{db}
}

func (repo *ModuleRepository) FindByID(id string) (*entities.Module, error) {
	var module *entities.Module

	if err := repo.db.Preload("Quiz").First(&module, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return module, nil
}

func (repo *ModuleRepository) FindBySlug(slug string) (*entities.Module, error) {
	var module *entities.Module

	if err := repo.db.Preload("Quiz").First(&module, "slug = ?", slug).Error; err != nil {
		return nil, err
	}

	return module, nil
}

func (repo *ModuleRepository) Create(module *entities.Module) error {
	return repo.db.Create(module).Error
}

func (repo *ModuleRepository) Update(module *entities.Module, id string) error {
	return repo.db.Model(&entities.Module{}).Where("id = ?", id).Updates(module).Error
}

func (repo *ModuleRepository) FindByOrder(order int, courseID string) (*entities.Module, error) {
	var module *entities.Module

	if err := repo.db.Where("order = ? AND course_id = ?", order, courseID).First(&module).Error; err != nil {
		return nil, err
	}

	return module, nil
}

func (repo *ModuleRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Module{}, "id = ?", id).Error
}
