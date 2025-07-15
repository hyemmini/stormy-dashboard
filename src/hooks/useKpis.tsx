import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAllKpis, KpiData } from '../api/kpi';

/**
 * KPI 목록을 불러오는 커스텀 훅입니다.
 * @returns KPI 데이터, 로딩/에러 상태 등 (react-query의 UseQueryResult)
 * @example
 *   const { data: kpis, isLoading, error } = useKpis();
 */
export const useKpis = (): UseQueryResult<KpiData[], unknown> => {
  return useQuery<KpiData[], unknown>({
    queryKey: ['kpis'],
    queryFn: fetchAllKpis,
    staleTime: 5000,
  });
};
