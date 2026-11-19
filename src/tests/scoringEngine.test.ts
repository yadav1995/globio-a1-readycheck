import { describe, it, expect } from 'vitest';
import { calculateAssessmentResult, calculateSkillScore, getDiagnosticBand } from '../services/scoringEngine';
import { QUESTION_BANK } from '../data/questionBank';

describe('Scoring Engine Unit Tests', () => {
  it('correctly calculates skill percentage with 4 questions', () => {
    expect(calculateSkillScore(4, 4)).toBe(100);
    expect(calculateSkillScore(3, 4)).toBe(75);
    expect(calculateSkillScore(2, 4)).toBe(50);
    expect(calculateSkillScore(1, 4)).toBe(25);
    expect(calculateSkillScore(0, 4)).toBe(0);
  });

  it('correctly categorizes diagnostic score bands', () => {
    expect(getDiagnosticBand(100).id).toBe('strong');
    expect(getDiagnosticBand(80).id).toBe('strong');
    expect(getDiagnosticBand(79).id).toBe('getting_close');
    expect(getDiagnosticBand(65).id).toBe('getting_close');
    expect(getDiagnosticBand(64).id).toBe('needs_practice');
    expect(getDiagnosticBand(0).id).toBe('needs_practice');
  });

  it('evaluates all answers correct (12/12) accurately', () => {
    const perfectAnswers: Record<string, string> = {};
    QUESTION_BANK.forEach((q) => {
      perfectAnswers[q.id] = q.correctOptionId;
    });

    const result = calculateAssessmentResult(perfectAnswers, QUESTION_BANK);

    expect(result.overallScore).toBe(100);
    expect(result.band.id).toBe('strong');
    expect(result.skillScores.vocabulary.scorePercent).toBe(100);
    expect(result.skillScores.grammar.scorePercent).toBe(100);
    expect(result.skillScores.reading.scorePercent).toBe(100);
    expect(result.hasCriticalGaps).toBe(false);
    expect(result.skillScores.vocabulary.needsCriticalFocus).toBe(false);
    expect(result.skillScores.grammar.needsCriticalFocus).toBe(false);
    expect(result.skillScores.reading.needsCriticalFocus).toBe(false);
  });

  it('evaluates all answers incorrect (0/12) and triggers safeguards', () => {
    const incorrectAnswers: Record<string, string> = {};
    QUESTION_BANK.forEach((q) => {
      // Pick an incorrect option
      const wrong = q.options.find((opt) => opt.id !== q.correctOptionId)!;
      incorrectAnswers[q.id] = wrong.id;
    });

    const result = calculateAssessmentResult(incorrectAnswers, QUESTION_BANK);

    expect(result.overallScore).toBe(0);
    expect(result.band.id).toBe('needs_practice');
    expect(result.skillScores.vocabulary.scorePercent).toBe(0);
    expect(result.skillScores.grammar.scorePercent).toBe(0);
    expect(result.skillScores.reading.scorePercent).toBe(0);
    expect(result.hasCriticalGaps).toBe(true);
    expect(result.skillScores.vocabulary.needsCriticalFocus).toBe(true);
    expect(result.skillScores.grammar.needsCriticalFocus).toBe(true);
    expect(result.skillScores.reading.needsCriticalFocus).toBe(true);
  });

  it('calculates mixed scores, averages, and isolates weak skills below 60%', () => {
    // Vocab: 4/4 correct (100%)
    // Grammar: 2/4 correct (50%) -> < 60% should trigger critical safeguard!
    // Reading: 3/4 correct (75%)
    // Overall: Math.round((100 + 50 + 75) / 3) = Math.round(75) = 75%
    const answers: Record<string, string> = {};

    // Vocab questions (all correct)
    QUESTION_BANK.filter((q) => q.skill === 'vocabulary').forEach((q) => {
      answers[q.id] = q.correctOptionId;
    });

    // Grammar questions (2 correct, 2 incorrect)
    const grammarQuestions = QUESTION_BANK.filter((q) => q.skill === 'grammar');
    answers[grammarQuestions[0].id] = grammarQuestions[0].correctOptionId;
    answers[grammarQuestions[1].id] = grammarQuestions[1].correctOptionId;
    answers[grammarQuestions[2].id] = grammarQuestions[2].options.find(
      (opt) => opt.id !== grammarQuestions[2].correctOptionId
    )!.id;
    answers[grammarQuestions[3].id] = grammarQuestions[3].options.find(
      (opt) => opt.id !== grammarQuestions[3].correctOptionId
    )!.id;

    // Reading questions (3 correct, 1 incorrect)
    const readingQuestions = QUESTION_BANK.filter((q) => q.skill === 'reading');
    answers[readingQuestions[0].id] = readingQuestions[0].correctOptionId;
    answers[readingQuestions[1].id] = readingQuestions[1].correctOptionId;
    answers[readingQuestions[2].id] = readingQuestions[2].correctOptionId;
    answers[readingQuestions[3].id] = readingQuestions[3].options.find(
      (opt) => opt.id !== readingQuestions[3].correctOptionId
    )!.id;

    const result = calculateAssessmentResult(answers, QUESTION_BANK);

    expect(result.skillScores.vocabulary.scorePercent).toBe(100);
    expect(result.skillScores.grammar.scorePercent).toBe(50);
    expect(result.skillScores.reading.scorePercent).toBe(75);
    expect(result.overallScore).toBe(75);
    expect(result.band.id).toBe('getting_close');

    // Grammar should trigger safeguard because 50% < 60%
    expect(result.skillScores.grammar.needsCriticalFocus).toBe(true);
    expect(result.skillScores.vocabulary.needsCriticalFocus).toBe(false);
    expect(result.skillScores.reading.needsCriticalFocus).toBe(false);
    expect(result.hasCriticalGaps).toBe(true);
  });

  it('correctly rounds overall scores to the nearest integer', () => {
    // Vocab: 3/4 = 75%
    // Grammar: 3/4 = 75%
    // Reading: 2/4 = 50%
    // Mean = (75 + 75 + 50) / 3 = 200 / 3 = 66.666... -> rounds to 67
    const answers: Record<string, string> = {};

    QUESTION_BANK.filter((q) => q.skill === 'vocabulary').forEach((q, i) => {
      answers[q.id] = i < 3 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });
    QUESTION_BANK.filter((q) => q.skill === 'grammar').forEach((q, i) => {
      answers[q.id] = i < 3 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });
    QUESTION_BANK.filter((q) => q.skill === 'reading').forEach((q, i) => {
      answers[q.id] = i < 2 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });

    const result = calculateAssessmentResult(answers, QUESTION_BANK);
    expect(result.overallScore).toBe(67);
  });
});
