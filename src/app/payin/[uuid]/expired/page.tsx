'use client';

import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import ErrorIcon from '@/assets/error-icon.svg';

export default function ExpiredPage() {

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#EBEDF3] p-6">
      <Card className="w-full max-w-md bg-white shadow-none text-center border-0">
        <CardHeader className="flex flex-col items-center">
          <Image src={ErrorIcon} alt="Expired Icon" width={60} height={60} />
        </CardHeader>

        <CardContent>
          <CardTitle className="text-lg text-[#0A1628]-600 mb-1">Payment details expired</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            The payment details for your transaction have expired.
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
}
