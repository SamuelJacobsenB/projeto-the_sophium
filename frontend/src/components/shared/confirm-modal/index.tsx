import { useState } from "react";
import { Button, Input, Modal } from "..";

import styles from "./styles.module.css";

interface ConfirmModalProps {
  fn: () => Promise<void> | void;
  actionName: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function ConfirmModal({
  fn,
  actionName,
  isOpen,
  onClose,
  className,
}: ConfirmModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  async function handleConfirm() {
    if (inputValue !== "CONFIRMAR") {
      setError("Digite CONFIRMAR para confirmar a ação.");
      return;
    }

    await fn();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <h1>{actionName}</h1>
      <hr />
      <p>
        Tem certeza que deseja realizar essa ação? A ação não pode ser desfeita.
        Digite <strong>CONFIRMAR</strong> e precione o botão confirmar para que
        a ação seja realizada.
      </p>
      <Input
        label="Confirmar"
        placeholder="Digite CONFIRMAR"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {error && <p className={styles.confirmModalError}>*{error}</p>}
      <div className={styles.confirmModalButtons}>
        <button className="btn btn-danger" onClick={onClose}>
          Cancelar
        </button>
        <Button className="btn btn-success" onClick={handleConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}
