package controllers

import (
	"net/http"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/request"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/services"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	service *services.UserService
}

func NewUserController(service *services.UserService) *UserController {
	return &UserController{service}
}

func (controller *UserController) FindByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	user, err := controller.service.FindByID(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user.ToResponseDTO())
}

func (controller *UserController) Create(ctx *gin.Context) {
	var dto *request.UserDto
	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := dto.Validate(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := dto.ToEntity()
	if err := controller.service.Create(user); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user.ToResponseDTO())
}

func (controller *UserController) RequestPasswordChange(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	if err := controller.service.RequestPasswordChange(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "password change request sent successfully"})
}

func (controller *UserController) Update(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	var dto *request.UserDto
	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := dto.Validate(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := dto.ToEntity()
	if err := controller.service.Update(user, id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user.ToResponseDTO())
}

func (controller *UserController) VerifyToken(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	token := ctx.Query("token")
	if token == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "token is required"})
		return
	}

	if err := controller.service.VerifyToken(id, token); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "token verified successfully"})
}

func (controller *UserController) ChangePassword(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	token := ctx.Query("token")
	if token == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "token is required"})
		return
	}

	var dto *request.ChangePasswordDto
	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := dto.Validate(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := controller.service.ConfirmPasswordChange(id, token, dto.NewPassword); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "password changed successfully"})
}

func (controller *UserController) DeleteByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	if err := controller.service.DeleteByID(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "user deleted successfully"})
}
