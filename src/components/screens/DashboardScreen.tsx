import React from 'react';
import KPIStatusIndicator from '../common/KPIStatusIndicator';
import KPITrendIndicator from '../common/KPITrendIndicator';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type KpiStatus = 'on-track' | 'at-risk' | 'off-track';
type KpiTrend = 'up' | 'down';

interface KpiHistoryPoint {
  date: string;
  value: number;
}

interface Kpi {
  id: string;
  name: string;
  status: KpiStatus;
  trend: KpiTrend;
  history: KpiHistoryPoint[];
}

interface DashboardScreenProps {
  kpi: Kpi | null;
  onBack: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ kpi, onBack }) => {
  if (!kpi) {
    return <div>선택된 KPI가 없습니다.</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        &larr; 뒤로가기
      </button>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{kpi.name}</h2>
          <div className="ml-4 flex items-center gap-2">
            <KPIStatusIndicator status={kpi.status} />
            <KPITrendIndicator trend={kpi.trend} />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={kpi.history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              name={kpi.name}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardScreen;
