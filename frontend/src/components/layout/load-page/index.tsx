import { I } from "../../icons";

import styles from "./styles.module.css";

export function LoadPage() {
  return (
    <div className={styles.loaderContainer}>
      <I.loader className={styles.loader} />
    </div>
  );
}
