package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type QuestionRepository struct {
	db *gorm.DB
}

func NewQuestionRepository(db *gorm.DB) *QuestionRepository {
	return &QuestionRepository{db}
}

func (repo *QuestionRepository) FindByID(id string) (*entities.Question, error) {
	var question entities.Question

	if err := repo.db.Preload("File").Where("id = ?", id).First(&question).Error; err != nil {
		return nil, err
	}

	return &question, nil
}

func (repo *QuestionRepository) Create(question *entities.Question) error {
	return repo.db.Create(question).Error
}

func (repo *QuestionRepository) Update(question *entities.Question, id string) error {
	return repo.db.Model(&entities.Question{}).Where("id = ?", id).Updates(question).Error
}

func (repo *QuestionRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Question{}, "id = ?", id).Error
}
