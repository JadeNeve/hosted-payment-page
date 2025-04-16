export const ENV = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    HAWK_AUTH_ID: process.env.NEXT_PUBLIC_HAWK_AUTH_ID || '',
    HAWK_AUTH_KEY: process.env.NEXT_PUBLIC_HAWK_AUTH_KEY || '',
    MERCHANT_ID: process.env.NEXT_PUBLIC_MERCHANT_ID || '',
  };
  
  if (!ENV.API_BASE_URL) throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
  if (!ENV.HAWK_AUTH_ID) throw new Error('Missing NEXT_PUBLIC_HAWK_AUTH_ID');
  if (!ENV.HAWK_AUTH_KEY) throw new Error('Missing NEXT_PUBLIC_HAWK_AUTH_KEY');
  if (!ENV.MERCHANT_ID) throw new Error('Missing NEXT_PUBLIC_MERCHANT_ID');
  