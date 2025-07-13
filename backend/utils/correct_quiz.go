package utils

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

func CorrectQuiz(questions *[]entities.Question, answers *[]types.AnswerInput) *[]types.Correction {
	corrections := make([]types.Correction, len(*questions))
	for i, question := range *questions {
		corrections[i] = types.Correction{
			QuestionIndex: i,
			Selected:      (*answers)[i].Selected,
			CorrectIndex:  *question.CorrectIndex,
		}
	}

	return &corrections
}
