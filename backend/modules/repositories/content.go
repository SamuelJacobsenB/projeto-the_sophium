package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ContentRepository struct {
	db *gorm.DB
}

func NewContentRepository(db *gorm.DB) *ContentRepository {
	return &ContentRepository{db}
}

func (repo *ContentRepository) FindByID(id string) (*entities.Content, error) {
	var content *entities.Content

	if err := repo.db.Preload("File").First(&content, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return content, nil
}

func (repo *ContentRepository) FindByOrder(order int, moduleID string) (*entities.Content, error) {
	var content *entities.Content

	if err := repo.db.Where(`"order" = ? AND module_id = ?`, order, moduleID).First(&content).Error; err != nil {
		return nil, err
	}

	return content, nil
}

func (repo *ContentRepository) Create(content *entities.Content) error {
	content.ID = uuid.NewString()

	return repo.db.Create(content).Error
}

func (repo *ContentRepository) Update(content *entities.Content, id string) error {
	return repo.db.Model(&entities.Content{}).Where("id = ?", id).Updates(content).Error
}

func (repo *ContentRepository) UpdateOrder(order int, id string) error {
	return repo.db.Model(&entities.Content{}).Where("id = ?", id).Update("order", order).Error
}

func (repo *ContentRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Content{}, "id = ?", id).Error
}
