import React from 'react';
import { ArrowRight, CheckCircle2, Clock, HelpCircle, Sparkles } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export const HeroSection: React.FC = () => {
  const { dispatch } = useAssessment();

  return (
    <section className="text-center max-w-3xl mx-auto py-10 sm:py-14 px-4 sm:px-6">
      {/* Intro Pill */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs sm:text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4 text-forest-600" />
        <span>Independent German A1 Readiness Diagnostic</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight sm:leading-tight mb-6">
        Know where you stand before you book your{' '}
        <span className="text-forest-800 underline decoration-forest-300 decoration-wavy underline-offset-4">
          A1 exam
        </span>
        .
      </h1>

      {/* Learner Problem Explanation */}
      <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8">
        Finishing a textbook or feeling comfortable in class doesn’t always mean you are ready for the pressure of a Goethe or ÖSD examination. Gaps in basic grammar or vocabulary can easily go unnoticed—costing you valuable exam fees and confidence.
      </p>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white border border-stone-200 shadow-subtle text-stone-700">
          <HelpCircle className="w-4 h-4 text-forest-700 flex-shrink-0" />
          <span className="text-sm font-medium">12 Diagnostic Questions</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white border border-stone-200 shadow-subtle text-stone-700">
          <Clock className="w-4 h-4 text-forest-700 flex-shrink-0" />
          <span className="text-sm font-medium">5–7 Minutes</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white border border-stone-200 shadow-subtle text-stone-700">
          <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
          <span className="text-sm font-medium">Actionable Feedback</span>
        </div>
      </div>

      {/* Start CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => dispatch({ type: 'START_ASSESSMENT' })}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-base shadow-elevated transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2"
        >
          <span>Start Assessment</span>
          <ArrowRight className="w-5 h-5 ml-2.5" />
        </button>
      </div>

      <p className="mt-4 text-xs text-stone-700">
        100% free • Instant results • No sign-up or email required
      </p>
    </section>
  );
};
