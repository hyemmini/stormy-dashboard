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
import { KpiCategory } from '../constants/kpi';

interface KPIIconProps {
  category: KpiCategory;
}

const KPIIcon: React.FC<KPIIconProps> = ({ category }) => {
  switch (category) {
    case '생산성':
      return <Factory className="w-6 h-6 text-indigo-600" />;
    case '품질':
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    case '비용':
      return <DollarSign className="w-6 h-6 text-purple-600" />;
    case '납기':
      return <Truck className="w-6 h-6 text-orange-600" />;
    case '재고':
      return <Package className="w-6 h-6 text-yellow-600" />;
    case '지속가능성':
      return <Leaf className="w-6 h-6 text-teal-600" />;
    case '인력 관리':
      return <Users className="w-6 h-6 text-pink-600" />;
    default:
      return <Info className="w-6 h-6 text-gray-600" />;
  }
};

export default KPIIcon;
