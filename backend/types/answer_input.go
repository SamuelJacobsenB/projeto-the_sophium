package types

type AnswerInput struct {
	QuestionIndex int `json:"question_index"`
	Selected      int `json:"selected"`
}
