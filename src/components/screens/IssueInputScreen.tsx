import React, { useState, useEffect } from 'react';
import { Info, AlertCircle, Send, ArrowLeft, Loader2 } from 'lucide-react';
import kpiDefinitions from '../../data/kpiDefinitions';

interface KpiDefinition {
  id: string;
  name: string;
  description: string;
}

interface RootCause {
  description: string;
  confidence_score: number;
  evidence_kpis: string[];
  reasoning: string;
}

interface AnalysisResult {
  analysis_id: string;
  status: 'success' | 'failure';
  root_causes: RootCause[];
  timestamp: string;
}

interface IssueInputScreenProps {
  onBack: () => void;
}

const IssueInputScreen: React.FC<IssueInputScreenProps> = ({ onBack }) => {
  const [issueDescription, setIssueDescription] = useState('');
  const [recommendedKpis, setRecommendedKpis] = useState<string[]>([]);
  const [selectedKpis, setSelectedKpis] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (issueDescription.length > 10) {
      const lowerDesc = issueDescription.toLowerCase();
      const recommendations = kpiDefinitions
        .filter(
          (kpi) =>
            lowerDesc.includes(kpi.name.toLowerCase()) ||
            lowerDesc.includes(kpi.id.toLowerCase()),
        )
        .map((kpi) => kpi.id);
      setRecommendedKpis(recommendations.slice(0, 5));
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

  const handleAnalyze = async () => {
    if (!issueDescription || selectedKpis.length === 0) {
      alert('이슈 설명과 관련 KPI를 선택해주세요.');
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsLoading(false);
      setAnalysisResult({
        analysis_id: 'mock_rc_001',
        status: 'success',
        root_causes: [
          {
            description: '설비 노후화로 인한 성능 저하',
            confidence_score: 0.85,
            evidence_kpis: ['OEE', 'defectRate'],
            reasoning:
              'OEE 감소 및 불량률 증가 패턴이 설비 성능 저하와 일치합니다.',
          },
        ],
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:underline font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> 대시보드로 돌아가기
      </button>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertCircle className="w-6 h-6 mr-3 text-red-600" /> 제조 이슈 등록
          및 근본 원인 분석
        </h2>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="issue-description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              1. 이슈 설명
            </label>
            <textarea
              id="issue-description"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="예: 3번 라인에서 생산된 제품의 불량률이 최근 2주간 5% 증가했습니다."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              2. 관련 KPI 선택
            </h3>
            <div className="p-4 bg-gray-50 rounded-md">
              {recommendedKpis.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    추천 KPI:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recommendedKpis.map((kpiId) => (
                      <button
                        key={`rec-${kpiId}`}
                        onClick={() => handleKpiSelect(kpiId)}
                        className={`px-2 py-1 text-xs rounded-full ${selectedKpis.includes(kpiId) ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {kpiDefinitions.find((k) => k.id === kpiId)?.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {kpiDefinitions.map((kpi) => (
                  <button
                    key={kpi.id}
                    onClick={() => handleKpiSelect(kpi.id)}
                    className={`px-3 py-1.5 text-sm rounded-md ${selectedKpis.includes(kpi.id) ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {kpi.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isLoading ? (
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              ) : (
                <Send className="-ml-1 mr-3 h-5 w-5" />
              )}
              {isLoading ? '분석 중...' : '근본 원인 분석'}
            </button>
          </div>
        </div>

        {analysisResult && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-bold text-green-800 mb-3">분석 결과</h3>
            {analysisResult.root_causes.map((cause, index) => (
              <div
                key={index}
                className="mb-2 p-3 bg-white rounded-md shadow-sm"
              >
                <p className="font-semibold text-gray-800">
                  - {cause.description}
                </p>
                <p className="text-sm text-gray-600">
                  신뢰도: {(cause.confidence_score * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">
                  근거 KPI: {cause.evidence_kpis.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueInputScreen;
