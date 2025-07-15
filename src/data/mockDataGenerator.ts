import kpiDefinitions, { KpiDefinition } from './kpiDefinitions';

export interface KpiHistoryPoint {
  date: string;
  value: number;
}

// 목(mock) 데이터 생성 함수
export const generateMockHistory = (
  kpiId: string,
  days: number = 30,
): KpiHistoryPoint[] => {
  const history: KpiHistoryPoint[] = [];
  const definition = kpiDefinitions.find((d: KpiDefinition) => d.id === kpiId);
  if (!definition) return [];

  let startValue: number;
  switch (kpiId) {
    case 'OEE':
    case 'OLE':
    case 'onTimeDeliveryRate':
      startValue = 80 + Math.random() * 10; // 높은 값
      break;
    case 'employeeSatisfaction':
      startValue = 3.5 + Math.random(); // 5점 척도
      break;
    case 'defectRate':
    case 'manufacturingCostRatio':
    case 'safetyAccidentRate':
      startValue = 2 + Math.random() * 3; // 낮은 값
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
    // 약간의 변동성 추가
    let value = startValue + (Math.random() - 0.5) * (startValue * 0.05);

    // 일부 KPI에 대해 최근 추세 변경 시뮬레이션
    if (i > days - 7) {
      // 마지막 7일
      if (
        kpiId === 'defectRate' ||
        kpiId === 'processCycleTime' ||
        kpiId === 'safetyAccidentRate'
      ) {
        value += Math.random() * (startValue * 0.1); // 증가 시뮬레이션
      } else if (
        kpiId === 'OEE' ||
        kpiId === 'OLE' ||
        kpiId === 'productionVolume'
      ) {
        value -= Math.random() * (startValue * 0.1); // 감소 시뮬레이션
      }
    }

    history.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(1)),
    });
  }
  return history;
};
