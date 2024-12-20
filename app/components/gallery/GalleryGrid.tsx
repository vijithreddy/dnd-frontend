// components/gallery/GalleryGrid.tsx
import { GalleryGridProps } from '../../types/index';
import { NFTCard } from '../NFTCard';

  
  export function GalleryGrid({ nfts, pendingMint, onSelectNFT, isRefetching }: GalleryGridProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => {
          // Only show loading state for the specific NFT being minted
          const isPending = pendingMint?.tokenId === nft.tokenId;
          return (
            <NFTCard 
              key={nft.tokenId} 
              nft={nft}
              isLoading={isPending}
              transactionLink={isPending ? pendingMint?.transactionLink : undefined}
              onClick={() => !isPending && onSelectNFT(nft)}
            />
          );
        })}
      </div>
    );
  }