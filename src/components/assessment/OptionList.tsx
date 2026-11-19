import React from 'react';
import { QuestionOption } from '../../types/assessment';
import { Check } from 'lucide-react';

interface OptionListProps {
  options: QuestionOption[];
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  questionId: string;
}

export const OptionList: React.FC<OptionListProps> = ({
  options,
  selectedOptionId,
  onSelectOption,
  questionId,
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div
      role="radiogroup"
      aria-label="Answer options"
      className="space-y-3 w-full"
    >
      {options.map((option, index) => {
        const isSelected = selectedOptionId === option.id;
        const letter = letters[index] || `${index + 1}`;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            id={`option-${questionId}-${option.id}`}
            onClick={() => onSelectOption(option.id)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onSelectOption(option.id);
              }
            }}
            className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start sm:items-center justify-between gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 ${
              isSelected
                ? 'border-forest-700 bg-forest-50/70 text-forest-950 shadow-subtle'
                : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60 text-stone-800'
            }`}
          >
            <div className="flex items-start sm:items-center space-x-3 min-w-0 flex-1">
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0 mt-0.5 sm:mt-0 ${
                  isSelected
                    ? 'bg-forest-800 text-white'
                    : 'bg-stone-100 text-stone-700 group-hover:bg-stone-200'
                }`}
              >
                {letter}
              </span>
              <span className="text-sm sm:text-base font-medium leading-snug break-words">
                {option.text}
              </span>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 mt-1 sm:mt-0 ${
                isSelected
                  ? 'border-forest-800 bg-forest-800 text-white'
                  : 'border-stone-300 bg-white group-hover:border-stone-400'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </button>
        );
      })}
    </div>
  );
};
