'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ExpiredPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md rounded-md bg-white p-6 text-center shadow">
        <h1 className="text-xl font-semibold mb-2 text-red-600">Quote Expired</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Unfortunately, this payment quote has expired. You can generate a new one to try again.
        </p>

        <Button onClick={() => router.push('/')}>Back to Home</Button>
      </div>
    </main>
  );
}
