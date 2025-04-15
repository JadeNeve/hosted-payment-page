import { useQuery } from '@tanstack/react-query';
import { getQuoteSummary } from '@/services/paymentService';
import { QuoteSummary } from '@/types/payment';

export const useGetQuote = (uuid: string) => {
  return useQuery<QuoteSummary>({
    queryKey: ['quote', uuid],
    queryFn: () => getQuoteSummary(uuid),
    enabled: !!uuid,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    retry: 1,
  });
};
