interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>{label}</span>
          <span>{current} מתוך {total}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 ease-out flex items-center justify-center text-xs text-white font-medium"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && `${percentage}%`}
        </div>
      </div>
    </div>
  );
}
