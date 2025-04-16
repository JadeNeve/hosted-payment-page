'use client';

import { useEffect, useState } from 'react';

export function useCountdown(expiryTimestamp?: number | null, onExpire?: () => void): string {
  const [timeLeft, setTimeLeft] = useState<string>('00:00');

  useEffect(() => {
    if (!expiryTimestamp) return;

    const tick = () => {
      const diff = expiryTimestamp - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft('00:00');
        onExpire?.();
        return;
      }

      const total = Math.floor(diff / 1000);
      const min = String(Math.floor(total / 60)).padStart(2, '0');
      const sec = String(total % 60).padStart(2, '0');
      setTimeLeft(`${min}:${sec}`);
    };

    tick(); // run immediately
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp, onExpire]);

  return timeLeft;
}
