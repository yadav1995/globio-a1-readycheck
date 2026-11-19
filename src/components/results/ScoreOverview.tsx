import React from 'react';
import { AssessmentResult } from '../../types/scoring';
import { ShieldAlert, Award, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ScoreOverviewProps {
  result: AssessmentResult;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ result }) => {
  const { overallScore, band, durationSeconds } = result;

  const bandBadges = {
    strong: { variant: 'emerald' as const, label: 'Strong Foundation (80–100%)' },
    getting_close: { variant: 'amber' as const, label: 'Getting Close (65–79%)' },
    needs_practice: { variant: 'rose' as const, label: 'Needs More Practice (0–64%)' },
  };

  const currentBadge = bandBadges[band.id];

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 shadow-subtle mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
        <div className="w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant={currentBadge.variant} size="md">
              <Award className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span>{currentBadge.label}</span>
            </Badge>
            <span className="text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200 inline-flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-stone-700 flex-shrink-0" />
              Time: {formatMinutes(durationSeconds)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Diagnostic Assessment Results
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            {band.summary}
          </p>
        </div>

        {/* Big Overall Score Circle */}
        <div className="flex items-center space-x-4 self-stretch sm:self-center md:self-auto justify-center bg-stone-50 border border-stone-200/80 rounded-2xl p-4 sm:p-5">
          <div className="text-center">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl sm:text-5xl font-black text-forest-900 tracking-tight">
                {overallScore}
              </span>
              <span className="text-stone-600 font-semibold text-lg ml-1">/100</span>
            </div>
            <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mt-0.5">
              Overall Score
            </span>
          </div>
        </div>
      </div>

      {/* Diagnostic Context Note */}
      <div className="mt-6 p-4 rounded-xl bg-forest-50/60 border border-forest-200/70 text-xs sm:text-sm text-forest-950 leading-relaxed">
        <p className="font-semibold mb-1 text-forest-900">Formative Diagnostic Feedback:</p>
        <p>{band.detailedMessage}</p>
      </div>

      {/* Critical Limitation Banner */}
      <div className="mt-4 flex items-start space-x-2.5 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Product Hypothesis Note:</strong> Score bands are indicative diagnostic classifications, not official examination thresholds. This assessment covers receptive vocabulary, grammar, and reading only. It does <strong>not</strong> certify exam readiness or guarantee passing Goethe-Zertifikat A1 or ÖSD Zertifikat A1.
        </p>
      </div>
    </div>
  );
};
