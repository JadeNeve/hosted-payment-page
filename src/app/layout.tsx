import '../styles/globals.css';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
