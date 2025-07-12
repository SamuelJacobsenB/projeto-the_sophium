package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type QuizRepository struct {
	db *gorm.DB
}

func NewQuizRepository(db *gorm.DB) *QuizRepository {
	return &QuizRepository{db}
}

func (repo *QuizRepository) FindByID(id string) (*entities.Quiz, error) {
	var quiz entities.Quiz

	if err := repo.db.Where("id = ?", id).First(&quiz).Error; err != nil {
		return nil, err
	}

	return &quiz, nil
}

func (repo *QuizRepository) FindWithQuestions(id string) (*entities.Quiz, error) {
	var quiz entities.Quiz

	if err := repo.db.Preload("Questions").Where("id = ?", id).First(&quiz).Error; err != nil {
		return nil, err
	}

	return &quiz, nil
}

func (repo *QuizRepository) Create(quiz *entities.Quiz) error {
	return repo.db.Create(quiz).Error
}

func (repo *QuizRepository) Update(quiz *entities.Quiz, id string) error {
	return repo.db.Model(&entities.Quiz{}).Where("id = ?", id).Updates(quiz).Error
}

func (repo *QuizRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Quiz{}, "id = ?", id).Error
}
