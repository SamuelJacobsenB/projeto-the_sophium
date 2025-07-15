import type { QuestionType } from "../";

export interface QuestionDTO {
  quiz_id: string;
  statement: string;
  type: QuestionType;
  file_id: string | null;
  options: string[];
  correct_index: number;
}
