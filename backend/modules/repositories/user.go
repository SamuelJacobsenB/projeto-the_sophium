package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/types"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db}
}

func (repo *UserRepository) FindByID(id string) (*entities.User, error) {
	var user *entities.User

	if err := repo.db.Preload("Avatar").Preload("Enrollments").Preload("Enrollments.Progress").Preload("Enrollments.Quizes").Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (repo *UserRepository) FindByEmail(email string) (*entities.User, error) {
	var user *entities.User

	if err := repo.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (repo *UserRepository) Create(user *entities.User) error {
	user.ID = uuid.NewString()
	if len(user.Roles) == 0 {
		user.Roles = types.Roles{types.USER}
	}

	return repo.db.Create(user).Error
}

func (repo *UserRepository) Update(user *entities.User, id string) error {
	return repo.db.Model(&entities.User{}).Where("id = ?", id).Updates(user).Error
}

func (repo *UserRepository) VerifyUserByID(id string) error {
	return repo.db.Model(&entities.User{}).Where("id = ?", id).Updates(map[string]interface{}{
		"is_verified":        true,
		"verification_token": nil,
		"token_created_at":   nil,
	}).Error
}

func (repo *UserRepository) DeleteUnverifiedUsersByEmail(email string) error {
	return repo.db.Where("email = ? AND is_verified = false", email).Delete(&entities.User{}).Error
}

func (repo *UserRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.User{}, "id = ?", id).Error
}
