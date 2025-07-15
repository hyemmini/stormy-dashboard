import { useParams, Link } from 'react-router-dom';
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
import { ArrowLeft } from 'lucide-react';

import { useKpi } from '../hooks/useKpi';
import KPIIcon from '../components/KPIIcon';
import KPIStatusIndicator from '../components/KPIStatusIndicator';
import KPITrendIndicator from '../components/KPITrendIndicator';

const KpiDetailPage: React.FC = () => {
  const { kpiId } = useParams<{ kpiId: string }>();
  const { data: kpi, isLoading, error } = useKpi(kpiId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading KPI details...
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

  if (!kpi) {
    return (
      <div className="p-6">
        <Link
          to="/"
          className="mb-4 flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> 대시보드로 돌아가기
        </Link>
        <p className="text-gray-700">KPI 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <Link
        to="/"
        className="mb-6 flex items-center text-blue-600 hover:underline font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> 대시보드로 돌아가기
      </Link>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <KPIIcon category={kpi.category} />
        <span className="ml-2">{kpi.name} 상세 정보</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            현재 상태
          </h3>
          <p className="text-4xl font-bold text-gray-900 mb-2">
            {kpi.currentValue}
            <span className="text-xl font-normal text-gray-600 ml-1">
              {kpi.unit}
            </span>
          </p>
          <div className="flex items-center space-x-4">
            <KPIStatusIndicator status={kpi.status} />
            <span className="flex items-center text-sm text-gray-600">
              <span className="mr-1">추이:</span>
              <KPITrendIndicator trend={kpi.trend} />
            </span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">KPI 정의</h3>
          <p className="text-gray-700 text-sm">{kpi.description}</p>
        </div>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">측정 방법</h3>
        <p className="text-gray-700 text-sm">{kpi.measurementFormula}</p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">중요성</h3>
        <p className="text-gray-700 text-sm">{kpi.importance}</p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          과거 데이터 추이 ({kpi.name})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={kpi.history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tickFormatter={(tick) => tick.substring(5)} />
            <YAxis unit={kpi.unit} />
            <Tooltip />
            <Legend />
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

export default KpiDetailPage;
