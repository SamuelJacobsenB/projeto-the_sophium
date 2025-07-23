import { I, FileCardIcon } from "../../../";
import type { Content } from "../../../../types";

import styles from "./styles.module.css";

export function ContentCardIconArea({ content }: { content: Content }) {
  return (
    <div className={styles.contentCardIconArea}>
      {content.video_url && <I.youtube className={styles.youtubeIcon} />}
      {!content.video_url && content.file && (
        <FileCardIcon extension={content.file.extension} />
      )}
      {!content.video_url && !content.file && (
        <I.content className={styles.contentIcon} />
      )}
    </div>
  );
}
