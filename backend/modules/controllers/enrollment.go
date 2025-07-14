package controllers

import (
	"net/http"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/request"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/services"
	"github.com/gin-gonic/gin"
)

type EnrollmentController struct {
	service *services.EnrollmentService
}

func NewEnrollmentController(service *services.EnrollmentService) *EnrollmentController {
	return &EnrollmentController{service}
}

func (controller *EnrollmentController) FindByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	userId := ctx.GetString("user_id")
	if userId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}

	enrollment, err := controller.service.FindByID(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if enrollment.UserID != userId {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	ctx.JSON(http.StatusOK, enrollment.ToResponseDTO())
}

func (controller *EnrollmentController) Create(ctx *gin.Context) {
	var dto *request.EnrollmentDto
	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := dto.Validate(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := ctx.GetString("user_id")
	if userId == "" || userId != dto.UserID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}

	enrollment := dto.ToEntity()
	if err := controller.service.Create(enrollment); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, enrollment.ToResponseDTO())
}

func (controller *EnrollmentController) Update(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	var dto *request.EnrollmentDto
	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := dto.Validate(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := ctx.GetString("user_id")
	if userID == "" || userID != dto.UserID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}

	enrollment := dto.ToEntity()
	if err := controller.service.Update(enrollment, id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, enrollment.ToResponseDTO())
}

func (controller *EnrollmentController) DeleteByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	userID := ctx.GetString("user_id")
	if userID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}

	enrollment, err := controller.service.FindByID(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if enrollment.UserID != userID {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	if err := controller.service.DeleteByID(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "enrollment deleted successfully"})
}
