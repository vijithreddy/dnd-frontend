// app/page.tsx
'use client';

import { WalletBanner } from './components/WalletBanner';
import NFTGallery from './components/NFTGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <WalletBanner />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <NFTGallery />
      </div>
    </main>
  );
}