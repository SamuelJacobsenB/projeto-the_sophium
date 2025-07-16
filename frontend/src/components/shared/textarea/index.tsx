import React from "react";

import styles from "./styles.module.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
}

export function Textarea({ label, required, ...props }: TextareaProps) {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={props.id} className={styles.inputLabel}>
          {label}
          {required && <span className={styles.inputRequired}>*</span>}
        </label>
      )}
      <textarea className={styles.textarea} required={required} {...props} />
    </div>
  );
}
