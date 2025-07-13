package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

type QuestionDto struct {
	QuizID       string             `json:"quiz_id"`
	Statement    string             `json:"statement"`
	Type         types.QuestionType `json:"type"`
	FileID       *string            `json:"file_id,omitempty"`
	Options      []string           `json:"options,omitempty"`
	CorrectIndex *int               `json:"correct_index,omitempty"`
}

func (dto *QuestionDto) Validate() error {
	dto.Statement = strings.TrimSpace(dto.Statement)
	dto.QuizID = strings.TrimSpace(dto.QuizID)

	if dto.QuizID == "" {
		return errors.New("quiz_id is required")
	}

	if dto.Statement == "" {
		return errors.New("statement is required")
	}

	if len(dto.Statement) > 1000 {
		return errors.New("statement must be less than 1000 characters")
	}

	if dto.Type == types.TrueFalse && dto.CorrectIndex != nil && *dto.CorrectIndex != 0 && *dto.CorrectIndex != 1 {
		return errors.New("answer is required for true_false questions")

	}

	if dto.Type == types.MultipleChoice {
		if len(dto.Options) != 4 {
			return errors.New("multiple_choice must have exactly 4 options")
		}

		for i, opt := range dto.Options {
			dto.Options[i] = strings.TrimSpace(opt)
			if opt == "" {
				return errors.New("options must not be empty")
			}
		}

		if dto.CorrectIndex == nil || *dto.CorrectIndex < 0 || *dto.CorrectIndex > 3 {
			return errors.New("correct_index must be between 0 and 3")
		}
	}

	return nil
}

func (dto *QuestionDto) ToEntity() *entities.Question {
	return &entities.Question{
		QuizID:       dto.QuizID,
		Statement:    dto.Statement,
		Type:         dto.Type,
		FileID:       dto.FileID,
		Options:      dto.Options,
		CorrectIndex: dto.CorrectIndex,
	}
}
