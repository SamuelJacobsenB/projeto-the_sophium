package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/google/uuid"
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

func (repo *ProgressRepository) FindByContentID(contentID string) (*entities.Progress, error) {
	var progress *entities.Progress

	if err := repo.db.Where("content_id = ?", contentID).First(&progress).Error; err != nil {
		return nil, err
	}

	return progress, nil
}

func (repo *ProgressRepository) Create(progress *entities.Progress) error {
	progress.ID = uuid.NewString()

	return repo.db.Create(progress).Error
}

func (repo *ProgressRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Progress{}, "id = ?", id).Error
}
