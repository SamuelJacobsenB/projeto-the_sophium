import { I } from "../../";

import styles from "./styles.module.css";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return <I.loader className={`${styles.loader} ${className}`} />;
}
