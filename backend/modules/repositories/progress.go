package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type ProgressRepository struct {
	db *gorm.DB
}

func NewProgressRepository(db *gorm.DB) *ProgressRepository {
	return &ProgressRepository{db}
}

func (repo *ProgressRepository) FindByID(id string) (*entities.Progress, error) {
	var progress *entities.Progress

	if err := repo.db.Where("id = ?", id).First(&progress).Error; err != nil {
		return nil, err
	}

	return progress, nil
}

func (repo *ProgressRepository) Create(progress *entities.Progress) error {
	return repo.db.Create(progress).Error
}

func (repo *ProgressRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Progress{}, "id = ?", id).Error
}
