package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type EnrollmentRepository struct {
	db *gorm.DB
}

func NewEnrollmentRepository(db *gorm.DB) *EnrollmentRepository {
	return &EnrollmentRepository{db}
}

func (repo *EnrollmentRepository) FindByID(id string) (*entities.Enrollment, error) {
	var enrollment *entities.Enrollment

	if err := repo.db.Where("id = ?", id).First(&enrollment).Error; err != nil {
		return nil, err
	}

	return enrollment, nil
}

func (repo *EnrollmentRepository) FindByUserAndCourse(userID string, courseID string) (*entities.Enrollment, error) {
	var enrollment *entities.Enrollment

	if err := repo.db.Where("user_id = ? AND course_id = ?", userID, courseID).First(&enrollment).Error; err != nil {
		return nil, err
	}

	return enrollment, nil
}

func (repo *EnrollmentRepository) Create(enrollment *entities.Enrollment) error {
	return repo.db.Create(enrollment).Error
}

func (repo *EnrollmentRepository) Update(enrollment *entities.Enrollment, id string) error {
	return repo.db.Model(&entities.Enrollment{}).Where("id = ?", id).Updates(enrollment).Error
}

func (repo *EnrollmentRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Enrollment{}, "id = ?", id).Error
}
