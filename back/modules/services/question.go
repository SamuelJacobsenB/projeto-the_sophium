package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
)

type QuestionService struct {
	repository *repositories.QuestionRepository
	quizRepo   *repositories.QuizRepository
}

func NewQuestionService(repository *repositories.QuestionRepository, quizRepo *repositories.QuizRepository) *QuestionService {
	return &QuestionService{repository, quizRepo}
}

func (service *QuestionService) FindByID(id string) (*entities.Question, error) {
	return service.repository.FindByID(id)
}

func (service *QuestionService) Create(question *entities.Question) error {
	quiz, err := service.quizRepo.FindByID(question.QuizID)
	if err != nil {
		return err
	}
	if quiz == nil {
		return errors.New("quiz not found")
	}

	return service.repository.Create(question)
}

func (service *QuestionService) Update(question *entities.Question, id string) error {
	return service.repository.Update(question, id)
}

func (service *QuestionService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
