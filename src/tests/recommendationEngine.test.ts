import { describe, it, expect } from 'vitest';
import { generateRecommendations } from '../services/recommendationEngine';
import { calculateAssessmentResult } from '../services/scoringEngine';
import { QUESTION_BANK } from '../data/questionBank';

describe('Recommendation Engine Unit Tests', () => {
  it('prioritizes Grammar over Vocabulary and Reading when scores are tied', () => {
    // Let's create a scenario where all 3 skills score 50% (2/4 each).
    // Tie-break precedence order is: Grammar -> Vocabulary -> Reading.
    const answers: Record<string, string> = {};

    QUESTION_BANK.filter((q) => q.skill === 'grammar').forEach((q, i) => {
      answers[q.id] = i < 2 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });
    QUESTION_BANK.filter((q) => q.skill === 'vocabulary').forEach((q, i) => {
      answers[q.id] = i < 2 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });
    QUESTION_BANK.filter((q) => q.skill === 'reading').forEach((q, i) => {
      answers[q.id] = i < 2 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });

    const result = calculateAssessmentResult(answers, QUESTION_BANK);
    const recs = generateRecommendations(result);

    expect(recs.length).toBeLessThanOrEqual(3);
    expect(recs.length).toBeGreaterThanOrEqual(1);

    // The first recommendation should be Grammar because Grammar has highest tie-break priority
    expect(recs[0].skill).toBe('grammar');
  });

  it('prioritizes Vocabulary over Reading when both have equal scores and are lower than Grammar', () => {
    // Grammar: 4/4 (100%)
    // Vocabulary: 2/4 (50%)
    // Reading: 2/4 (50%)
    // Tie-break between Vocab and Reading should pick Vocab first
    const answers: Record<string, string> = {};

    QUESTION_BANK.filter((q) => q.skill === 'grammar').forEach((q) => {
      answers[q.id] = q.correctOptionId;
    });
    QUESTION_BANK.filter((q) => q.skill === 'vocabulary').forEach((q, i) => {
      answers[q.id] = i < 2 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });
    QUESTION_BANK.filter((q) => q.skill === 'reading').forEach((q, i) => {
      answers[q.id] = i < 2 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });

    const result = calculateAssessmentResult(answers, QUESTION_BANK);
    const recs = generateRecommendations(result);

    expect(recs[0].skill).toBe('vocabulary');
  });

  it('generates concrete advice and examples for missed questions', () => {
    // Missing specifically the Accusative case question
    const answers: Record<string, string> = {};
    QUESTION_BANK.forEach((q) => {
      answers[q.id] = q.correctOptionId;
    });

    // Make grammar-3 (Accusative) incorrect
    const accQ = QUESTION_BANK.find((q) => q.id === 'grammar-3')!;
    const wrongOpt = accQ.options.find((o) => o.id !== accQ.correctOptionId)!;
    answers[accQ.id] = wrongOpt.id;

    const result = calculateAssessmentResult(answers, QUESTION_BANK);
    const recs = generateRecommendations(result);

    const accusativeRec = recs.find((r) => r.topic.includes('Accusative'));
    expect(accusativeRec).toBeDefined();
    expect(accusativeRec?.actionableAdvice).toContain('accusative');
    expect(accusativeRec?.examples.length).toBeGreaterThan(0);
  });

  it('limits recommendations to at most three items', () => {
    // All answers wrong
    const answers: Record<string, string> = {};
    QUESTION_BANK.forEach((q) => {
      answers[q.id] = q.options.find((o) => o.id !== q.correctOptionId)!.id;
    });

    const result = calculateAssessmentResult(answers, QUESTION_BANK);
    const recs = generateRecommendations(result);

    expect(recs.length).toBe(3);
    expect(recs[0].priority).toBe(1);
    expect(recs[1].priority).toBe(2);
    expect(recs[2].priority).toBe(3);
  });
});
