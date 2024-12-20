// components/gallery/NFTGallery.tsx
import { useState, useEffect } from 'react';
import { useNFTs } from '../hooks/useNFTs';
import { useCreateCharacter } from '../hooks/useCreateCharacter';
import { NFT } from '../types/index';
import { NFTModal } from './NFTModal';
import LoadingSpinner from './LoadingSpinner';
import { GalleryHeader } from './gallery/GalleryHeader';
import { EmptyGalleryState } from './gallery/EmptyGalleryState';
import { GalleryGrid } from './gallery/GalleryGrid';
import { CelebrationOverlay } from './gallery/CelebrationOverlay';
import { useAccount } from 'wagmi';

export default function NFTGallery() {
    const { address, isConnecting } = useAccount();
    const { data: nfts, isLoading, isError, error, isRefetching } = useNFTs();
    const {
      createCharacter,
      isCreating,
      pendingMint,
      setPendingMint,
      showCelebration
    } = useCreateCharacter();
    
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  
    // Effect to check for new NFTs and clear placeholder
    useEffect(() => {
      if (!pendingMint?.transactionHash || !nfts) return;
  
      // Get the current NFT count
      const currentNFTCount = nfts.length;
      
      // Store the NFT count when a mint starts
      const previousNFTCount = pendingMint.previousNFTCount ?? 0;
  
      // If we have more NFTs than before, we know the new one arrived
      if (currentNFTCount > previousNFTCount) {
        setPendingMint(null);
      }
    }, [nfts, pendingMint, setPendingMint]);
  
    // Create displayedNFTs with placeholder if needed
    const displayedNFTs = [...(nfts || [])];
    if (pendingMint) {
      const placeholder: NFT = {
        tokenId: pendingMint.tokenId,
        name: 'Creating Character...',
        description: 'Your character is being summoned to the realm...',
        image: '/images/placeholder-image.png',
        class: '???',
        stats: {
          str: 0, dex: 0, con: 0, 
          int: 0, wis: 0, cha: 0
        }
      };
      displayedNFTs.unshift(placeholder);
    }
  
    if (isConnecting) {
      return (
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner message="Connecting wallet..." />
        </div>
      );
    }
  
    if (!address) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medieval text-amber-400 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-amber-400/80">
              Please connect your wallet to view and create characters.
            </p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <GalleryHeader 
          onCreateCharacter={createCharacter}
          isCreating={isCreating}
          isPending={!!pendingMint}
        />
  
        {isLoading ? (
          <LoadingSpinner message="Loading your characters..." />
        ) : isError ? (
          <div className="text-red-500 text-center bg-red-50/10 p-4 rounded-lg">
            {error?.message || 'Failed to fetch NFTs'}
          </div>
        ) : !displayedNFTs.length ? (
          <EmptyGalleryState 
            onCreateCharacter={createCharacter}
            isCreating={isCreating}
            isPending={!!pendingMint}
          />
        ) : (
            <GalleryGrid 
            nfts={displayedNFTs}
            pendingMint={pendingMint}
            onSelectNFT={setSelectedNFT}
            isRefetching={isRefetching}
          />
        )}
  
        {selectedNFT && (
          <NFTModal 
            nft={selectedNFT} 
            onClose={() => setSelectedNFT(null)}
          />
        )}
  
        <CelebrationOverlay show={showCelebration} />
      </div>
    );
  }