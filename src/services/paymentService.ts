import axios from 'axios';
import { QuoteSummary, UpdateQuotePayload, AcceptQuotePayload } from '@/types/payment';
import { ENV } from '@/config/env';

const API_BASE_URL = ENV.API_BASE_URL;

console.log('BASE_URL:', ENV.API_BASE_URL);


export const getQuoteSummary = async (uuid: string): Promise<QuoteSummary> => {
  const { data } = await axios.get(`${API_BASE_URL}/pay/${uuid}/summary`);
  return data;
};

export const updateQuoteSummary = async (
  uuid: string,
  payload: UpdateQuotePayload
): Promise<QuoteSummary> => {
  const { data } = await axios.put(`${API_BASE_URL}/pay/${uuid}/update/summary`, payload);
  return data;
};

export const acceptQuote = async (
  uuid: string,
  payload: AcceptQuotePayload
): Promise<QuoteSummary> => {
  const { data } = await axios.put(`${API_BASE_URL}/pay/${uuid}/accept/summary`, payload);
  return data;
};
