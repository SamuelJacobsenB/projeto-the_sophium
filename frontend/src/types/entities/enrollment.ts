import type { Progress, QuizResult } from "../";

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: Progress[];
  quizes: QuizResult[];
  created_at: Date;
  updated_at: Date;
}
