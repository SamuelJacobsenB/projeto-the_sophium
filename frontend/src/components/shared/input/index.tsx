import React from "react";

import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

export function Input({ label, required, ...props }: InputProps) {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={props.id} className={styles.inputLabel}>
          {label}
          {required && <span className={styles.inputRequired}>*</span>}
        </label>
      )}
      <input className={styles.input} required={required} {...props} />
    </div>
  );
}
