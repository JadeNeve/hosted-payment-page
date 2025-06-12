import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { QuoteSummary } from '../types';

export const useQuoteSummary = (uuid: string) => {
  return useQuery<QuoteSummary>({
    queryKey: ['quote-summary', uuid],
    queryFn: async () => {
      const { data } = await api.get(`/pay/${uuid}/summary`);
      return data;
    },
    refetchInterval: 30000,
  });
};
