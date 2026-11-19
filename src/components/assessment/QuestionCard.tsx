import React from 'react';
import { Question } from '../../types/assessment';
import { OptionList } from './OptionList';
import { Badge } from '../common/Badge';
import { BookMarked, Layers, FileText } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
}) => {
  const skillIcons = {
    vocabulary: BookMarked,
    grammar: Layers,
    reading: FileText,
  };

  const skillBadges = {
    vocabulary: { variant: 'emerald' as const, label: 'Vocabulary' },
    grammar: { variant: 'forest' as const, label: 'Grammar' },
    reading: { variant: 'amber' as const, label: 'Reading Comprehension' },
  };

  const Icon = skillIcons[question.skill];
  const badgeInfo = skillBadges[question.skill];

  return (
    <article className="bg-white rounded-2xl border border-stone-200/90 shadow-subtle p-6 sm:p-8 max-w-3xl mx-auto">
      {/* Question Header & Meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-stone-100 mb-6">
        <div className="flex items-center space-x-2">
          <Badge variant={badgeInfo.variant} size="sm">
            <Icon className="w-3.5 h-3.5 mr-1" />
            <span>{badgeInfo.label}</span>
          </Badge>
          <span className="text-xs text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
            {question.topic}
          </span>
        </div>

        <span className="text-xs font-semibold text-stone-700">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Reading Passage (if applicable) */}
      {question.passage && (
        <div className="mb-6 p-5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Lesetext (Reading Passage)</span>
          </div>
          <div className="whitespace-pre-line text-sm sm:text-base font-serif leading-relaxed text-stone-900 bg-white/80 p-4 rounded-lg border border-stone-200/60 shadow-sm">
            {question.passage}
          </div>
        </div>
      )}

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-snug whitespace-pre-line">
          {question.questionText}
        </h2>
      </div>

      {/* 4 Answer Options */}
      <OptionList
        options={question.options}
        selectedOptionId={selectedOptionId}
        onSelectOption={onSelectOption}
        questionId={question.id}
      />
    </article>
  );
};
