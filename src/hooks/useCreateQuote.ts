import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ENV } from '@/config/env';
import { generateHawkHeader } from '@/lib/generateHawkHeader';

interface CreateQuotePayload {
  merchantId: string;
  type: 'IN';
  amount: number;
  currency: string;
  expiryMinutes: number;
  reference: string;
  customerId: string;
  complianceDetails: {
    requesterIpAddress: string;
    partyDetails: {
      type: string;
      entityType: string;
      relationshipType: string;
      firstName: string;
      middleName: string;
      lastName: string;
      dateOfBirth: string;
    }[];
  };
}

interface QuoteResponse {
  uuid: string;
}

export const useCreateQuote = () => {
  return useMutation<QuoteResponse, unknown, CreateQuotePayload>({
    mutationFn: async (payload) => {
      const url = `${ENV.API_BASE_URL}/pay/summary`;
      const authHeader = generateHawkHeader(url, 'POST');

      const response = await api.post('/pay/summary', payload, {
        headers: {
          Authorization: authHeader,
        },
      });

      return response.data;
    },
  });
};
