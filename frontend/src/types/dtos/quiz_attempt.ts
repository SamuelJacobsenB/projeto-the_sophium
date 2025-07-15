export interface AnswerInput {
  question_index: number;
  selected: number;
}

export interface QuizAttemptDTO {
  enrollment_id: string;
  quiz_id: string;
  answers: AnswerInput[];
}
