import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

import { KpiStatus } from '../api/kpi';

interface KPIStatusIndicatorProps {
  status: KpiStatus;
}

const KPIStatusIndicator: React.FC<KPIStatusIndicatorProps> = ({ status }) => {
  let colorClass = '';
  let icon = null;
  switch (status) {
    case 'Normal':
      colorClass = 'bg-green-100 text-green-800';
      icon = <CheckCircle size={16} />;
      break;
    case 'Warning':
      colorClass = 'bg-yellow-100 text-yellow-800';
      icon = <AlertCircle size={16} />;
      break;
    case 'Critical':
      colorClass = 'bg-red-100 text-red-800';
      icon = <AlertCircle size={16} />;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
      icon = <Info size={16} />;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {icon}{' '}
      <span className="ml-1">
        {status === 'Normal' ? '정상' : status === 'Warning' ? '주의' : '위험'}
      </span>
    </span>
  );
};

export default KPIStatusIndicator;
