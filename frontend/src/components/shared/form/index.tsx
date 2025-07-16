import { useState } from "react";

import { Loader } from "../";

import styles from "./styles.module.css";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  submitText: string;
  errors: string[];
  onSubmit: () => Promise<void> | void;
}

export function Form({
  children,
  submitText,
  className,
  errors,
  onSubmit,
  ...props
}: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await onSubmit();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className}`}
      {...props}
    >
      {children}
      <button className="btn btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : submitText}
      </button>
      <div className={styles.formErrors}>
        {errors.length > 0 &&
          errors.map((error) => <p className={styles.formError}>*{error}</p>)}
      </div>
    </form>
  );
}
