package request

import (
	"errors"
	"strings"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type UserDto struct {
	Name     string  `json:"name"`
	Email    string  `json:"email"`
	Password string  `json:"password"`
	Phone    *string `json:"phone,omitempty"`
	Bio      *string `json:"bio,omitempty"`
	AvatarID *string `json:"avatar_id,omitempty"`
}

func (dto *UserDto) Validate() error {
	dto.Name = strings.TrimSpace(dto.Name)
	dto.Email = strings.TrimSpace(dto.Email)
	dto.Password = strings.TrimSpace(dto.Password)

	if dto.Name == "" {
		return errors.New("name is required")
	}

	if err := utils.ValidateName(dto.Name); err != nil {
		return errors.New(err.Error())
	}

	dto.Name = utils.CapitalizeName(dto.Name)

	if dto.Email == "" {
		return errors.New("email is required")
	}

	if err := utils.ValidateEmail(dto.Email); err != nil {
		return errors.New(err.Error())
	}

	if dto.Password == "" {
		return errors.New("password is required")
	}

	if err := utils.ValidatePassword(dto.Password); err != nil {
		return errors.New(err.Error())
	}

	if dto.Phone != nil {
		*dto.Phone = strings.TrimSpace(*dto.Phone)

		if err := utils.ValidatePhone(*dto.Phone); err != nil {
			return errors.New(err.Error())
		}
	}

	return nil
}

func (dto *UserDto) ToEntity() *entities.User {
	return &entities.User{
		Name:     dto.Name,
		Email:    dto.Email,
		Password: dto.Password,
		Phone:    dto.Phone,
		Bio:      dto.Bio,
		AvatarID: dto.AvatarID,
	}
}
