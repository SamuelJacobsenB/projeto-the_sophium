import { Button, I } from "../../";

import styles from "./styles.module.css";

interface ChangeOrderProps {
  onChangeOrder: (direction: "up" | "down") => Promise<void>;
}

export function ChangeOrder({ onChangeOrder }: ChangeOrderProps) {
  return (
    <div className={styles.changeOrder}>
      <Button
        className={styles.changeOrderButton}
        onClick={async () => await onChangeOrder("up")}
      >
        <I.arrow_up />
      </Button>
      <Button
        className={styles.changeOrderButton}
        onClick={async () => await onChangeOrder("down")}
      >
        <I.arrow_down />
      </Button>
    </div>
  );
}
