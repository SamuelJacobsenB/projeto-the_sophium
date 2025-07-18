import type { Course } from "../../../../types";
import { I } from "../../../icons";

import styles from "./styles.module.css";

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean;
  className?: string;
}

export function CourseCard({
  course,
  onClick,
  onEdit,
  onDelete,
  isAdmin = false,
  className,
}: CourseCardProps) {
  return (
    <div className={`${styles.courseCard} ${className}`}>
      <img
        src={course.file?.path}
        alt={course.file?.name}
        className={styles.courseCardImage}
      />
      <div className={styles.courseCardInfo}>
        <h2 className={styles.courseCardTitle}>{course.title}</h2>
        <p className={styles.courseCardDescription}>{course.description}</p>
      </div>
      <button
        className={`btn-rounded btn-info ${styles.courseCardViewMoreButton}`}
        onClick={onClick}
      >
        <I.more />
      </button>
      {isAdmin && (
        <div className={styles.courseCardAdminActions}>
          <button className="btn-rounded btn-info" onClick={onEdit}>
            <I.pencil />
          </button>
          <button className="btn-rounded btn-danger" onClick={onDelete}>
            <I.trash />
          </button>
        </div>
      )}
    </div>
  );
}
