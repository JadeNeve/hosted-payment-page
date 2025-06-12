import axios from 'axios';
import { generateHawkHeader } from './hawk';
import { env } from '../config/env';

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() || 'GET';
  const fullUrl = `${env.API_URL}${config.url}`;

  const hawkHeader = generateHawkHeader(fullUrl, method);

  config.headers['Authorization'] = hawkHeader;

  return config;
});

export default api;
