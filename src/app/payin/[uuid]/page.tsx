
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetQuote } from '@/hooks/useGetQuote';
import { useUpdateQuote } from '@/hooks/useUpdateQuote';
import { useAcceptQuote } from '@/hooks/useAcceptQuote';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';

export default function AcceptQuotePage() {
  const { uuid } = useParams() as { uuid: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);

  const { data: quote, isLoading, isError } = useGetQuote(uuid);
  const { mutate: updateCurrency } = useUpdateQuote(uuid);
  const { mutate: acceptQuote, isPending: isAccepting } = useAcceptQuote(uuid);

  // Auto-refresh quote using react-query
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['quote', uuid] });
    }, 30000); // every 30s
    return () => clearInterval(interval);
  }, [uuid, queryClient]);

  // Countdown timer
  useEffect(() => {
    if (!quote?.acceptanceExpiryDate) return;
    const expiry = quote.acceptanceExpiryDate;
    const timer = setInterval(() => {
      const diff = expiry - Date.now();
      if (diff <= 0) {
        router.push(`/payin/${uuid}/expired`);
      } else {
        setCountdown(diff);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [quote?.acceptanceExpiryDate, router, uuid]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    updateCurrency({ currency: currency as 'BTC' | 'ETH' | 'LTC', payInMethod: 'crypto' });
  };

  const handleAcceptQuote = () => {
    acceptQuote({ successUrl: 'no_url' });
  };

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  if (isLoading) return <div className="p-4 text-sm">Loading quote...</div>;
  if (isError || !quote) return <div className="p-4 text-red-500">Failed to load quote.</div>;
  if (quote.status === 'EXPIRED') {
    router.push(`/payin/${uuid}/expired`);
    return null;
  }
  if (quote.quoteStatus === 'ACCEPTED') {
    router.push(`/payin/${uuid}/pay`);
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow">
        <h1 className="text-lg font-semibold mb-2">Accept Quote</h1>
        <p className="text-sm font-medium text-muted-foreground mb-4">{quote.merchantDisplayName}</p>

        <div className="text-3xl font-bold mb-1">
          {quote.displayCurrency.amount.toFixed(2)} {quote.displayCurrency.currency}
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          For reference number: <strong>{quote.reference}</strong>
        </p>

        <label className="text-sm mb-1 block">Pay with</label>
        <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTC">Bitcoin</SelectItem>
            <SelectItem value="ETH">Ethereum</SelectItem>
            <SelectItem value="LTC">Litecoin</SelectItem>
          </SelectContent>
        </Select>

        {quote.paidCurrency?.currency && (
          <div className="mb-4 text-sm">
            <div>
              <strong>Amount due:</strong> {quote.paidCurrency.amount.toFixed(8)} {quote.paidCurrency.currency}
            </div>
            {countdown !== null && (
              <div>
                <strong>Quoted price expires in:</strong> {formatTime(countdown)}
              </div>
            )}
          </div>
        )}

        <Button
          disabled={!selectedCurrency || isAccepting}
          onClick={handleAcceptQuote}
          className="w-full"
        >
          {isAccepting ? 'Confirming...' : 'Confirm'}
        </Button>
      </div>
    </main>
  );
}
