import { z } from 'zod';

const EnvSchema = z.object({
  API_URL: z.string().url(),
  HAWK_ID: z.string().min(1, 'HAWK_ID is required'),
  HAWK_KEY: z.string().min(1, 'HAWK_KEY is required'),
  MERCHANT_ID: z.string().min(1, 'MERCHANT_ID is required'),
});

const rawEnv = Object.entries(import.meta.env).reduce<Record<string, string>>(
  (acc, [key, value]) => {
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  },
  {}
);

const parsed = EnvSchema.safeParse(rawEnv);

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${Object.entries(parsed.error.flatten().fieldErrors)
      .map(([k, v]) => `- ${k}: ${v?.join(', ')}`)
      .join('\n')}`
  );
}

export const env = parsed.data;
