import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Target, AlertCircle } from 'lucide-react';

import { useKpis } from '../hooks/useKpis';
import KPICard from '../components/KPICard';
import { KpiData } from '../api/kpi';

interface Alert {
  id: string;
  message: string;
  type: string;
}

const DashboardPage: React.FC = () => {
  const { data: kpiData, isLoading, error } = useKpis();

  const { machineKPIs, otherKPIs, alerts } = useMemo(() => {
    if (!kpiData) return { machineKPIs: [], otherKPIs: [], alerts: [] };

    return {
      machineKPIs: kpiData.filter((kpi) => kpi.type === 'machine'),
      otherKPIs: kpiData.filter((kpi) => kpi.type !== 'machine'),
      alerts: kpiData
        .filter((kpi) => kpi.status === 'Warning' || kpi.status === 'Critical')
        .map((kpi) => ({
          id: kpi.id,
          message: `${kpi.name}이(가) ${kpi.status === 'Warning' ? '주의' : '위험'} 수준입니다. 현재 값: ${kpi.currentValue}${kpi.unit}`,
          type: kpi.status.toLowerCase(),
        })),
    };
  }, [kpiData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="p-6">
      {alerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6 shadow-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">주요 알림</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc pl-5 space-y-1">
                  {alerts.map((alert) => (
                    <li key={alert.id}>{alert.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-gray-600" /> 기계 카테고리 핵심
          KPI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machineKPIs.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-gray-600" /> 기타 주요 KPI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherKPIs.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <Link
          to="/issue-analysis"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <span className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            새로운 제조 이슈 등록
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
