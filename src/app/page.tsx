'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateQuote } from '@/hooks/useCreateQuote';
import { generateRandomId } from '@/lib/generateRandomId';
import { ENV } from '@/config/env';

export default function Home() {
  const router = useRouter();
  const { mutate: createQuote } = useCreateQuote();

  useEffect(() => {
  console.log("Firing createQuote");

  const reference = `Ref${generateRandomId(6)}`;

  createQuote(
    {
      merchantId: ENV.MERCHANT_ID,
      type: 'IN',
      amount: 200,
      currency: 'ZAR',
      expiryMinutes: 1,
      reference,
      customerId: '123',
      complianceDetails: {
        requesterIpAddress: '127.0.0.1',
        partyDetails: [
          {
            type: 'ORIGINATOR',
            entityType: 'INDIVIDUAL',
            relationshipType: 'SELF_OWNED',
            firstName: 'firstName',
            middleName: 'middleName',
            lastName: 'lastName',
            dateOfBirth: '1983-03-28',
          },
        ],
      },
    },
    {
      onSuccess: (data) => {
        console.log('Redirecting to: ', `/payin/${data.uuid}`);
        router.push(`/payin/${data.uuid}`);
      },
      onError: (err) => {
        console.error('Error creating quote:', err);
      },
    }
  );
}, [createQuote, router]);

  return null;
}
