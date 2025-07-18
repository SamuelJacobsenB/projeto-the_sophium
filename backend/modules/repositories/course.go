package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/entities"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CourseRepository struct {
	db *gorm.DB
}

func NewCourseRepository(db *gorm.DB) *CourseRepository {
	return &CourseRepository{db}
}

func (repo *CourseRepository) FindAll() ([]*entities.Course, error) {
	var courses []*entities.Course

	if err := repo.db.Preload("File").Find(&courses).Error; err != nil {
		return nil, err
	}

	return courses, nil
}

func (repo *CourseRepository) FindByID(id string) (*entities.Course, error) {
	var course *entities.Course

	if err := repo.db.Where("id = ?", id).Preload("File").Preload("Quiz").First(&course).Error; err != nil {
		return nil, err
	}

	return course, nil
}

func (repo *CourseRepository) FindBySlug(slug string) (*entities.Course, error) {
	var course *entities.Course

	if err := repo.db.Where("slug = ?", slug).Preload("File").Preload("Quiz").First(&course).Error; err != nil {
		return nil, err
	}

	return course, nil
}

func (repo *CourseRepository) Create(course *entities.Course) error {
	course.ID = uuid.NewString()

	if err := repo.db.Create(course).Error; err != nil {
		return err
	}

	return repo.db.Preload("File").First(course, "id = ?", course.ID).Error
}

func (repo *CourseRepository) Update(course *entities.Course, id string) error {
	return repo.db.Model(&entities.Course{}).Where("id = ?", id).Updates(course).Error
}

func (repo *CourseRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.Course{}, "id = ?", id).Error
}
