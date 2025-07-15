export interface Correction {
  question_index: number;
  selected: number;
  correct_index: number;
}

export interface QuizResult {
  id: string;
  enrollment_id: string;
  quiz_id: string;
  attempts: number;
  corrections: Correction[];
  created_at: Date;
  updated_at: Date;
}
