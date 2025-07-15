import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface KpiHistoryPoint {
  date: string;
  value: number;
}

interface KpiData {
  id: string;
  history?: KpiHistoryPoint[];
}

interface KPIChartSectionProps {
  kpiData: KpiData[];
}

const KPIChartSection: React.FC<KPIChartSectionProps> = ({ kpiData }) => {
  const oee = kpiData.find((k) => k.id === 'OEE');
  const defectRate = kpiData.find((k) => k.id === 'defectRate');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          설비 종합 효율 (OEE) 추이
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={oee?.history || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tickFormatter={(tick) => tick.substring(5)} />
            <YAxis unit="%" domain={[70, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              name="OEE"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          불량률 추이
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={defectRate?.history || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tickFormatter={(tick) => tick.substring(5)} />
            <YAxis unit="%" domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              name="불량률"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KPIChartSection;
