package router

import (
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/bootstrap"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/db"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/middlewares"
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

	authRouter := v1.Group("/auth")
	RegisterAuthRoutes(authRouter, controllers.AuthController)

	userRouter := v1.Group("/user")
	RegisterUserRoutes(userRouter, controllers.UserController)

	enrollmentRouter := v1.Group("/enrollment")
	enrollmentRouter.Use(middlewares.AuthMiddleware(nil))
	RegisterEnrollmentRoutes(enrollmentRouter, controllers.EnrollmentController)

	progressRouter := v1.Group("/progress")
	progressRouter.Use(middlewares.AuthMiddleware(nil))
	RegisterProgressRoutes(progressRouter, controllers.ProgressController)

	quizResultRouter := v1.Group("/quiz_result")
	quizResultRouter.Use(middlewares.AuthMiddleware(nil))
	RegisterQuizResultRoutes(quizResultRouter, controllers.QuizResultController)

	courseRouter := v1.Group("/course")
	RegisterCourseRoutes(courseRouter, controllers.CourseController)

	moduleRouter := v1.Group("/module")
	RegisterModuleRoutes(moduleRouter, controllers.ModuleController)

	contentRouter := v1.Group("/content")
	contentRouter.Use(middlewares.AuthMiddleware(nil))
	RegisterContentRoutes(contentRouter, controllers.ContentController)

	quizRouter := v1.Group("/quiz")
	quizRouter.Use(middlewares.AuthMiddleware(nil))
	RegisterQuizRoutes(quizRouter, controllers.QuizController)

	questionRouter := v1.Group("/question")
	questionRouter.Use(middlewares.AuthMiddleware(nil))
	RegisterQuestionRoutes(questionRouter, controllers.QuestionController)

	return router
}
