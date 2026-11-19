import React from 'react';
import { AssessmentResult } from '../../types/scoring';
import { SkillType } from '../../types/assessment';
import { ProgressBar } from '../common/ProgressBar';
import { AlertTriangle, BookMarked, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface SkillBreakdownProps {
  result: AssessmentResult;
}

export const SkillBreakdown: React.FC<SkillBreakdownProps> = ({ result }) => {
  const { skillScores, hasCriticalGaps } = result;

  const skillIcons: Record<SkillType, React.ElementType> = {
    vocabulary: BookMarked,
    grammar: Layers,
    reading: FileText,
  };

  const skills: SkillType[] = ['vocabulary', 'grammar', 'reading'];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 shadow-subtle mb-8">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
          Performance by Skill Area
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-1">
          Each skill is evaluated with 4 questions (each correct answer = 25%). Overall confidence often masks a specific weak area.
        </p>
      </div>

      {/* Critical Safeguard Alert */}
      {hasCriticalGaps && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-bold">Skill Safeguard Triggered</p>
            <p className="text-amber-900/90 mt-0.5 leading-relaxed">
              One or more skills scored below 60%. Even if your overall average appears acceptable, specific deficits in grammar or vocabulary can cause failures on examination day. Review the targeted recommendations below before booking.
            </p>
          </div>
        </div>
      )}

      {/* Skill Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {skills.map((skillKey) => {
          const score = skillScores[skillKey];
          const Icon = skillIcons[skillKey];
          const isWeak = score.needsCriticalFocus;
          const isPerfect = score.scorePercent === 100;

          return (
            <div
              key={skillKey}
              className={`p-4 sm:p-5 rounded-xl border flex flex-col justify-between transition-all ${
                isWeak
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-stone-200 bg-white hover:border-forest-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${isWeak ? 'bg-amber-100 text-amber-800' : 'bg-forest-50 text-forest-800'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-stone-900 capitalize">
                      {skillKey}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                      isWeak
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : isPerfect
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {score.scorePercent}%
                  </span>
                </div>

                <div className="my-3">
                  <ProgressBar
                    current={score.correctCount}
                    total={score.totalCount}
                    color={isWeak ? 'amber' : isPerfect ? 'emerald' : 'forest'}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-700 mt-2 gap-1">
                  <span>Correct: {score.correctCount} of {score.totalCount} questions</span>
                  <span className="font-semibold">{score.scorePercent} / 100 pts</span>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-stone-100 text-xs">
                {isWeak ? (
                  <span className="text-amber-700 font-semibold flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600 flex-shrink-0" />
                    Critical gap detected (&lt; 60%)
                  </span>
                ) : isPerfect ? (
                  <span className="text-emerald-700 font-semibold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 flex-shrink-0" />
                    All questions correct
                  </span>
                ) : (
                  <span className="text-stone-700">Good foundational grasp</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
