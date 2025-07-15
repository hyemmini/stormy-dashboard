import React from 'react';
import { Link } from 'react-router-dom';
import KPIIcon from './KPIIcon';
import KPIStatusIndicator from './KPIStatusIndicator';
import KPITrendIndicator from './KPITrendIndicator';
import { KpiData } from '../api/kpi';

interface KPICardProps {
  kpi: KpiData;
}

const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  return (
    <Link
      to={`/kpi/${kpi.id}`}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <KPIIcon category={kpi.category} />
            <h3 className="text-lg font-semibold ml-2 text-gray-900">
              {kpi.name}
            </h3>
          </div>
          <KPIStatusIndicator status={kpi.status} />
        </div>
        <p className="text-4xl font-bold text-gray-900 mb-2">
          {kpi.currentValue}
          <span className="text-xl font-normal text-gray-600 ml-1">
            {kpi.unit}
          </span>
        </p>
        <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">
          {kpi.description}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
        <span className="flex items-center">
          <span className="mr-1">추이:</span>
          <KPITrendIndicator trend={kpi.trend} />
        </span>
        <span className="text-blue-600 hover:underline text-sm font-medium">
          상세 보기
        </span>
      </div>
    </Link>
  );
};

export default KPICard;
