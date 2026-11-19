import { Question, SkillType } from '../types/assessment';
import { AssessmentResult, DiagnosticBand, DiagnosticBandId, SkillScore, QuestionResultDetail } from '../types/scoring';
import { QUESTION_BANK } from '../data/questionBank';

export const DIAGNOSTIC_BANDS: Record<DiagnosticBandId, DiagnosticBand> = {
  strong: {
    id: 'strong',
    label: 'Strong Foundation',
    minScore: 80,
    maxScore: 100,
    badgeVariant: 'success',
    summary: 'You answered the majority of foundational questions correctly in this short diagnostic.',
    detailedMessage: 'Your performance indicates a solid grasp of core A1 vocabulary, grammar patterns, and reading comprehension. However, remember this check only covers receptive skills and grammar. Before booking your Goethe or ÖSD exam, complete full mock tests including listening, speaking, and writing under timed conditions.',
  },
  getting_close: {
    id: 'getting_close',
    label: 'Getting Close',
    minScore: 65,
    maxScore: 79,
    badgeVariant: 'warning',
    summary: 'You demonstrate good basic understanding, but specific skill gaps require targeted practice.',
    detailedMessage: 'You are on the right track, but several key foundational areas require focused revision before you commit to an exam fee. Review your weak topics below and practice with targeted exercises before scheduling an official examination.',
  },
  needs_practice: {
    id: 'needs_practice',
    label: 'Needs More Practice',
    minScore: 0,
    maxScore: 64,
    badgeVariant: 'alert',
    summary: 'Foundational gaps detected. Dedicated study is recommended before booking an exam.',
    detailedMessage: 'Significant knowledge gaps were identified in one or more core areas. Attempting an official A1 examination now would carry a high risk of lost exam fees and frustration. Focus on the prioritized study recommendations below and retake this diagnostic once you have reviewed the core topics.',
  },
};

export const SKILL_LABELS: Record<SkillType, string> = {
  vocabulary: 'Vocabulary (Wortschatz)',
  grammar: 'Grammar (Grammatik)',
  reading: 'Reading (Leseverstehen)',
};

/**
 * Calculates the score percentage for a skill (0, 25, 50, 75, or 100).
 */
export function calculateSkillScore(correctCount: number, totalCount: number = 4): number {
  if (totalCount <= 0) return 0;
  return Math.round((correctCount / totalCount) * 100);
}

/**
 * Determines diagnostic band based on overall score (0-100).
 */
export function getDiagnosticBand(score: number): DiagnosticBand {
  if (score >= 80) return DIAGNOSTIC_BANDS.strong;
  if (score >= 65) return DIAGNOSTIC_BANDS.getting_close;
  return DIAGNOSTIC_BANDS.needs_practice;
}

/**
 * Pure function to compute full assessment result.
 */
export function calculateAssessmentResult(
  answers: Record<string, string>,
  questions: Question[] = QUESTION_BANK,
  sessionId: string = 'session-default',
  startTime: number | null = null,
  completedTime: number | null = null
): AssessmentResult {
  const skills: SkillType[] = ['vocabulary', 'grammar', 'reading'];
  
  // Track counts per skill
  const skillStats: Record<SkillType, { correct: number; total: number }> = {
    vocabulary: { correct: 0, total: 0 },
    grammar: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  };

  const questionResults: QuestionResultDetail[] = questions.map((q) => {
    const selectedOptionId = answers[q.id] || null;
    const selectedOption = q.options.find((opt) => opt.id === selectedOptionId);
    const correctOption = q.options.find((opt) => opt.id === q.correctOptionId)!;
    const isCorrect = selectedOptionId === q.correctOptionId;

    skillStats[q.skill].total += 1;
    if (isCorrect) {
      skillStats[q.skill].correct += 1;
    }

    return {
      questionId: q.id,
      skill: q.skill,
      topic: q.topic,
      questionText: q.questionText,
      passage: q.passage,
      selectedOptionId,
      selectedOptionText: selectedOption ? selectedOption.text : null,
      correctOptionId: q.correctOptionId,
      correctOptionText: correctOption.text,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const skillScores: Record<SkillType, SkillScore> = {
    vocabulary: {
      skill: 'vocabulary',
      skillLabel: SKILL_LABELS.vocabulary,
      correctCount: skillStats.vocabulary.correct,
      totalCount: skillStats.vocabulary.total,
      scorePercent: calculateSkillScore(skillStats.vocabulary.correct, skillStats.vocabulary.total),
      needsCriticalFocus: calculateSkillScore(skillStats.vocabulary.correct, skillStats.vocabulary.total) < 60,
    },
    grammar: {
      skill: 'grammar',
      skillLabel: SKILL_LABELS.grammar,
      correctCount: skillStats.grammar.correct,
      totalCount: skillStats.grammar.total,
      scorePercent: calculateSkillScore(skillStats.grammar.correct, skillStats.grammar.total),
      needsCriticalFocus: calculateSkillScore(skillStats.grammar.correct, skillStats.grammar.total) < 60,
    },
    reading: {
      skill: 'reading',
      skillLabel: SKILL_LABELS.reading,
      correctCount: skillStats.reading.correct,
      totalCount: skillStats.reading.total,
      scorePercent: calculateSkillScore(skillStats.reading.correct, skillStats.reading.total),
      needsCriticalFocus: calculateSkillScore(skillStats.reading.correct, skillStats.reading.total) < 60,
    },
  };

  // Overall score: Arithmetic mean of 3 skills rounded to nearest integer
  const skillScoresList = skills.map((s) => skillScores[s].scorePercent);
  const rawOverall = skillScoresList.reduce((acc, curr) => acc + curr, 0) / skills.length;
  const overallScore = Math.round(rawOverall);

  const band = getDiagnosticBand(overallScore);
  const hasCriticalGaps = Object.values(skillScores).some((s) => s.needsCriticalFocus);

  const durationSeconds =
    startTime && completedTime
      ? Math.max(1, Math.round((completedTime - startTime) / 1000))
      : 300;

  return {
    sessionId,
    overallScore,
    band,
    skillScores,
    recommendations: [], // Populated by recommendation engine
    totalAnswered: Object.keys(answers).length,
    totalQuestions: questions.length,
    durationSeconds,
    questionResults,
    hasCriticalGaps,
  };
}
