import type { Module } from "../../../../types";

import styles from "./styles.module.css";

export function ModuleCardInfo({ module }: { module: Module }) {
  return (
    <div className={styles.moduleCardInfo}>
      <h2 className={styles.moduleCardTitle}>{module.title}</h2>
      <p className={styles.moduleCardSlug}>{module.slug}</p>
    </div>
  );
}
