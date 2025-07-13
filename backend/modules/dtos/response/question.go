package response

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
)

type QuestionDTO struct {
	ID        string             `json:"id"`
	QuizID    string             `json:"quiz_id"`
	Statement string             `json:"statement"`
	Type      types.QuestionType `json:"type"`
	FileID    *string            `json:"file_id,omitempty"`
	File      *FileDTO           `json:"file,omitempty"`
	Options   []string           `json:"options,omitempty"`
	CreatedAt time.Time          `json:"created_at"`
	UpdatedAt time.Time          `json:"updated_at"`
}
