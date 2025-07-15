import { useMutation } from '@tanstack/react-query';

import { analyzeIssue } from '../api/kpi';

export const useAnalyzeIssue = () => {
  return useMutation({
    mutationFn: analyzeIssue,
  });
};
