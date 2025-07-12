package types

type Correction struct {
	QuestionIndex int `json:"question_index"`
	Selected      int `json:"selected"`
	CorrectIndex  int `json:"correct_index"`
}
