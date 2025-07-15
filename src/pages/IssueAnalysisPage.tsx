import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnalyzeIssue } from '../hooks/useAnalyzeIssue';
import { kpiDefinitions, KpiDefinition } from '../constants/kpi';
import { AnalysisPayload, RootCause } from '../api/kpi';
import { ArrowLeft, AlertCircle, Info, Send } from 'lucide-react';

const IssueAnalysisPage: React.FC = () => {
  const [issueDescription, setIssueDescription] = useState<string>('');
  const [recommendedKpis, setRecommendedKpis] = useState<KpiDefinition[]>([]);
  const [selectedKpis, setSelectedKpis] = useState<string[]>([]);
  const kpiDataInput = ''; // TODO: This is a placeholder. Implement UI and state logic if needed.

  const mutation = useAnalyzeIssue();

  useEffect(() => {
    if (issueDescription.length > 3) {
      const lowerDesc = issueDescription.toLowerCase();
      const recommended = kpiDefinitions.filter(
        (kpi) =>
          (lowerDesc.includes('불량') && kpi.id === 'defectRate') ||
          (lowerDesc.includes('생산성') &&
            (kpi.id === 'OEE' || kpi.id === 'productionVolume')) ||
          (lowerDesc.includes('납기') && kpi.id === 'onTimeDeliveryRate'),
      );
      setRecommendedKpis(recommended);
    } else {
      setRecommendedKpis([]);
    }
  }, [issueDescription]);

  const handleKpiSelect = (kpiId: string) => {
    setSelectedKpis((prev) =>
      prev.includes(kpiId)
        ? prev.filter((id) => id !== kpiId)
        : [...prev, kpiId],
    );
  };

  const handleAnalyze = () => {
    if (!issueDescription || selectedKpis.length === 0) {
      console.error('이슈 설명과 관련 KPI를 선택해주세요.');
      return;
    }

    const payload: AnalysisPayload = {
      issue_description: issueDescription,
      selectedKpis,
      kpi_data_input: kpiDataInput,
      context: {
        industry: '자동차 부품 제조업',
        product_line: '엔진 부품',
        recent_changes: '지난달 신규 설비 도입 및 일부 작업자 교대 배치',
      },
    };
    mutation.mutate(payload);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <Link
        to="/"
        className="mb-6 flex items-center text-blue-600 hover:underline font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> 대시보드로 돌아가기
      </Link>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <AlertCircle className="w-6 h-6 mr-2 text-red-600" /> 제조 이슈 등록 및
        근본 원인 분석
      </h2>

      <div className="mb-6">
        <label
          htmlFor="issue-description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          제조 이슈를 상세히 입력해주세요:
        </label>
        <textarea
          id="issue-description"
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
          placeholder="예: 최근 3주간 생산 라인 불량률이 5%에서 15%로 급증했습니다."
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
        ></textarea>
      </div>

      {recommendedKpis.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            <Info className="inline-block w-5 h-5 mr-2 text-blue-600" /> 관련
            KPI 추천
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            입력하신 이슈와 연관성이 높은 KPI입니다. 분석에 활용할 KPI를
            선택해주세요.
          </p>
          <div className="flex flex-wrap gap-3">
            {recommendedKpis.map((kpi) => (
              <label
                key={kpi.id}
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={selectedKpis.includes(kpi.id)}
                  onChange={() => handleKpiSelect(kpi.id)}
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {kpi.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mb-6">
        <button
          onClick={handleAnalyze}
          disabled={mutation.isPending}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              분석 중...
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="w-5 h-5 mr-2" />
              근본 원인 분석
            </span>
          )}
        </button>
      </div>

      {mutation.isSuccess && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">
            분석 결과: 근본 원인
          </h3>
          {mutation.data.root_causes.map((rc: RootCause, index: number) => (
            <div
              key={index}
              className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {rc.description}
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">확신도:</span>{' '}
                {(rc.confidence_score * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">관련 KPI:</span>{' '}
                {rc.evidence_kpis.join(', ')}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">근거:</span> {rc.reasoning}
              </p>
              {rc.suggested_actions && rc.suggested_actions.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium text-gray-800 mb-1">제안 조치:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {rc.suggested_actions.map((action: string, i: number) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueAnalysisPage;
