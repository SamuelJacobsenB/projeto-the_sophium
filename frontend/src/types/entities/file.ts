import type { Extension } from "../";

export interface File {
  id: string;
  name: string;
  path: string;
  extension: Extension;
  size: number;
  created_at: Date;
  updated_at: Date;
}
