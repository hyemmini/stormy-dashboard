import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

type StatusType = 'on-track' | 'at-risk' | 'off-track';

const STATUS_CONFIG: {
  [key in StatusType]: { Icon: React.ElementType; color: string };
} = {
  'on-track': { Icon: CheckCircle, color: 'text-green-500' },
  'at-risk': { Icon: AlertCircle, color: 'text-yellow-500' },
  'off-track': { Icon: AlertCircle, color: 'text-red-500' },
};

interface KPIStatusIndicatorProps {
  status: StatusType;
  className?: string;
}

const KPIStatusIndicator: React.FC<KPIStatusIndicatorProps> = ({
  status,
  className = 'h-5 w-5',
}) => {
  const config = STATUS_CONFIG[status];
  const Icon = config ? config.Icon : Info;
  const color = config ? config.color : 'text-gray-500';

  return <Icon className={`${className} ${color}`} />;
};

export default KPIStatusIndicator;
