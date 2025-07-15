import React from 'react';
import KPIIcon from '../common/KPIIcon';
import KPIStatusIndicator from '../common/KPIStatusIndicator';
import KPITrendIndicator from '../common/KPITrendIndicator';

type KpiStatus = 'on-track' | 'at-risk' | 'off-track';
type KpiTrend = 'up' | 'down';

// NOTE: This type should ideally be in a shared types definition file.
interface Kpi {
  id: string;
  name: string;
  category: string;
  currentValue: number | string;
  unit: string;
  description: string;
  status: KpiStatus;
  trend: KpiTrend;
}

interface KPICardProps {
  kpi: Kpi;
  onClick: (kpi: Kpi) => void;
}

const KPICard = ({ kpi, onClick }: KPICardProps) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(kpi)}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <KPIIcon kpiId={kpi.id} />
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
        <p className="text-sm text-gray-500 mb-4">{kpi.description}</p>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span className="flex items-center">
          <span className="mr-1">추이:</span>
          <KPITrendIndicator trend={kpi.trend} />
        </span>
        <button className="text-blue-600 hover:underline text-sm">
          상세 보기
        </button>
      </div>
    </div>
  );
};

export default KPICard;
