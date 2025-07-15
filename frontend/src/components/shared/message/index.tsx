import { useMessage } from "../../../contexts";
import { I } from "../../";

import styles from "./styles.module.css";

export function Message() {
  const { message, type, clearMessage } = useMessage();

  if (!message || !type) {
    return null;
  }

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {type === "success" && <I.success className={styles.messageIcon} />}
      {type === "error" && <I.error className={styles.messageIcon} />}
      {type === "info" && <I.information className={styles.messageIcon} />}
      <p className={styles.messageText}>Mensagem</p>
      <button className={styles.messageClose} onClick={clearMessage}>
        <I.close />
      </button>
    </div>
  );
}
