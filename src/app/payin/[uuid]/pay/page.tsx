'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetQuote } from '@/hooks/useGetQuote';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const formatTime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

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
        clearInterval(timer);
        router.push(`/payin/${uuid}/expired`);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quote?.expiryDate, router, uuid]);

  useEffect(() => {
    if (quote?.status === 'EXPIRED') {
      router.push(`/payin/${uuid}/expired`);
    }
  }, [quote?.status, router, uuid]);

  if (isError) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#EBEDF3] p-6">
        <p className="text-red-500 text-sm">Failed to load quote.</p>
      </main>
    );
  }

  if (!quote) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#EBEDF3] p-6">
        <Skeleton className="h-40 w-40" />
      </main>
    );
  }

  const amount = `${quote.paidCurrency.amount.toFixed(8)} ${quote.paidCurrency.currency}`;
  const address = quote.address?.address || 'N/A';
  const shortAddress = address.length > 12 ? `${address.slice(0, 10)}...` : address;
  const qrUri = quote.address?.uri;

  return (
    <main className="min-h-screen bg-[#EBEDF3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-none border-0">
        <CardHeader className="text-center">
          <CardTitle>Pay with {quote.paidCurrency.currency}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            To complete this payment, send the amount due to the address provided below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">

          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount due</span>
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span className="font-semibold">
                {amount}{' '}
                <button
                  type="button"
                  onClick={() => copyToClipboard(amount)}
                  className="text-primary underline ml-2"
                >
                  Copy
                </button>
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">BTC address</span>
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <span className="font-semibold truncate max-w-[150px]">
                {shortAddress}{' '}
                <button
                  type="button"
                  onClick={() => copyToClipboard(address)}
                  className="text-primary underline ml-2"
                >
                  Copy
                </button>
              </span>
            )}
          </div>

          {qrUri ? (
            <div className="flex flex-col items-center justify-center py-4">
              <QRCode value={qrUri} size={160} />
              <p className="text-xs text-muted-foreground mt-2 text-center break-all">{address}</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground text-sm">
              <Skeleton className="h-40 w-40 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto mt-2" />
            </div>
          )}

          {timeLeft !== null && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time left to pay</span>
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}