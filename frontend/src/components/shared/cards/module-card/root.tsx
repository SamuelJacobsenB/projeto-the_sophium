import styles from "./styles.module.css";

interface ModuleCardRootProps {
  children: React.ReactNode;
}

export function ModuleCardRoot({ children }: ModuleCardRootProps) {
  return <div className={styles.moduleCardContainer}>{children}</div>;
}
