import React, { useRef, useState } from "react";

import styles from "./styles.module.css";

interface FileInputProps {
  label?: string;
  required?: boolean;
  id?: string;
  onChange?: (file: File | null) => void;
}

export function FileInput({
  label,
  required,
  id = "file",
  onChange,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onChange?.(file);
    }
  };
  return (
    <div className={styles.inputFileContainer}>
      {label && (
        <label htmlFor={id} className={styles.inputFileLabel}>
          {label}
          {required && <span className={styles.inputFileRequired}>*</span>}
        </label>
      )}

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept=".jpeg,.jpg,.png,.gif,.svg,.webp,.pdf,.doc,.docx,.ppt,.pptx,.txt"
        onChange={handleFileChange}
        required={required}
        style={{ display: "none" }}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={styles.fileButton}
      >
        Escolher imagem
      </button>

      {preview && (
        <>
          {fileInputRef.current?.files?.[0]?.type.startsWith("image/") ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          ) : (
            <div className={styles.filePreview}>
              <p>
                Arquivo selecionado: {fileInputRef.current?.files?.[0]?.name}
              </p>
              <a href={preview} target="_blank" rel="noopener noreferrer">
                Abrir arquivo
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
