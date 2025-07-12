package request

import (
	"errors"
	"fmt"
)

type QuizAttemptDto struct {
	EnrollmentID string        `json:"enrollment_id"`
	QuizID       string        `json:"quiz_id"`
	Answers      []AnswerInput `json:"answers"`
}

type AnswerInput struct {
	QuestionIndex int `json:"question_index"`
	Selected      int `json:"selected"`
}

func (dto *QuizAttemptDto) Validate() error {
	if dto.EnrollmentID == "" {
		return errors.New("enrollment_id is required")
	}

	if dto.QuizID == "" {
		return errors.New("quiz_id is required")
	}

	if len(dto.Answers) == 0 {
		return errors.New("answers must not be empty")
	}

	for i, answer := range dto.Answers {
		if answer.QuestionIndex < 0 {
			return fmt.Errorf("answers[%d]: question_index must be >= 0", i)
		}

		if answer.Selected < 0 || answer.Selected > 3 {
			return fmt.Errorf("answers[%d]: selected must be >= 0 and <= 3", i)
		}
	}

	return nil
}
