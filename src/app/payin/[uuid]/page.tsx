'use client';

import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '@/components/ui/card';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetQuote } from '@/hooks/useGetQuote';
import { useUpdateQuote } from '@/hooks/useUpdateQuote';
import { useAcceptQuote } from '@/hooks/useAcceptQuote';
import { useCountdown } from '@/hooks/useCountDown';

export default function AcceptQuotePage() {
  const { uuid } = useParams() as { uuid: string };
  const queryClient = useQueryClient();
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const { data: quote, isLoading } = useGetQuote(uuid);
  const { mutate: updateCurrency } = useUpdateQuote(uuid);
  const { mutate: acceptQuote, isPending: isAccepting } = useAcceptQuote(uuid);

  const countdown = useCountdown(quote?.acceptanceExpiryDate, () => {
    queryClient.invalidateQueries({ queryKey: ['quote', uuid] });
  });

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    updateCurrency({ currency: currency as 'BTC' | 'ETH' | 'LTC', payInMethod: 'crypto' });
  };

  const handleAccept = () => {
    acceptQuote({ successUrl: 'no_url' });
  };

  return (
    <main className="min-h-screen bg-[#EBEDF3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-none rounded-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Accept Quote</CardTitle>
          {isLoading ? (
            <>
              <Skeleton className="h-5 w-32 mx-auto mt-2" />
              <Skeleton className="h-7 w-40 mx-auto mt-2" />
              <Skeleton className="h-4 w-44 mx-auto mt-1" />
            </>
          ) : (
            <>
              <CardDescription className="text-sm text-muted-foreground">
                {quote?.merchantDisplayName}
              </CardDescription>
              <p className="text-3xl font-bold mt-1">
                {quote?.displayCurrency.amount.toFixed(2)} {quote?.displayCurrency.currency}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                For reference number: <strong>{quote?.reference}</strong>
              </p>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4 px-4 py-3">
          <div className="text-sm">
            <label htmlFor="currency-select" className="block mb-2">Pay with</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-sm" />
            ) : (
              <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                <SelectTrigger id="currency-select" className="w-full px-3 py-6 rounded-sm border text-sm">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  {['BTC', 'ETH', 'LTC'].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedCurrency && (
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-muted-foreground">Amount due</span>
                <span className="text-sm font-semibold">
                  {quote?.paidCurrency?.amount.toFixed(8)} {quote?.paidCurrency?.currency}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-muted-foreground">Quoted price expires in</span>
                <span className="text-sm font-semibold">{countdown}</span>
              </div>
            </div>
          )}
        </CardContent>

        {selectedCurrency && (
          <CardFooter>
            <Button
              className="w-full bg-[#3F53DD] hover:bg-[#3248C7] rounded-sm"
              disabled={isAccepting}
              onClick={handleAccept}
            >
              {isAccepting ? 'Confirming...' : 'Confirm'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
