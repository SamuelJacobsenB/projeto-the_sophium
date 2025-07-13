package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"gorm.io/gorm"
)

type CourseRepository struct {
	db *gorm.DB
}

func NewCourseRepository(db *gorm.DB) *CourseRepository {
	return &CourseRepository{db}
}

func (repo *CourseRepository) FindByID(id string) (*entities.Course, error) {
	var course *entities.Course

	if err := repo.db.Where("id = ?", id).First(&course).Error; err != nil {
		return nil, err
	}

	return course, nil
}

func (repo *CourseRepository) FindBySlug(slug string) (*entities.Course, error) {
	var course *entities.Course

	if err := repo.db.Where("slug = ?", slug).First(&course).Error; err != nil {
		return nil, err
	}

	return course, nil
}

func (repo *CourseRepository) Create(course *entities.Course) error {
	return repo.db.Create(course).Error
}

func (repo *CourseRepository) Update(course *entities.Course, id string) error {
	return repo.db.Model(&entities.Course{}).Where("id = ?", id).Updates(course).Error
}

func (repo *CourseRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Course{}, "id = ?", id).Error
}
