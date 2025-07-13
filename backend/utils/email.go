package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendEmail(toEmail, subject, body string) error {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	fromEmail := os.Getenv("EMAIL")
	password := os.Getenv("APP_PASSWORD")

	message := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s", fromEmail, toEmail, subject, body)

	auth := smtp.PlainAuth("", fromEmail, password, smtpHost)

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, fromEmail, []string{toEmail}, []byte(message))
}

func GenerateWelcomeText(name, token string) string {
	return fmt.Sprintf("Olá %s, seja bem-vindo(a) à nossa plataforma! seu token de verificação é %s", name, token)
}

func GenerateResetPasswordText(name, token string) string {
	return fmt.Sprintf("Olá %s, seu token de redefinição de senha é %s", name, token)
}
