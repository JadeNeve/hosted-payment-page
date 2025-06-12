import { useEffect, useState } from 'react';

interface CountdownResult {
  formatted: string;
  isComplete: boolean;
}

interface UseCountdownProps {
  expiry?: number | null;
  onExpire?: () => void;
}

export const useCountdown = ({
  expiry,
  onExpire,
}: UseCountdownProps): CountdownResult => {
  const [remaining, setRemaining] = useState<number>(
    expiry ? Math.max(0, Math.floor((expiry - Date.now()) / 1000)) : 0
  );

  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      const seconds = Math.floor((expiry - Date.now()) / 1000);
      setRemaining(() => {
        const next = Math.max(0, seconds);
        if (next <= 0) {
          clearInterval(interval);
          onExpire?.();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry, onExpire]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');

  return {
    formatted: `${minutes}:${seconds}`,
    isComplete: remaining <= 0,
  };
};
