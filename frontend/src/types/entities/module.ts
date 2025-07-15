import type { Content, Quiz } from "..";

export interface Module {
  id: string;
  title: string;
  slug: string;
  course_id: string;
  order: number;
  contents: Content[];
  quiz_id: string | null;
  quiz: Quiz | null;
  created_at: Date;
  updated_at: Date;
}
