import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'forest' | 'emerald' | 'amber' | 'rose';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = false,
  color = 'forest',
}) => {
  const percentage = Math.min(100, Math.max(0, total > 0 ? Math.round((current / total) * 100) : 0));

  const barColors = {
    forest: 'bg-forest-700',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs text-stone-600 font-medium">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div
        className="w-full bg-stone-200/80 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label || 'Progress'}
      >
        <div
          className={`h-full transition-all duration-300 ease-out rounded-full ${barColors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
