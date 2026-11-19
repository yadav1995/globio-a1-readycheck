import React, { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { CheckCircle2, AlertCircle, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { SKILL_LABELS } from '../../services/scoringEngine';

export const ReviewScreen: React.FC = () => {
  const { state, dispatch, questions, answeredCount, totalQuestions, isAllAnswered } = useAssessment();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const unansweredIndices = questions
    .map((q, idx) => (!state.answers[q.id] ? idx : null))
    .filter((idx): idx is number => idx !== null);

  const handleSelectQuestion = (index: number) => {
    dispatch({ type: 'RETURN_TO_QUESTION', payload: { index } });
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    dispatch({ type: 'SUBMIT_ASSESSMENT' });
  };

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8">
      {/* Review Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 mb-6 sm:mb-8 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-800 border border-forest-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              <span>Assessment Review</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Review Your Answers
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Verify your selected options across all 12 questions before final scoring. Click any question to edit.
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: 'RETURN_TO_QUESTION', payload: { index: state.currentQuestionIndex } })}
            className="inline-flex items-center text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 px-3.5 sm:px-4 py-2 rounded-xl transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Back to Questions</span>
          </button>
        </div>

        {/* Answered Progress Summary */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
          <div className="flex items-start sm:items-center space-x-3">
            {isAllAnswered ? (
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-stone-900">
                {isAllAnswered
                  ? 'All 12 questions answered'
                  : `${answeredCount} of ${totalQuestions} questions completed`}
              </p>
              <p className="text-xs text-stone-700 mt-0.5">
                {isAllAnswered
                  ? 'Ready for submission and immediate diagnostic report.'
                  : `Please answer the remaining ${totalQuestions - answeredCount} question(s) before submitting.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={!isAllAnswered}
            onClick={() => setShowConfirmModal(true)}
            className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-forest-600 ${
              isAllAnswered
                ? 'bg-forest-900 hover:bg-forest-800 text-white shadow-elevated'
                : 'bg-stone-200 text-stone-700 cursor-not-allowed'
            }`}
          >
            <span>Submit Assessment</span>
            <Send className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* 12-Question Grid */}
      <div className="space-y-3.5 sm:space-y-4">
        {questions.map((question, index) => {
          const selectedOptionId = state.answers[question.id];
          const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
          const isAnswered = Boolean(selectedOptionId);

          return (
            <div
              key={question.id}
              className={`p-4 sm:p-5 rounded-xl border bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isAnswered
                  ? 'border-stone-200 hover:border-forest-400'
                  : 'border-amber-300 bg-amber-50/30'
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0 w-full sm:w-auto">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    Q{index + 1}
                  </span>
                  <span className="text-xs text-stone-700 font-medium">
                    {SKILL_LABELS[question.skill]}
                  </span>
                  <span className="text-xs text-stone-700 hidden sm:inline">• {question.topic}</span>
                </div>

                <p className="text-sm font-semibold text-stone-900 line-clamp-2 break-words">
                  {question.questionText}
                </p>

                <div className="text-xs pt-1">
                  {isAnswered ? (
                    <span className="text-forest-800 font-medium flex items-start sm:items-center break-words">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-forest-700 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span>
                        Selected: <span className="text-stone-800 font-normal">„{selectedOption?.text}“</span>
                      </span>
                    </span>
                  ) : (
                    <span className="text-amber-800 font-medium flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-600 flex-shrink-0" />
                      <span>Not answered yet</span>
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectQuestion(index)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold border border-stone-300 hover:border-forest-600 hover:text-forest-800 bg-white hover:bg-forest-50/50 transition-colors flex-shrink-0"
              >
                {isAnswered ? 'Edit Answer' : 'Answer Question'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 id="confirm-modal-title" className="text-lg font-bold text-stone-900 mb-2">
              Confirm Submission?
            </h3>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              You have answered all 12 questions. Once submitted, your answers will be evaluated to generate your diagnostic skill breakdown and study recommendations.
            </p>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-medium text-sm hover:bg-stone-50 transition-colors"
              >
                Continue Reviewing
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm shadow-sm transition-colors"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Warning if incomplete */}
      {!isAllAnswered && unansweredIndices.length > 0 && (
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>
            Questions remaining to answer: {unansweredIndices.map((i) => `Q${i + 1}`).join(', ')}
          </span>
          <button
            type="button"
            onClick={() => handleSelectQuestion(unansweredIndices[0])}
            className="font-bold underline hover:text-amber-950 flex-shrink-0"
          >
            Jump to Q{unansweredIndices[0] + 1}
          </button>
        </div>
      )}
    </div>
  );
};
