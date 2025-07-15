// KPI 정의 배열

export interface KpiDefinition {
  id: string;
  name: string;
  unit: string;
  category: string;
  type: 'machine' | 'human' | 'process';
  description: string;
  measurementFormula: string;
  importance: string;
}

const kpiDefinitions: KpiDefinition[] = [
  {
    id: 'OEE',
    name: '설비 종합 효율 (OEE)',
    unit: '%',
    category: '생산성',
    type: 'machine',
    description: '설비의 가동률, 성능, 품질을 종합적으로 평가',
    measurementFormula: '가동률 × 성능율 × 양품율',
    importance: '설비 생산성 및 효율성 종합 평가, 6대 손실 파악 및 개선 핵심',
  },
  {
    id: 'OLE',
    name: '노력 종합 효율 (OLE)',
    unit: '%',
    category: '생산성',
    type: 'human',
    description: '노력의 가용성, 성능, 품질을 종합적으로 평가',
    measurementFormula: '가용성 × 성능 × 품질',
    importance: '노력 활용의 효율성 및 생산 기여도 평가',
  },
  {
    id: 'productionVolume',
    name: '생산량',
    unit: '개',
    category: '생산성',
    type: 'process',
    description: '특정 기간 동안 생산된 제품의 총 수량',
    measurementFormula: '생산된 제품 총 수량',
    importance: '생산 능력 및 목표 달성률 파악',
  },
  {
    id: 'throughput',
    name: '처리량',
    unit: '개/시간',
    category: '생산성',
    type: 'process',
    description: '단위 시간당 생산 라인을 완료하여 나오는 제품의 수량',
    measurementFormula: '총 생산량 / 총 가동 시간',
    importance: '생산 라인의 최대 생산 능력 및 병목 현상 파악',
  },
  {
    id: 'processCycleTime',
    name: '공정 사이클 타임',
    unit: '분',
    category: '생산성',
    type: 'process',
    description: '단일 제품을 제조하는 데 걸리는 총 시간',
    measurementFormula: '(공정 완료 시간 - 공정 시작 시간)',
    importance: '생산 공정의 효율성 및 속도 측정',
  },
  {
    id: 'defectRate',
    name: '불량률',
    unit: '%',
    category: '품질',
    type: 'process',
    description: '총 생산품 중 불량품이 차지하는 비율',
    measurementFormula: '(불량품 수량 / 총 생산 수량) × 100%',
    importance: '제품 품질 수준 파악 및 품질 문제 근본 원인 식별',
  },
  {
    id: 'manufacturingCostRatio',
    name: '제조 원가율',
    unit: '%',
    category: '비용',
    type: 'process',
    description: '제품 제조 원가를 매출액으로 나눈 비율',
    measurementFormula: '(제조원가 / 매출액) × 100%',
    importance: '원가 절감 목표 설정 및 평가의 핵심 지표',
  },
  {
    id: 'onTimeDeliveryRate',
    name: '납기 준수율',
    unit: '%',
    category: '납기',
    type: 'process',
    description: '약속한 기한 내에 제품이 배송된 비율',
    measurementFormula: '(제때 배송된 주문 수 / 전체 주문 수) × 100%',
    importance: '고객 만족도 및 기업 신뢰도에 직접적인 영향',
  },
  {
    id: 'inventoryTurnover',
    name: '재고 회전율',
    unit: '회',
    category: '재고',
    type: 'process',
    description: '특정 기간 동안 재고가 판매되고 교체된 횟수',
    measurementFormula: '매출원가 / 평균 재고 금액',
    importance: '재고 관리 효율성 및 현금 흐름 파악',
  },
  {
    id: 'safetyAccidentRate',
    name: '안전 사고 발생률',
    unit: '%',
    category: '지속가능성',
    type: 'human',
    description: '안전 사고 발생 빈도',
    measurementFormula:
      '(총 사고 발생 건수 / 총 작업 시간 또는 총 근로자 수) × 100%',
    importance: '안전한 근무 환경 조성 및 기업 책임성 강화',
  },
  {
    id: 'employeeSatisfaction',
    name: '직원 만족도',
    unit: '점',
    category: '인력 관리',
    type: 'human',
    description: '직원의 직무 및 회사에 대한 만족 수준',
    measurementFormula: '직원 만족도 설문조사 점수 (예: 5점 척도 평균)',
    importance: '생산성, 이직률, 고객 만족도에 직접적인 영향',
  },
];

export default kpiDefinitions;
