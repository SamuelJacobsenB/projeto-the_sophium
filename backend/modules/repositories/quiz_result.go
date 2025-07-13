package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type QuizResultRepository struct {
	db *gorm.DB
}

func NewQuizResultRepository(db *gorm.DB) *QuizResultRepository {
	return &QuizResultRepository{db}
}

func (repo *QuizResultRepository) FindByID(id string) (*entities.QuizResult, error) {
	var quizResult *entities.QuizResult

	if err := repo.db.Where("id = ?", id).First(&quizResult).Error; err != nil {
		return nil, err
	}

	return quizResult, nil
}

func (repo *QuizResultRepository) Create(quizResult *entities.QuizResult) error {
	return repo.db.Create(quizResult).Error
}

func (repo *QuizResultRepository) Update(quizResult *entities.QuizResult, id string) error {
	return repo.db.Model(&entities.QuizResult{}).Where("id = ?", id).Updates(quizResult).Error
}

func (repo *QuizResultRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.QuizResult{}, "id = ?", id).Error
}
