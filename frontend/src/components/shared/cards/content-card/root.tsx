import styles from "./styles.module.css";

interface ContentCardRootProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentCardRoot({
  children,
  className = "",
}: ContentCardRootProps) {
  return <div className={`${styles.contentCard} ${className}`}>{children}</div>;
}
