import styles from "./styles.module.css";

interface ModuleCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function ModuleCardHeader({
  children,
  className = "",
}: ModuleCardHeaderProps) {
  return (
    <div className={`${styles.moduleCardHeader} ${className}`}>{children}</div>
  );
}
