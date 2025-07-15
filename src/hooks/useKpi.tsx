import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchKpiById, KpiData } from '../api/kpi';

/**
 * 특정 ID의 KPI 상세 정보를 불러오는 커스텀 훅입니다.
 * @param kpiId - 조회할 KPI의 ID
 * @returns KPI 데이터, 로딩/에러 상태 등 (react-query의 UseQueryResult)
 * @example
 *   const { data: kpi, isLoading } = useKpi('some-kpi-id');
 */
export const useKpi = (
  kpiId: string | undefined,
): UseQueryResult<KpiData, Error> => {
  return useQuery<KpiData, Error>({
    queryKey: ['kpi', kpiId],
    queryFn: () => {
      if (!kpiId) {
        throw new Error('KPI ID is required');
      }
      return fetchKpiById(kpiId);
    },
    enabled: !!kpiId, // kpiId가 있을 때만 쿼리 실행
  });
};
