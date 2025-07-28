package services

import (
	"errors"
	"fmt"
	"time"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/utils"
)

type UserService struct {
	repository *repositories.UserRepository
}

func NewUserService(repository *repositories.UserRepository) *UserService {
	return &UserService{repository}
}

func (service *UserService) FindByID(id string) (*entities.User, error) {
	return service.repository.FindByID(id)
}

func (service *UserService) FindByEmail(email string) (*entities.User, error) {
	return service.repository.FindByEmail(email)
}

func (service *UserService) Create(user *entities.User) error {
	exists, _ := service.repository.FindByEmail(user.Email)
	if exists != nil && exists.IsVerified {
		return errors.New("user already exists")
	}

	token := utils.GenerateToken()

	if err := utils.SendEmail(user.Email, "Bem vindo(a) ao The Sophium!", utils.GenerateWelcomeText(user.Name, token)); err != nil {
		return err
	}

	hashToken, err := utils.Hash(token)
	if err != nil {
		return err
	}

	verification := hashToken
	user.VerificationToken = &verification

	now := time.Now()
	user.TokenCreatedAt = &now

	hashPassword, err := utils.Hash(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashPassword

	return service.repository.Create(user)
}

func (service *UserService) Update(user *entities.User, id string) error {
	return service.repository.Update(user, id)
}

func (service *UserService) UpdateAvatarID(id string) error {
	return service.repository.UpdateAvatarID(id)
}

func (service *UserService) RequestPasswordChange(id string) error {
	user, err := service.repository.FindByID(id)
	if err != nil {
		return err
	}

	token := utils.GenerateToken()

	hashedToken, err := utils.Hash(token)
	if err != nil {
		return err
	}

	fmt.Println(token, hashedToken)

	verification := hashedToken
	user.VerificationToken = &verification

	now := time.Now()
	user.TokenCreatedAt = &now

	if err := service.repository.Update(user, id); err != nil {
		return err
	}

	return utils.SendEmail(user.Email, "Confirmação de troca de senha", utils.GenerateResetPasswordText(user.Name, token))
}

func (service *UserService) VerifyToken(id, token string) error {
	user, err := service.repository.FindByID(id)
	fmt.Println(user)
	if err != nil {
		return err
	}

	if user.IsVerified {
		return errors.New("user is already verified")
	}

	if user.TokenCreatedAt == nil {
		return errors.New("token not found")
	}

	if err := utils.CompareHash(token, *user.VerificationToken); err != nil {
		return err
	}

	if time.Since(*user.TokenCreatedAt) > time.Minute*10 {
		return errors.New("token is expired")
	}

	if err := service.repository.VerifyUserByID(id); err != nil {
		return err
	}

	return service.repository.DeleteUnverifiedUsersByEmail(user.Email)
}

func (service *UserService) ConfirmPasswordChange(id, token, newPassword string) error {
	user, err := service.repository.FindByID(id)
	if err != nil {
		return err
	}

	if user.VerificationToken == nil || user.TokenCreatedAt == nil {
		return errors.New("nenhum pedido de troca de senha foi feito")
	}

	if time.Since(*user.TokenCreatedAt) > time.Minute*10 {
		return errors.New("token expirado")
	}

	if err := utils.CompareHash(token, *user.VerificationToken); err != nil {
		return errors.New("token inválido")
	}

	hashedPassword, err := utils.Hash(newPassword)
	if err != nil {
		return err
	}

	user.Password = hashedPassword
	user.VerificationToken = nil
	user.TokenCreatedAt = nil

	return service.repository.Update(user, id)
}

func (service *UserService) DeleteByID(id string) error {
	return service.repository.DeleteByID(id)
}
