// src/lib/generateHawkHeader.ts
import hawk from 'hawk';
import { Credentials } from 'hawk/lib/client';
import { ENV } from '@/config/env';

export function generateHawkHeader(url: string, method: string, payload?: Record<string, unknown>) {
  const credentials: Credentials = {
    id: ENV.HAWK_AUTH_ID,
    key: ENV.HAWK_AUTH_KEY,
    algorithm: 'sha256',
  };

  const header = hawk.client.header(url, method, {
    credentials,
    timestamp: Math.floor(Date.now() / 1000),
    nonce: Math.random().toString(36).substring(2),
    payload: payload ? JSON.stringify(payload) : undefined,
    contentType: payload ? 'application/json' : undefined,
  });

  return header.header;
}
