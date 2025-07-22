import styles from "./styles.module.css";

interface ContentCardInfoProps {
  children: React.ReactNode;
}

export function ContentCardInfo({ children }: ContentCardInfoProps) {
  return <div className={styles.contentCardInfo}>{children}</div>;
}
