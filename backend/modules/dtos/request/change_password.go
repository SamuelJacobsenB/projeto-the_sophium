package request

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type ChangePasswordDto struct {
	NewPassword string `json:"new_password"`
}

func (dto *ChangePasswordDto) Validate() error {
	if err := utils.ValidatePassword(dto.NewPassword); err != nil {
		return errors.New(err.Error())
	}

	return nil
}
