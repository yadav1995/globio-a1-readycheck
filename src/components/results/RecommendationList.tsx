import React from 'react';
import { PracticeRecommendation } from '../../types/scoring';
import { Compass, Lightbulb, CheckCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

interface RecommendationListProps {
  recommendations: PracticeRecommendation[];
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  const priorityLabels: Record<number, { text: string; variant: 'rose' | 'amber' | 'forest' }> = {
    1: { text: 'Priority 1 (Highest Impact)', variant: 'rose' },
    2: { text: 'Priority 2 (Recommended)', variant: 'amber' },
    3: { text: 'Priority 3 (Consolidation)', variant: 'forest' },
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 shadow-subtle mb-8">
      <div className="flex items-start sm:items-center space-x-3 mb-6">
        <div className="p-2 sm:p-2.5 rounded-xl bg-forest-50 text-forest-800 border border-forest-200 flex-shrink-0 mt-0.5 sm:mt-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Prioritized Practice Recommendations
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
            Deterministic, rule-based study priorities mapped directly to your missed questions and weaker skills.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const priorityConfig = priorityLabels[rec.priority] || priorityLabels[3];

          return (
            <div
              key={rec.id}
              className="p-4 sm:p-6 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <Badge variant={priorityConfig.variant} size="sm">
                    {priorityConfig.text}
                  </Badge>
                  <span className="text-xs font-semibold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 capitalize">
                    {rec.skill}
                  </span>
                </div>
                <span className="text-xs font-medium text-stone-700">{rec.topic}</span>
              </div>

              <h3 className="text-base font-bold text-stone-900 mb-2 flex items-start sm:items-center">
                <Lightbulb className="w-4 h-4 mr-2 text-forest-700 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{rec.title}</span>
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 pl-0 sm:pl-6 break-words">
                {rec.actionableAdvice}
              </p>

              {rec.examples && rec.examples.length > 0 && (
                <div className="pl-0 sm:pl-6 pt-3 border-t border-stone-200/80">
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
                    Key German Exam Examples & Drills:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {rec.examples.map((eg, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2 text-xs text-stone-700 bg-white p-2 rounded-lg border border-stone-200/60 font-mono"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span className="break-words">{eg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
