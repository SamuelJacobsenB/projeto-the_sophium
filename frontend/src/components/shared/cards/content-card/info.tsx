import styles from "./styles.module.css";

interface ContentCardInfoProps {
  title: string;
}

export function ContentCardInfo({ title }: ContentCardInfoProps) {
  return <h3 className={styles.contentCardTitle}>{title}</h3>;
}
