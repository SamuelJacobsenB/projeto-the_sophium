import { I } from "../../";

import styles from "./styles.module.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function Modal({ children, isOpen, onClose, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={`${styles.modal} ${className}`}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          <I.close />
        </button>
        {children}
      </div>
    </div>
  );
}
