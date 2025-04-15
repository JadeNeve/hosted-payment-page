
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetQuote } from '@/hooks/useGetQuote';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';

export default function PayQuotePage() {
  const { uuid } = useParams() as { uuid: string };
  const router = useRouter();
  const { data: quote, isLoading, isError } = useGetQuote(uuid);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!quote?.expiryDate) return;

    const expiry = quote.expiryDate;
    const timer = setInterval(() => {
      const diff = expiry - Date.now();
      if (diff <= 0) {
        router.push(`/payin/${uuid}/expired`);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quote?.expiryDate, router, uuid]);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  if (isLoading) return <div className="p-4 text-sm">Loading payment...</div>;
  if (isError || !quote) return <div className="p-4 text-red-500">Failed to load quote.</div>;
  if (quote.status === 'EXPIRED') {
    router.push(`/payin/${uuid}/expired`);
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow">
        <h1 className="text-lg font-semibold mb-4">
          Pay with {quote.paidCurrency.currency}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          To complete this payment send the amount due to the BTC address provided below.
        </p>

        <div className="text-sm mb-3">
          <div className="mb-2">
            <strong>Amount due:</strong>{' '}
            <span
              onClick={() => copyToClipboard(quote.paidCurrency.amount.toString())}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard(quote.paidCurrency.amount.toString())}
              tabIndex={0}
              role="button"
              className="cursor-pointer text-primary underline"
            >
              {quote.paidCurrency.amount.toFixed(8)} {quote.paidCurrency.currency} (Copy)
            </span>
          </div>

          <div className="mb-2">
            <strong>BTC address:</strong>{' '}
            <span
              onClick={() => copyToClipboard(quote.address?.address || '')}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard(quote.address?.address || '')}
              tabIndex={0}
              role="button"
              className="cursor-pointer text-primary underline"
            >
              {quote.address?.address || 'N/A'} (Copy)
            </span>
          </div>
        </div>

        {quote.address?.uri && (
          <div className="flex justify-center my-4">
            <QRCode value={quote.address.uri} size={160} />
          </div>
        )}

        {timeLeft !== null && (
          <div className="mb-4 text-sm">
            <strong>Time left to pay:</strong> {formatTime(timeLeft)}
          </div>
        )}

        <Button variant="outline" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </div>
    </main>
  );
}
