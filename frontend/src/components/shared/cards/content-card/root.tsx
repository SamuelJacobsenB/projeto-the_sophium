import styles from "./styles.module.css";

interface ContentCardRootProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ContentCardRoot({
  children,
  onClick,
  className = "",
}: ContentCardRootProps) {
  return (
    <div className={`${styles.contentCard} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
