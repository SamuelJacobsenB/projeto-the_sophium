package bootstrap

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/controllers"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/repositories"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/services"
	"gorm.io/gorm"
)

type AppControllers struct {
	FileController       *controllers.FileController
	AuthController       *controllers.AuthController
	UserController       *controllers.UserController
	EnrollmentController *controllers.EnrollmentController
	ProgressController   *controllers.ProgressController
	QuizResultController *controllers.QuizResultController
	CourseController     *controllers.CourseController
	ModuleController     *controllers.ModuleController
	ContentController    *controllers.ContentController
	QuizController       *controllers.QuizController
	QuestionController   *controllers.QuestionController
}

func InitializeControllers(db *gorm.DB) *AppControllers {
	fileRepository := repositories.NewFileRepository(db)
	userRepository := repositories.NewUserRepository(db)
	enrollmentRepository := repositories.NewEnrollmentRepository(db)
	progressRepository := repositories.NewProgressRepository(db)
	quizResultRepository := repositories.NewQuizResultRepository(db)
	courseRepository := repositories.NewCourseRepository(db)
	moduleRepository := repositories.NewModuleRepository(db)
	contentRepository := repositories.NewContentRepository(db)
	quizRepository := repositories.NewQuizRepository(db)
	questionRepository := repositories.NewQuestionRepository(db)

	fileService := services.NewFileService(fileRepository)
	authService := services.NewAuthService(userRepository)
	userService := services.NewUserService(userRepository)
	enrollmentService := services.NewEnrollmentService(enrollmentRepository, userRepository, courseRepository)
	progressService := services.NewProgressService(progressRepository, enrollmentRepository, contentRepository)
	quizResultService := services.NewQuizResultService(quizResultRepository, quizRepository, enrollmentRepository)
	courseService := services.NewCourseService(courseRepository)
	moduleService := services.NewModuleService(moduleRepository, courseRepository)
	contentService := services.NewContentService(contentRepository, moduleRepository)
	quizService := services.NewQuizService(quizRepository)
	questionService := services.NewQuestionService(questionRepository, quizRepository)

	fileController := controllers.NewFileController(fileService)
	authController := controllers.NewAuthController(authService)
	userController := controllers.NewUserController(userService, fileService)
	enrollmentController := controllers.NewEnrollmentController(enrollmentService)
	progressController := controllers.NewProgressController(progressService, enrollmentService)
	quizResultController := controllers.NewQuizResultController(quizResultService, enrollmentService)
	courseController := controllers.NewCourseController(courseService)
	moduleController := controllers.NewModuleController(moduleService)
	contentController := controllers.NewContentController(contentService)
	quizController := controllers.NewQuizController(quizService)
	questionController := controllers.NewQuestionController(questionService)

	return &AppControllers{
		FileController:       fileController,
		AuthController:       authController,
		UserController:       userController,
		EnrollmentController: enrollmentController,
		ProgressController:   progressController,
		QuizResultController: quizResultController,
		CourseController:     courseController,
		ModuleController:     moduleController,
		ContentController:    contentController,
		QuizController:       quizController,
		QuestionController:   questionController,
	}
}
