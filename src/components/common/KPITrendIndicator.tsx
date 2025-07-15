import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

type TrendType = 'up' | 'down';

interface KPITrendIndicatorProps {
  trend: TrendType;
  className?: string;
}

const KPITrendIndicator: React.FC<KPITrendIndicatorProps> = ({
  trend,
  className = 'h-5 w-5',
}) => {
  if (trend === 'up') {
    return <TrendingUp className={`${className} text-green-500`} />;
  }
  if (trend === 'down') {
    return <TrendingDown className={`${className} text-red-500`} />;
  }
  return null;
};

export default KPITrendIndicator;
