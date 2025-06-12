import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import type { AcceptQuotePayload } from '../types';

type Params = {
  uuid: string;
  payload: AcceptQuotePayload;
};

export const useAcceptQuote = () =>
  useMutation({
    mutationFn: async ({ uuid, payload }: Params) => {
      const { data } = await api.put(`/pay/${uuid}/accept/summary`, payload);
      return data;
    },
  });
