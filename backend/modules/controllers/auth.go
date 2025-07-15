package controllers

import (
	"net/http"
	"os"

	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/dtos/request"
	"github.com/SamuelJacobsenB/projeto-the_sophium/back/modules/services"
	"github.com/gin-gonic/gin"
)

type AuthController struct {
	authService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{authService}
}

func (controller *AuthController) Login(ctx *gin.Context) {
	var loginDTO *request.LoginDTO
	if err := ctx.ShouldBindJSON(&loginDTO); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	token, err := controller.authService.Login(loginDTO)
	if err != nil {
		ctx.JSON(401, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("access_token", "Bearer "+token, 3600, "/", os.Getenv("HOST"), false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "login successful"})
}

func (controller *AuthController) VerifyUser(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "user verified successfully"})
}

func (controller *AuthController) VerifyAdmin(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "admin verified successfully"})
}
