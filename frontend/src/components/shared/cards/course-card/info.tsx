import styles from "./styles.module.css";

interface CourseCardInfoProps {
  title: string;
  description: string;
}

export function CourseCardInfo({ title, description }: CourseCardInfoProps) {
  return (
    <div className={styles.courseCardInfo}>
      <h2 className={styles.courseCardTitle}>{title}</h2>
      <p className={styles.courseCardDescription}>{description}</p>
    </div>
  );
}
