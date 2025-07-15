import { I } from "../../";

import styles from "./styles.module.css";

interface TitleProps {
  title: string;
  size: string;
}

export function Title({ title, size }: TitleProps) {
  return (
    <section className={styles.titleSection}>
      <div className={styles.titleCircle}>
        <I.graduation_hat
          className={styles.titleIcon}
          style={{ fontSize: size }}
        />
      </div>
      <h1 className={styles.titleText} style={{ fontSize: size }}>
        {title}
      </h1>
    </section>
  );
}
