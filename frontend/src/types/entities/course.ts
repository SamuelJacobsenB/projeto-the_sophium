import type { Module, Quiz, File } from "..";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  file_id: string | null;
  file: File | null;
  modules: Module[];
  quiz_id: string | null;
  quiz: Quiz | null;
  created_at: Date;
  updated_at: Date;
}
