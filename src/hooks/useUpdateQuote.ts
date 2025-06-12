import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import type { UpdateQuotePayload } from '../types';

type Params = {
  uuid: string;
  payload: UpdateQuotePayload;
};

export const useUpdateQuote = () =>
  useMutation({
    mutationFn: async ({ uuid, payload }: Params) => {
      const { data } = await api.put(`/pay/${uuid}/update/summary`, payload);
      return data;
    },
  });
