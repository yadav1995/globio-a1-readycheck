export type SkillType = 'vocabulary' | 'grammar' | 'reading';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  skill: SkillType;
  topic: string;
  difficulty: 'A1.1' | 'A1.2';
  questionType: 'multiple-choice';
  questionText: string;
  passage?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export type AssessmentStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';

export interface AssessmentState {
  status: AssessmentStatus;
  sessionId: string;
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  startTime: number | null;
  completedTime: number | null;
}

export type AssessmentAction =
  | { type: 'START_ASSESSMENT' }
  | { type: 'SELECT_ANSWER'; payload: { questionId: string; optionId: string } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'GO_TO_QUESTION'; payload: { index: number } }
  | { type: 'OPEN_REVIEW' }
  | { type: 'RETURN_TO_QUESTION'; payload: { index: number } }
  | { type: 'SUBMIT_ASSESSMENT' }
  | { type: 'RETAKE_ASSESSMENT' };
