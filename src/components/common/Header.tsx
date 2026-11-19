import React from 'react';
import { Compass, Sparkles, RotateCcw } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export const Header: React.FC = () => {
  const { state, dispatch } = useAssessment();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest-900 flex items-center justify-center text-white shadow-subtle flex-shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-forest-300" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-forest-950">Globio</span>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium bg-forest-100 text-forest-800 border border-forest-200 whitespace-nowrap">
                A1 ReadyCheck
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-700 hidden md:block truncate">
              German Exam Preparation Diagnostic
            </p>
          </div>
        </div>

        {/* Status / Quick Action */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {state.status === 'IN_PROGRESS' && (
            <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-forest-50 text-forest-800 border border-forest-200">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mr-1.5 animate-pulse" />
              Diagnostic Active
            </span>
          )}

          {state.status === 'REVIEW' && (
            <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              Reviewing Answers
            </span>
          )}

          {state.status === 'COMPLETED' && (
            <button
              onClick={() => dispatch({ type: 'RETAKE_ASSESSMENT' })}
              className="inline-flex items-center text-xs font-medium text-forest-800 hover:text-forest-950 bg-forest-50 hover:bg-forest-100 px-2.5 sm:px-3 py-1.5 rounded-lg border border-forest-200 transition-colors focus:ring-2 focus:ring-forest-600 focus:outline-none"
              aria-label="Restart assessment"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>New Diagnostic</span>
            </button>
          )}

          {state.status === 'NOT_STARTED' && (
            <div className="hidden sm:flex items-center text-xs text-stone-700 space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              <span>Independent Assessment</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
