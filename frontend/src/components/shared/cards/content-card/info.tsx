import styles from "./styles.module.css";

interface ContentCardInfoProps {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
}

export function ContentCardInfo({ children, onClick }: ContentCardInfoProps) {
  return (
    <div className={styles.contentCardInfo} onClick={onClick}>
      {children}
    </div>
  );
}
