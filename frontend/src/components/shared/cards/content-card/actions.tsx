import { I, ChangeOrder } from "../../../";
import type { Directon } from "../../../../types";

import styles from "./styles.module.css";

interface ContentCardActionsProps {
  adminActions?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onChangeOrder: (direction: Directon) => Promise<void>;
}

export function ContentCardActions({
  adminActions,
  onEdit,
  onDelete,
  onChangeOrder,
}: ContentCardActionsProps) {
  if (!adminActions) return null;

  return (
    <div className={styles.contentCardAdminActions}>
      <button className="btn-rounded btn-info" onClick={onEdit}>
        <I.pencil />
      </button>
      <button className="btn-rounded btn-danger" onClick={onDelete}>
        <I.trash />
      </button>
      <ChangeOrder onChangeOrder={onChangeOrder} />
    </div>
  );
}
