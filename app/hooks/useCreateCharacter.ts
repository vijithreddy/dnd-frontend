// hooks/useCreateCharacter.ts
import { useState, useCallback } from 'react';
import { useMintCharacter } from './useMintCharacter';
import { useNFTs } from './useNFTs';

export function useCreateCharacter() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [pendingMint, setPendingMint] = useState<{
    tokenId: string;
    transactionHash?: string;
    transactionLink?: string;
    previousNFTCount?: number;
  } | null>(null);

  const { data: nfts } = useNFTs();
  const { mutate: mintCharacter, isPending: isCreating } = useMintCharacter();

  const handleCreateCharacter = useCallback(() => {
    const tempId = `pending-${Date.now()}`;
    setPendingMint({ 
      tokenId: tempId,
      previousNFTCount: nfts?.length ?? 0 // Store current NFT count
    });

    mintCharacter(undefined, {
      onSuccess: (data) => {
        setPendingMint(prev => ({
          ...prev!,
          transactionHash: data.transactionHash,
          transactionLink: `https://sepolia.basescan.org/tx/${data.transactionHash}`
        }));

        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
      },
      onError: () => {
        setPendingMint(null);
      }
    });
  }, [mintCharacter, nfts?.length]);

  return {
    createCharacter: handleCreateCharacter,
    isCreating,
    pendingMint,
    setPendingMint,
    showCelebration
  };
}