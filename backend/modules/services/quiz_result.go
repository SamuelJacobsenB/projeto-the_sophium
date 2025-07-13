package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/request"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type QuizResultService struct {
	repository     *repositories.QuizResultRepository
	quizRepo       *repositories.QuizRepository
	enrollmentRepo *repositories.EnrollmentRepository
}

func NewQuizResultService(repository *repositories.QuizResultRepository, quizRepo *repositories.QuizRepository, enrollmentRepo *repositories.EnrollmentRepository) *QuizResultService {
	return &QuizResultService{repository, quizRepo, enrollmentRepo}
}

func (service *QuizResultService) FindByID(id string) (*entities.QuizResult, error) {
	return service.repository.FindByID(id)
}

func (service *QuizResultService) Create(quizAttemptDto *request.QuizAttemptDto) (*entities.QuizResult, error) {
	// Verify if a content exists

	enrollmentExists, err := service.enrollmentRepo.FindByID(quizAttemptDto.EnrollmentID)
	if err != nil {
		return nil, err
	}
	if enrollmentExists == nil {
		return nil, errors.New("enrollment not found")
	}

	quiz, err := service.quizRepo.FindWithQuestions(quizAttemptDto.QuizID)
	if err != nil {
		return nil, err
	}
	if quiz == nil {
		return nil, errors.New("quiz not found")
	}

	if len(quiz.Questions) != len(quizAttemptDto.Answers) {
		return nil, errors.New("quiz and answers length mismatch")
	}

	corrections := utils.CorrectQuiz(&quiz.Questions, &quizAttemptDto.Answers)

	quizResult := &entities.QuizResult{
		EnrollmentID: quizAttemptDto.EnrollmentID,
		QuizID:       quizAttemptDto.QuizID,
		Corrections:  *corrections,
	}

	if err := service.repository.Create(quizResult); err != nil {
		return nil, err
	}

	return quizResult, nil
}

func (service *QuizResultService) Update(quizAttemptDto *request.QuizAttemptDto, id string) (*entities.QuizResult, error) {
	quiz, err := service.quizRepo.FindWithQuestions(quizAttemptDto.QuizID)
	if err != nil {
		return nil, err
	}
	if quiz == nil {
		return nil, errors.New("quiz not found")
	}

	if len(quiz.Questions) != len(quizAttemptDto.Answers) {
		return nil, errors.New("quiz and answers length mismatch")
	}

	corrections := utils.CorrectQuiz(&quiz.Questions, &quizAttemptDto.Answers)

	quizResult, err := service.repository.FindByID(id)
	if err != nil {
		return nil, err
	}
	if quizResult == nil {
		return nil, errors.New("quiz result not found")
	}

	quizResult.Attempts = quizResult.Attempts + 1
	quizResult.Corrections = *corrections

	if err := service.repository.Update(quizResult, id); err != nil {
		return nil, err
	}

	return quizResult, nil
}

func (service *QuizResultService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
