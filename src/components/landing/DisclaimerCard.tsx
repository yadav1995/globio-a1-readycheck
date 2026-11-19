import React from 'react';
import { Info, AlertCircle, XCircle } from 'lucide-react';

export const DisclaimerCard: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-2xl bg-amber-50/70 border border-amber-200/90 p-5 sm:p-6 shadow-subtle">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-800 flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                Diagnostic Purpose & Scope Limitations
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed mt-1">
                Globio A1 ReadyCheck is an indicative, formative learning diagnostic. It is designed to help you identify specific knowledge gaps across three foundational skills before booking an official exam.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start space-x-2 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Untested Modules:</strong> Listening (Hören), Speaking (Sprechen), and Writing (Schreiben) are <strong>not</strong> evaluated.
                </span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-amber-900">
                <XCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Not a Pass Predictor:</strong> A high score here does not guarantee a pass on the official Goethe-Zertifikat A1 or ÖSD exam.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
