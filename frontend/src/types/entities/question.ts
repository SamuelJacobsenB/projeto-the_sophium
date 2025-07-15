export type QuestionType = "true_false" | "multiple_choice";

export interface Question {
  id: string;
  quiz_id: string;
  statement: string;
  type: QuestionType;
  file_id: string | null;
  file: File | null;
  options: string[];
  correct_index: number | null;
  created_at: Date;
  updated_at: Date;
}
