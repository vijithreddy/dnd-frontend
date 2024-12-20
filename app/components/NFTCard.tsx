// components/NFTCard.tsx

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NFTCardProps } from '../types/index';

export function NFTCard({ nft, isLoading, transactionLink, onClick }: NFTCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (imageError && retryCount < MAX_RETRIES) {
      const timer = setTimeout(() => {
        setImageError(false);
        setRetryCount(prev => prev + 1);
      }, 2000 * (retryCount + 1));

      return () => clearTimeout(timer);
    }
  }, [imageError, retryCount]);

  return (
    <div 
      onClick={onClick}
      className={`
        relative bg-gray-800/50 rounded-lg p-4 
        ${!isLoading ? 'cursor-pointer hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105' : ''}
      `}
    >
      <div className="relative aspect-square mb-4">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className={`object-cover transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
        <span className="absolute top-2 right-2 bg-amber-600/90 px-3 py-1 rounded-full text-sm">
          {nft.class}
        </span>
      </div>
      
      {/* Loading or Error States */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
        </div>
      )}
      
      {imageError && retryCount >= MAX_RETRIES && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <p className="text-amber-400 text-sm text-center px-4">
            Unable to load image
          </p>
        </div>
      )}

      <h3 className="text-xl font-medieval text-amber-400 mb-2">{nft.name}</h3>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        {nft.stats && Object.entries(nft.stats).map(([stat, value]) => (
          <div key={stat} className="bg-gray-800/50 p-2 rounded">
            <div className="text-amber-400/80 text-xs uppercase">{stat}</div>
            <div className="text-white font-bold">{value}</div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/30 rounded-lg flex flex-col items-center justify-center p-4">
          <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full mb-4" />
          {transactionLink && (
            <div className="text-center">
              <p className="text-gray-300 mb-2">Character being summoned...</p>
              <a 
                href={transactionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-400 hover:text-amber-300 underline"
                onClick={(e) => e.stopPropagation()}
              >
                View on BaseScan
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}