'use client';

import '@coinbase/onchainkit/styles.css';
import './globals.css';
import { Providers } from './providers';
import { MedievalSharp } from 'next/font/google';

const medievalFont = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-medieval',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Providers>
          <div className="pt-16">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
