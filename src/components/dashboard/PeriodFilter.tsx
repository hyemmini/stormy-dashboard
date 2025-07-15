import React from 'react';

const PERIODS = [
  { value: '1d', label: '1일' },
  { value: '7d', label: '7일' },
  { value: '30d', label: '30일' },
];

type Period = '1d' | '7d' | '30d';

interface PeriodFilterProps {
  selectedPeriod: Period;
  onChange: (period: Period) => void;
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({
  selectedPeriod,
  onChange,
}) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        {PERIODS.map((period) => (
          <button
            key={period.value}
            onClick={() => onChange(period.value as Period)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              selectedPeriod === period.value
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodFilter;
