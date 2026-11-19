import { SkillType } from './assessment';

export type DiagnosticBandId = 'strong' | 'getting_close' | 'needs_practice';

export interface DiagnosticBand {
  id: DiagnosticBandId;
  label: string;
  minScore: number;
  maxScore: number;
  badgeVariant: 'success' | 'warning' | 'alert';
  summary: string;
  detailedMessage: string;
}

export interface SkillScore {
  skill: SkillType;
  skillLabel: string;
  correctCount: number;
  totalCount: number;
  scorePercent: number; // 0, 25, 50, 75, or 100
  needsCriticalFocus: boolean; // true if score < 60%
}

export interface PracticeRecommendation {
  id: string;
  skill: SkillType;
  priority: number; // 1, 2, or 3
  topic: string;
  title: string;
  actionableAdvice: string;
  examples: string[];
}

export interface QuestionResultDetail {
  questionId: string;
  skill: SkillType;
  topic: string;
  questionText: string;
  passage?: string;
  selectedOptionId: string | null;
  selectedOptionText: string | null;
  correctOptionId: string;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface AssessmentResult {
  sessionId: string;
  overallScore: number; // Arithmetic mean of 3 skills, rounded to nearest integer
  band: DiagnosticBand;
  skillScores: Record<SkillType, SkillScore>;
  recommendations: PracticeRecommendation[];
  totalAnswered: number;
  totalQuestions: number;
  durationSeconds: number;
  questionResults: QuestionResultDetail[];
  hasCriticalGaps: boolean;
}
