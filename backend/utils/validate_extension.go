package utils

import "github.com/SamuelJacobsenB/projeto-the_sophium/back/types"

func ValidateExtension(ext types.Extension) bool {
	return ext == types.JPEG || ext == types.JPG || ext == types.PNG || ext == types.GIF || ext == types.SVG || ext == types.WEBP || ext == types.PDF || ext == types.DOC || ext == types.DOCX || ext == types.PPT || ext == types.PPTX || ext == types.TXT
}
