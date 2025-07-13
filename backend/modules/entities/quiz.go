package entities

import (
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/response"
)

type Quiz struct {
	ID          string    `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Description *string   `json:"description" gorm:"type:text"`
	OwnerID     string    `json:"owner_id" gorm:"not null"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	Questions []Question `json:"questions,omitempty" gorm:"foreignKey:QuizID;constraint:OnDelete:CASCADE"`
}

func (quiz *Quiz) ToResponseDTO() *response.QuizDTO {
	responseQuestions := make([]response.QuestionDTO, len(quiz.Questions))
	for i, question := range quiz.Questions {
		responseQuestions[i] = *question.ToResponseDTO()
	}

	return &response.QuizDTO{
		ID:          quiz.ID,
		Title:       quiz.Title,
		Description: quiz.Description,
		OwnerID:     quiz.OwnerID,
		CreatedAt:   quiz.CreatedAt,
		UpdatedAt:   quiz.UpdatedAt,
		Questions:   responseQuestions,
	}
}
