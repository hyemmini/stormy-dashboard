import { kpiDefinitions, KpiDefinition } from '../constants/kpi';

export type KpiStatus = 'Normal' | 'Warning' | 'Critical';
export type KpiTrend = 'up' | 'down' | 'stable';

export interface KpiHistoryPoint {
  date: string;
  value: number;
}

export interface KpiData extends KpiDefinition {
  currentValue: number;
  status: KpiStatus;
  trend: KpiTrend;
  history: KpiHistoryPoint[];
}

export interface AnalysisPayload {
  issueDescription: string;
  selectedKpis: string[];
  kpiDataInput?: string;
  context?: Record<string, unknown>;
}

export interface RootCause {
  id: string;
  description: string;
  confidence_score: number;
  evidence_kpis: string[];
  reasoning: string;
  suggested_actions: string[];
}

export interface AnalysisResult {
  issueDescription: string;
  rootCauses: RootCause[];
}

// --- Helper Functions (Internal to this mock API) ---

const generateMockHistory = (
  kpiId: string,
  days: number = 30,
): KpiHistoryPoint[] => {
  const history: KpiHistoryPoint[] = [];
  const definition = kpiDefinitions.find((d) => d.id === kpiId);
  if (!definition) return [];

  let startValue: number;
  switch (kpiId) {
    case 'OEE':
    case 'OLE':
    case 'onTimeDeliveryRate':
    case 'employeeSatisfaction':
      startValue = 80 + Math.random() * 10;
      break;
    case 'defectRate':
    case 'manufacturingCostRatio':
    case 'safetyAccidentRate':
      startValue = 2 + Math.random() * 3;
      break;
    case 'productionVolume':
    case 'throughput':
      startValue = 1000 + Math.random() * 500;
      break;
    case 'processCycleTime':
      startValue = 60 + Math.random() * 20;
      break;
    case 'inventoryTurnover':
      startValue = 5 + Math.random() * 2;
      break;
    default:
      startValue = 50 + Math.random() * 50;
  }

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    let value = startValue + (Math.random() - 0.5) * (startValue * 0.05);

    if (i > days - 7) {
      if (
        ['defectRate', 'processCycleTime', 'safetyAccidentRate'].includes(kpiId)
      ) {
        value += Math.random() * 5;
      } else if (['OEE', 'OLE', 'productionVolume'].includes(kpiId)) {
        value -= Math.random() * 5;
      }
    }

    history.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(1)),
    });
  }
  return history;
};

const getKpiStatus = (kpiId: string, value: number): KpiStatus => {
  switch (kpiId) {
    case 'OEE':
    case 'OLE':
    case 'onTimeDeliveryRate':
    case 'employeeSatisfaction':
      if (value >= 90) return 'Normal';
      if (value >= 80) return 'Warning';
      return 'Critical';
    case 'defectRate':
    case 'manufacturingCostRatio':
    case 'safetyAccidentRate':
    case 'processCycleTime':
      if (value <= 2) return 'Normal';
      if (value <= 5) return 'Warning';
      return 'Critical';
    case 'productionVolume':
    case 'throughput':
    case 'inventoryTurnover':
      if (value >= 1000 || value >= 5) return 'Normal';
      if (value >= 800 || value >= 3) return 'Warning';
      return 'Critical';
    default:
      return 'Normal';
  }
};

const getKpiTrend = (history: KpiHistoryPoint[], kpiId: string): KpiTrend => {
  if (history.length < 2) return 'stable';
  const latest = history[history.length - 1].value;
  const previous = history[history.length - 2].value;

  const definition = kpiDefinitions.find((d) => d.id === kpiId);
  if (!definition) return 'stable';

  // Lower is better
  if (
    [
      'defectRate',
      'manufacturingCostRatio',
      'safetyAccidentRate',
      'processCycleTime',
    ].includes(definition.id)
  ) {
    if (latest < previous) return 'up'; // Improving
    if (latest > previous) return 'down'; // Worsening
    return 'stable';
  } else {
    // Higher is better
    if (latest > previous) return 'up'; // Improving
    if (latest < previous) return 'down'; // Worsening
    return 'stable';
  }
};

// --- Exported API Functions ---

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

let kpiCache: KpiData[] | null = null;

const generateAllKpiData = (): KpiData[] => {
  if (kpiCache) {
    return kpiCache;
  }

  kpiCache = kpiDefinitions.map((definition): KpiData => {
    const history = generateMockHistory(definition.id);
    const currentValue =
      history.length > 0 ? history[history.length - 1].value : 0;
    const status = getKpiStatus(definition.id, currentValue);
    const trend = getKpiTrend(history, definition.id);

    return {
      ...definition,
      currentValue,
      status,
      trend,
      history,
    };
  });

  return kpiCache;
};

export const fetchAllKpis = async (): Promise<KpiData[]> => {
  await sleep(500);
  return generateAllKpiData();
};

export const fetchKpiById = (
  kpiId: string,
  options?: { onLog?: (msg: string, data?: unknown) => void },
): Promise<KpiData> => {
  const history = generateMockHistory(kpiId);
  if (options?.onLog) options.onLog(`Fetching KPI with ID: ${kpiId}`);
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const definition = kpiDefinitions.find((d) => d.id === kpiId);

        if (!definition) {
          throw new Error(`KPI with ID ${kpiId} not found.`);
        }

        const currentValue = history[history.length - 1].value;
        const status = getKpiStatus(kpiId, currentValue);
        const trend = getKpiTrend(history, kpiId);

        const kpiData: KpiData = {
          ...definition,
          currentValue,
          status,
          trend,
          history,
        };

        if (options?.onLog)
          options.onLog(`Successfully fetched KPI data for ${kpiId}:`, kpiData);
        resolve(kpiData);
      },
      500 + Math.random() * 500,
    ); // Simulate network delay
  });
};

export const analyzeIssue = async (
  payload: AnalysisPayload,
): Promise<AnalysisResult> => {
  await sleep(2000);

  const { issueDescription, selectedKpis } = payload;

  const rootCauses: RootCause[] = [
    {
      id: 'rc-1',
      description: '최근 도입된 신규 설비의 초기 안정화 문제',
      confidence_score: 0.75,
      evidence_kpis: selectedKpis.filter((kpi) =>
        ['OEE', 'defectRate'].includes(kpi),
      ),
      reasoning: `신규 설비 도입 시점과 불량률 급증 시점이 일치합니다. OEE 하락은 설비 성능 저하를 의미하며, 이는 초기 운영 미숙 또는 설비 결함일 수 있습니다.`,
      suggested_actions: [
        '신규 설비 제조업체와 긴급 기술 미팅 진행',
        '해당 설비 운영 메뉴얼 및 절차 재검토',
        '숙련된 작업자를 신규 설비에 집중 배치하여 집중 관리',
      ],
    },
    {
      id: 'rc-2',
      description: '작업자 교대 후 불량률 증가',
      confidence_score: 0.65,
      evidence_kpis: selectedKpis.filter((kpi) =>
        ['defectRate', 'OLE'].includes(kpi),
      ),
      reasoning: `작업자 교대 후 불량률이 증가했다면, 신규 또는 비숙련 작업자의 실수율 증가가 원인일 수 있습니다. OLE 지표가 있다면 함께 분석해야 합니다.`,
      suggested_actions: [
        '교대 조별 불량률 데이터 비교 분석',
        '신규 배치 작업자 대상 추가 현장 교육(OJT) 실시',
        '핵심 공정에 대한 표준 작업 절차서(SOP) 재교육',
      ],
    },
  ];

  return { issueDescription, rootCauses };
};
