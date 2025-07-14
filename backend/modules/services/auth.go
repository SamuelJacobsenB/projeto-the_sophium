package services

import (
	"errors"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/request"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type AuthService struct {
	userRepo *repositories.UserRepository
}

func NewAuthService(userRepo *repositories.UserRepository) *AuthService {
	return &AuthService{userRepo}
}

func (service *AuthService) Login(loginDTO *request.LoginDTO) (string, error) {
	user, err := service.userRepo.FindByEmail(loginDTO.Email)
	if err != nil {
		return "", err
	}
	if user == nil {
		return "", errors.New("user not found")
	}

	if err := utils.CompareHash(loginDTO.Password, user.Password); err != nil {
		return "", err
	}

	return utils.GenerateToken(), nil
}
