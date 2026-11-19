import React from 'react';
import { RotateCcw, Compass, ExternalLink, AlertOctagon, CheckSquare } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export const NextStepsAdvice: React.FC = () => {
  const { dispatch } = useAssessment();

  const handleRetake = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch({ type: 'RETAKE_ASSESSMENT' });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-subtle mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 rounded-xl bg-forest-900 text-white">
          <Compass className="w-5 h-5 text-forest-300" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Recommended Next Steps Before Booking
          </h2>
          <p className="text-stone-600 text-sm mt-0.5">
            Do not rely solely on this short diagnostic. Take these proactive steps before committing to exam registration fees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Step 1: Mock Exams */}
        <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
            <CheckSquare className="w-4 h-4 text-forest-700" />
            <span>1. Attempt Official Model Sets (Modellsätze)</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Download the official practice papers directly from the Goethe-Institut (Start Deutsch 1) or ÖSD (Zertifikat A1). Simulate the complete exam with full time constraints.
          </p>
        </div>

        {/* Step 2: Untested Modules */}
        <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
            <AlertOctagon className="w-4 h-4 text-amber-600" />
            <span>2. Practice Listening & Speaking Audio</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Half of your official exam grade depends on Hören (audio announcements) and Sprechen (partner dialogues). Find a speaking partner or tutor to practice verbal introductions.
          </p>
        </div>
      </div>

      {/* Official Resources Links */}
      <div className="p-4 rounded-xl bg-forest-50/50 border border-forest-200/80 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-forest-950">
        <div>
          <p className="font-semibold text-forest-900">Official Exam Resources (External Links):</p>
          <p className="text-stone-700 mt-0.5">
            Check Goethe-Institut Start Deutsch 1 or ÖSD Zertifikat A1 official guidelines.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="https://www.goethe.de/en/spr/kup/prf/prf/sd1/ueb.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-bold text-forest-800 hover:text-forest-950 underline underline-offset-2"
          >
            <span>Goethe Practice Papers</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Retake CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-stone-100 gap-4">
        <div>
          <h4 className="font-bold text-stone-900 text-sm">Want to try again after studying?</h4>
          <p className="text-xs text-stone-700">
            Retaking resets your answers and provides a fresh diagnostic assessment session.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRetake}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm shadow-subtle transition-all focus:outline-none focus:ring-2 focus:ring-forest-600"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          <span>Retake Diagnostic Assessment</span>
        </button>
      </div>
    </div>
  );
};
