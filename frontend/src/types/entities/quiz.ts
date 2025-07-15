import type { Question } from "../";

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  owner_id: string;
  created_At: Date;
  updated_at: Date;

  questions: Question[];
}
