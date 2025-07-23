import { FileCardIcon } from "../../";
import type { File } from "../../../../types";

import styles from "./styles.module.css";

interface FileCardProps {
  file: File;
  onClick?: () => void;
}

export function FileCard({ file }: FileCardProps) {
  return (
    <div
      className={styles.fileCard}
      onClick={() => window.open(file.path, "_black")}
    >
      <FileCardIcon extension={file.extension} />
      <h3 className={styles.fileCardName}>{file.name}</h3>
    </div>
  );
}
