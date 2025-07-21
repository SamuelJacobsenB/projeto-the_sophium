import { I, ChangeOrder } from "../../../";
import { ContentCardIcon } from "./icon";
import type { Content, Directon } from "../../../../types";

import styles from "./styles.module.css";

interface ContentCardProps {
  content: Content;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onChangeOrder: (direction: Directon) => Promise<void>;
  isAdmin: boolean;
  className?: string;
}

export function ContentCard({
  content,
  onClick,
  onEdit,
  onDelete,
  onChangeOrder,
  isAdmin,
  className = "",
}: ContentCardProps) {
  return (
    <div className={`${styles.contentCard} ${className}`} onClick={onClick}>
      <div className={styles.contentCardIconArea}>
        {content.video_url && <I.youtube className={styles.youtubeIcon} />}
        {!content.video_url && content.file && (
          <ContentCardIcon extension={content.file.extension} />
        )}
        {!content.video_url && !content.file && (
          <I.content className={styles.contentIcon} />
        )}
      </div>

      <h3 className={styles.contentCardTitle}>{content.title}</h3>

      {isAdmin && (
        <div className={styles.contentCardAdminActions}>
          <button className="btn-rounded btn-info" onClick={onEdit}>
            <I.pencil />
          </button>
          <button className="btn-rounded btn-danger" onClick={onDelete}>
            <I.trash />
          </button>
          <ChangeOrder onChangeOrder={onChangeOrder} />
        </div>
      )}
    </div>
  );
}
