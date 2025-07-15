import React from 'react';
import {
  Factory,
  CheckCircle,
  DollarSign,
  Truck,
  Package,
  Leaf,
  Users,
  Info,
} from 'lucide-react';

const KPI_ICONS: { [key: string]: React.ElementType } = {
  'production-volume': Factory,
  'quality-pass-rate': CheckCircle,
  'unit-cost': DollarSign,
  'on-time-delivery': Truck,
  'inventory-turnover': Package,
  'energy-consumption': Leaf,
  'employee-turnover': Users,
};

interface KPIIconProps {
  kpiId: string;
  className?: string;
}

const KPIIcon: React.FC<KPIIconProps> = ({ kpiId, className = 'h-6 w-6' }) => {
  const Icon = KPI_ICONS[kpiId] || Info;
  return <Icon className={className} />;
};

export default KPIIcon;
