import { Button, I } from "../../../";

import styles from "./styles.module.css";

interface ContentCardCheckProps {
  checked: boolean;
  onClick: () => Promise<void>;
}

export function ContentCardCheck({ checked, onClick }: ContentCardCheckProps) {
  return (
    <Button onClick={onClick} className={styles.contentCardCheckButton}>
      {checked ? <I.check /> : <I.uncheck />}
    </Button>
  );
}
