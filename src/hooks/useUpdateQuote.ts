import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuoteSummary } from '@/services/paymentService';
import { UpdateQuotePayload, QuoteSummary } from '@/types/payment';

export const useUpdateQuote = (uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation<QuoteSummary, Error, UpdateQuotePayload>({
    mutationFn: (payload) => updateQuoteSummary(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quote', uuid] });
    },
  });
};
