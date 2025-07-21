import React from "react";
import styles from "./styles.module.css";

interface CourseCardRootProps {
  className?: string;
  children: React.ReactNode;
}

export function CourseCardRoot({
  className = "",
  children,
}: CourseCardRootProps) {
  return <div className={`${styles.courseCard} ${className}`}>{children}</div>;
}
