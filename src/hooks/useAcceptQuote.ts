import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { acceptQuote } from '@/services/paymentService';
import { AcceptQuotePayload, QuoteSummary } from '@/types/payment';

export const useAcceptQuote = (uuid: string) => {
  const router = useRouter();

  return useMutation<QuoteSummary, Error, AcceptQuotePayload>({
    mutationFn: (payload) => acceptQuote(uuid, payload),
    onSuccess: (data) => {
      console.log('AcceptQuote success response:', data);
      if (data.status === 'PENDING' && data.quoteStatus === 'ACCEPTED') {
        router.push(`/payin/${uuid}/pay`);
      }
    }
  });
};
