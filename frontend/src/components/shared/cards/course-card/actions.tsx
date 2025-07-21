import { I } from "../../../icons";
import styles from "./styles.module.css";

interface CourseCardActionsProps {
  onClick: () => void;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CourseCardActions({
  onClick,
  isAdmin = false,
  onEdit,
  onDelete,
}: CourseCardActionsProps) {
  return (
    <>
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
    </>
  );
}
