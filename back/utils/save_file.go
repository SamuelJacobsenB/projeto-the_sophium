package utils

import (
	"io"
	"mime/multipart"
	"os"
)

func SaveFile(formFile *multipart.FileHeader, dst string) error {
	src, err := formFile.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, src)
	return err
}
