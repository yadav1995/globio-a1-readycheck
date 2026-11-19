import { describe, it, expect } from 'vitest';
import { calculateAssessmentResult, getDiagnosticBand, calculateSkillScore } from '../services/scoringEngine';
import { generateRecommendations } from '../services/recommendationEngine';
import { QUESTION_BANK } from '../data/questionBank';

describe('Edge Cases & Boundary Tests', () => {
  describe('Mathematical score distribution for 12 questions', () => {
    it('verifies all 13 discrete possible overall scores map to valid bands', () => {
      // Possible skill sums: 0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300
      const possibleSums = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300];
      const expectedOverall = possibleSums.map((s) => Math.round(s / 3));

      expect(expectedOverall).toEqual([
        0, 8, 17, 25, 33, 42, 50, 58, 67, 75, 83, 92, 100,
      ]);

      expectedOverall.forEach((score) => {
        const band = getDiagnosticBand(score);
        expect(['strong', 'getting_close', 'needs_practice']).toContain(band.id);
        if (score >= 80) {
          expect(band.id).toBe('strong');
        } else if (score >= 65) {
          expect(band.id).toBe('getting_close');
        } else {
          expect(band.id).toBe('needs_practice');
        }
      });
    });

    it('handles calculateSkillScore edge cases with 0 total questions or negative', () => {
      expect(calculateSkillScore(0, 0)).toBe(0);
      expect(calculateSkillScore(2, -1)).toBe(0);
      expect(calculateSkillScore(4, 4)).toBe(100);
    });
  });

  describe('Skill safeguard edge cases (< 60%)', () => {
    it('triggers safeguard on 50% score but NOT on 75% score', () => {
      // 2/4 = 50% -> triggers safeguard (< 60%)
      // 3/4 = 75% -> does NOT trigger safeguard (>= 60%)
      const answers50: Record<string, string> = {};
      QUESTION_BANK.forEach((q) => {
        answers50[q.id] = q.correctOptionId;
      });

      // Break 2 reading questions
      const readingQs = QUESTION_BANK.filter((q) => q.skill === 'reading');
      answers50[readingQs[0].id] = readingQs[0].options.find((o) => o.id !== readingQs[0].correctOptionId)!.id;
      answers50[readingQs[1].id] = readingQs[1].options.find((o) => o.id !== readingQs[1].correctOptionId)!.id;

      const result50 = calculateAssessmentResult(answers50, QUESTION_BANK);
      expect(result50.skillScores.reading.scorePercent).toBe(50);
      expect(result50.skillScores.reading.needsCriticalFocus).toBe(true);
      expect(result50.hasCriticalGaps).toBe(true);

      // Now break only 1 reading question (3/4 = 75%)
      const answers75: Record<string, string> = {};
      QUESTION_BANK.forEach((q) => {
        answers75[q.id] = q.correctOptionId;
      });
      answers75[readingQs[0].id] = readingQs[0].options.find((o) => o.id !== readingQs[0].correctOptionId)!.id;

      const result75 = calculateAssessmentResult(answers75, QUESTION_BANK);
      expect(result75.skillScores.reading.scorePercent).toBe(75);
      expect(result75.skillScores.reading.needsCriticalFocus).toBe(false);
      expect(result75.hasCriticalGaps).toBe(false);
    });

    it('high overall score (83) still flags critical gap if one skill is 50%', () => {
      // Vocab: 4/4 (100%), Grammar: 4/4 (100%), Reading: 2/4 (50%)
      // Overall = round((100 + 100 + 50) / 3) = round(250 / 3) = 83 -> "Strong foundation"
      // But Reading is 50% < 60% -> must trigger safeguard!
      const answers: Record<string, string> = {};
      QUESTION_BANK.filter((q) => q.skill !== 'reading').forEach((q) => {
        answers[q.id] = q.correctOptionId;
      });

      const readingQs = QUESTION_BANK.filter((q) => q.skill === 'reading');
      answers[readingQs[0].id] = readingQs[0].correctOptionId;
      answers[readingQs[1].id] = readingQs[1].correctOptionId;
      answers[readingQs[2].id] = readingQs[2].options.find((o) => o.id !== readingQs[2].correctOptionId)!.id;
      answers[readingQs[3].id] = readingQs[3].options.find((o) => o.id !== readingQs[3].correctOptionId)!.id;

      const result = calculateAssessmentResult(answers, QUESTION_BANK);
      expect(result.overallScore).toBe(83);
      expect(result.band.id).toBe('strong');
      expect(result.hasCriticalGaps).toBe(true);
      expect(result.skillScores.reading.needsCriticalFocus).toBe(true);
      expect(result.skillScores.vocabulary.needsCriticalFocus).toBe(false);
      expect(result.skillScores.grammar.needsCriticalFocus).toBe(false);

      // Recommendations should prioritize the weak Reading skill first!
      const recs = generateRecommendations(result);
      expect(recs[0].skill).toBe('reading');
    });
  });

  describe('Duration and metadata edge cases', () => {
    it('handles identical start and end time with a minimum of 1 second', () => {
      const now = Date.now();
      const result = calculateAssessmentResult({}, QUESTION_BANK, 'sess-1', now, now);
      expect(result.durationSeconds).toBe(1);
    });

    it('handles null timestamps gracefully with 300s default', () => {
      const result = calculateAssessmentResult({}, QUESTION_BANK, 'sess-2', null, null);
      expect(result.durationSeconds).toBe(300);
    });
  });

  describe('Recommendation tie-breaker edge cases', () => {
    it('resolves 3-way tie (all skills 25%) in exact Grammar -> Vocabulary -> Reading order', () => {
      const answers: Record<string, string> = {};
      // 1 correct in each skill
      ['grammar', 'vocabulary', 'reading'].forEach((skill) => {
        const qs = QUESTION_BANK.filter((q) => q.skill === skill);
        answers[qs[0].id] = qs[0].correctOptionId;
        for (let i = 1; i < qs.length; i++) {
          answers[qs[i].id] = qs[i].options.find((o) => o.id !== qs[i].correctOptionId)!.id;
        }
      });

      const result = calculateAssessmentResult(answers, QUESTION_BANK);
      expect(result.skillScores.grammar.scorePercent).toBe(25);
      expect(result.skillScores.vocabulary.scorePercent).toBe(25);
      expect(result.skillScores.reading.scorePercent).toBe(25);

      const recs = generateRecommendations(result);
      expect(recs.length).toBe(3);
      // Precedence: Grammar is first
      expect(recs[0].skill).toBe('grammar');
    });
  });
});
