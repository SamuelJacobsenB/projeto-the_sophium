package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/bootstrap"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/db"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes() *gin.Engine {
	router := gin.Default()

	router.Static("/uploads", "./uploads")

	api := router.Group("/api")

	v1 := api.Group("/v1")

	controllers := bootstrap.InitializeControllers(db.DB)

	fileRouter := v1.Group("/file")
	RegisterFileRoutes(fileRouter, controllers.FileController)

	userRouter := v1.Group("/user")
	RegisterUserRoutes(userRouter, controllers.UserController)

	enrollmentRouter := v1.Group("/enrollment")
	RegisterEnrollmentRoutes(enrollmentRouter, controllers.EnrollmentController)

	progressRouter := v1.Group("/progress")
	RegisterProgressRoutes(progressRouter, controllers.ProgressController)

	quizResultRouter := v1.Group("/quiz_result")
	RegisterQuizResultRoutes(quizResultRouter, controllers.QuizResultController)

	courseRouter := v1.Group("/course")
	RegisterCourseRoutes(courseRouter, controllers.CourseController)

	moduleRouter := v1.Group("/module")
	RegisterModuleRoutes(moduleRouter, controllers.ModuleController)

	contentRouter := v1.Group("/content")
	RegisterContentRoutes(contentRouter, controllers.ContentController)

	quizRouter := v1.Group("/quiz")
	RegisterQuizRoutes(quizRouter, controllers.QuizController)

	questionRouter := v1.Group("/question")
	RegisterQuestionRoutes(questionRouter, controllers.QuestionController)

	return router
}
