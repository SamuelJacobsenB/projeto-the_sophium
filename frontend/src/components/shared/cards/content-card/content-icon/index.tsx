import type React from "react";

import { I } from "../../../../";
import type { Extension } from "../../../../../types";

import styles from "./styles.module.css";

interface ContentCardIconProps {
  extension: Extension;
}

export function ContentCardIcon({ extension }: ContentCardIconProps) {
  const Icon: React.ComponentType<{ className?: string }> = I[extension];

  if (!Icon) return null;

  return <Icon className={styles[extension] || ""} />;
}
