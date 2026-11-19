import React, { useState } from 'react';
import { QuestionResultDetail } from '../../types/scoring';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, FileText, Check, HelpCircle } from 'lucide-react';
import { SKILL_LABELS } from '../../services/scoringEngine';

interface QuestionReviewProps {
  questionResults: QuestionResultDetail[];
}

export const QuestionReview: React.FC<QuestionReviewProps> = ({ questionResults }) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredQuestions = questionResults.filter((q) => {
    if (filter === 'correct') return q.isCorrect;
    if (filter === 'incorrect') return !q.isCorrect;
    return true;
  });

  const correctTotal = questionResults.filter((q) => q.isCorrect).length;
  const incorrectTotal = questionResults.length - correctTotal;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 shadow-subtle mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Question-by-Question Review
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Examine your choices, the correct A1 solutions, and detailed grammatical explanations.
          </p>
        </div>

        {/* Filter buttons - wrapped on mobile */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All (12)
          </button>
          <button
            type="button"
            onClick={() => setFilter('incorrect')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'incorrect'
                ? 'bg-white text-rose-800 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Missed ({incorrectTotal})
          </button>
          <button
            type="button"
            onClick={() => setFilter('correct')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'correct'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Correct ({correctTotal})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="mt-6 space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-8 text-stone-700 text-sm">
            No questions match the selected filter.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedIds[q.questionId] ?? true;

            return (
              <div
                key={q.questionId}
                className={`rounded-xl border transition-all ${
                  q.isCorrect
                    ? 'border-emerald-200 bg-white'
                    : 'border-rose-200 bg-white'
                }`}
              >
                {/* Accordion / Card Header */}
                <div
                  onClick={() => toggleExpand(q.questionId)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleExpand(q.questionId);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start space-x-3 min-w-0 flex-1">
                    <div className="mt-0.5 flex-shrink-0">
                      {q.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-xs font-bold text-stone-700">
                          Question {idx + 1}
                        </span>
                        <span className="text-xs text-stone-700 font-medium">
                          {SKILL_LABELS[q.skill]}
                        </span>
                        <span className="text-xs text-stone-700 hidden sm:inline">• {q.topic}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-stone-900 leading-snug whitespace-pre-line break-words">
                        {q.questionText}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto space-x-2 flex-shrink-0 text-stone-600 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                        q.isCorrect
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {q.isCorrect ? 'Correct (+1 pt)' : 'Incorrect (0 pt)'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-700 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-700 flex-shrink-0" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-stone-100 text-xs sm:text-sm space-y-4">
                    {/* Optional Passage */}
                    {q.passage && (
                      <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                        <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-700 mb-1">
                          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>Lesetext:</span>
                        </div>
                        <p className="whitespace-pre-line font-serif text-stone-800 bg-white p-3 rounded border border-stone-200/60 break-words">
                          {q.passage}
                        </p>
                      </div>
                    )}

                    {/* Answers Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        className={`p-3 rounded-lg border ${
                          q.isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/50 border-rose-200 text-rose-950'
                        }`}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                          Your Answer:
                        </span>
                        <p className="font-semibold text-sm break-words">
                          {q.selectedOptionText ? `„${q.selectedOptionText}“` : 'No answer provided'}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border bg-forest-50/50 border-forest-200 text-forest-950">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-forest-900 block mb-1 flex items-center">
                          <Check className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                          Correct Answer:
                        </span>
                        <p className="font-semibold text-sm break-words">
                          „{q.correctOptionText}“
                        </p>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/90 text-stone-700">
                      <div className="flex items-center space-x-1.5 font-semibold text-stone-900 mb-1 text-xs">
                        <HelpCircle className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                        <span>Why this is correct:</span>
                      </div>
                      <p className="leading-relaxed text-xs sm:text-sm break-words">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
