import React from 'react';
import { ArrowLeft, ArrowRight, ListChecks } from 'lucide-react';

interface NavigationBarProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenReview: () => void;
  hasCurrentAnswer: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentIndex,
  totalQuestions,
  answeredCount,
  onPrev,
  onNext,
  onOpenReview,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
      {/* Prev button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl border font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-forest-600 order-2 sm:order-1 ${
          isFirst
            ? 'border-stone-200 text-stone-700 bg-stone-100 cursor-not-allowed opacity-60'
            : 'border-stone-300 text-stone-700 bg-white hover:bg-stone-50 hover:text-stone-900 shadow-sm'
        }`}
        aria-label="Go to previous question"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Previous</span>
      </button>

      {/* Middle info & Review button */}
      <div className="flex items-center space-x-3 w-full sm:w-auto justify-center order-3 sm:order-2">
        <button
          type="button"
          onClick={onOpenReview}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 text-sm font-medium border border-forest-200 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-600"
          aria-label="Review all questions"
        >
          <ListChecks className="w-4 h-4 mr-1.5 text-forest-700 flex-shrink-0" />
          <span>Review All ({answeredCount}/{totalQuestions})</span>
        </button>
      </div>

      {/* Next or Finish/Review button */}
      {isLast ? (
        <button
          type="button"
          onClick={onOpenReview}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-sm shadow-subtle transition-all focus:outline-none focus:ring-2 focus:ring-forest-600 order-1 sm:order-3"
        >
          <span>Go to Review</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-sm shadow-subtle transition-all focus:outline-none focus:ring-2 focus:ring-forest-600 order-1 sm:order-3"
          aria-label="Go to next question"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      )}
    </div>
  );
};
