package response

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/types"
)

type QuestionDTO struct {
	ID           string             `json:"id"`
	QuizID       string             `json:"quiz_id"`
	Statement    string             `json:"statement"`
	Type         types.QuestionType `json:"type"`
	FileID       *string            `json:"file_id,omitempty"`
	File         *FileDTO           `json:"file,omitempty"`
	Answer       *bool              `json:"answer,omitempty"`
	Options      []string           `json:"options,omitempty"`
	CorrectIndex *int               `json:"correct_index,omitempty"`
	CreatedAt    time.Time          `json:"created_at"`
	UpdatedAt    time.Time          `json:"updated_at"`
}
