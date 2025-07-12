package repositories

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/backend/modules/entities"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type FileRepository struct {
	db *gorm.DB
}

func NewFileRepository(db *gorm.DB) *FileRepository {
	return &FileRepository{db: db}
}

func (repo *FileRepository) FindByID(id string) (*entities.File, error) {
	var file entities.File

	if err := repo.db.Where("id = ?", id).First(&file).Error; err != nil {
		return nil, err
	}

	return &file, nil
}

func (repo *FileRepository) Create(file *entities.File) error {
	file.ID = uuid.NewString()

	return repo.db.Create(file).Error
}

func (repo *FileRepository) Update(file *entities.File) error {
	return repo.db.Save(file).Error
}

func (repo *FileRepository) DeleteByID(id string) error {
	return repo.db.Delete(&entities.File{}, "id = ?", id).Error
}
