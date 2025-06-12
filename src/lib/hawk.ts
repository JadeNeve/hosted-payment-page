import hawk from 'hawk';
import { env } from '../config/env';

export const generateHawkHeader = (url: string, method: string): string => {
  const credentials = {
    id: env.HAWK_ID,
    key: env.HAWK_KEY,
    algorithm: 'sha256' as const,
  };

  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.random().toString(36).substring(2);

  const { header } = hawk.client.header(url, method, {
    credentials,
    timestamp,
    nonce,
  });
  
  return header;
};
