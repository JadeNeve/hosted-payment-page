import { useMutation } from '@tanstack/react-query';
import type { CreateQuotePayload, QuoteResponse } from '../types';
import api from '../lib/api';

export const useCreateQuote = () =>
  useMutation({
    mutationFn: async (payload: CreateQuotePayload): Promise<QuoteResponse> => {
      const { data } = await api.post(`/pay/summary`, payload);
      return data;
    },
  });
