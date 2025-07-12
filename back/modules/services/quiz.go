package services

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type QuizService struct {
	repository *repositories.QuizRepository
}

func NewQuizService(repository *repositories.QuizRepository) *QuizService {
	return &QuizService{repository}
}

func (service *QuizService) FindByID(id string) (*entities.Quiz, error) {
	return service.repository.FindByID(id)
}

func (service *QuizService) FindWithQuestions(id string) (*entities.Quiz, error) {
	return service.repository.FindWithQuestions(id)
}

func (service *QuizService) Create(quiz *entities.Quiz) error {
	return service.repository.Create(quiz)
}

func (service *QuizService) Update(quiz *entities.Quiz, id string) error {
	return service.repository.Update(quiz, id)
}

func (service *QuizService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
