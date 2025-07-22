import { I, Button, ChangeOrder } from "../../../";
import type { Directon } from "../../../../types";

import styles from "./styles.module.css";

interface ModuleCardActionsProps {
  isOpen: boolean;
  toggleOpen: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeOrder?: (direction: Directon) => Promise<void>;
  adminActions?: boolean;
}

export function ModuleCardActions({
  isOpen,
  toggleOpen,
  onEdit,
  onDelete,
  onChangeOrder,
  adminActions,
}: ModuleCardActionsProps) {
  return (
    <div className={styles.moduleCardActions}>
      <Button className={styles.moduleCardViewMoreButton} onClick={toggleOpen}>
        {isOpen ? <I.arrow_down /> : <I.arrow_up />}
      </Button>

      {adminActions && (
        <>
          <button className="btn-rounded btn-info" onClick={onEdit}>
            <I.pencil />
          </button>
          <button className="btn-rounded btn-danger" onClick={onDelete}>
            <I.trash />
          </button>
          <ChangeOrder onChangeOrder={onChangeOrder!} />
        </>
      )}
    </div>
  );
}
