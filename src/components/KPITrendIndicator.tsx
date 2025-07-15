import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KpiTrend } from '../api/kpi';

interface KPITrendIndicatorProps {
  trend: KpiTrend;
}

const KPITrendIndicator: React.FC<KPITrendIndicatorProps> = ({ trend }) => {
  let colorClass = '';
  let icon = null;
  switch (trend) {
    case 'up':
      colorClass = 'text-green-500';
      icon = <TrendingUp size={20} />;
      break;
    case 'down':
      colorClass = 'text-red-500';
      icon = <TrendingDown size={20} />;
      break;
    case 'stable':
    default:
      colorClass = 'text-gray-500';
      icon = <span className="text-xl">―</span>; // Simple dash for stable
  }
  return <span className={`${colorClass} flex items-center`}>{icon}</span>;
};

export default KPITrendIndicator;
