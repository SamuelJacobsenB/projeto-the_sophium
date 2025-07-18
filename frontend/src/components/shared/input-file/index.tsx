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
      setPreview(URL.createObjectURL(file));
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
        accept="image/*"
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
        <img src={preview} alt="Preview" className={styles.previewImage} />
      )}
    </div>
  );
}
