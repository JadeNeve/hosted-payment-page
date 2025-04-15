'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // You can replace this with a dynamic UUID from somewhere if needed
    router.push('/payin/');
  }, [router]);

  return null;
}
