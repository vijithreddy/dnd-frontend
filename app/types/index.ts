// app/types/index.ts
export interface CharacterStats {
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
  }
  
  export interface CharacterData {
    tokenId: string;
    owner: string;
    stats: CharacterStats;
    experience: string;
    level: string;
    seasonId: string;
    evolved: boolean;
  }

  export interface Character {
    name: string;
    class: string;
    imageUri: string;
    stats: {
      [key: string]: number;
    };
    backstory: string;
    personality: string;
  }

  export interface NFT {
    tokenId: string;
    name: string;
    description: string;
    image: string;
    class: string;
    stats: {
      str: number;
      dex: number;
      con: number;
      int: number;
      wis: number;
      cha: number;
    };
    transactionHash?: string; // Add this field
  }

  export interface NFTCardProps {
    nft: NFT;
    isLoading?: boolean;
    transactionLink?: string;
    onClick: () => void;
  }

  export interface NFTModalProps {
    nft: NFT;
    onClose: () => void;
  }

  export interface CharacterResponse {
    success: boolean;
    transactionHash: string;
    transactionLink: string;
    character: {
      owner: string;
      class: string;
      stats: number[];
    };
  }

   export interface PendingNFTCardProps {
      transactionHash?: string;
      characterClass?: string;
    }

  export interface CelebrationOverlayProps {
      show: boolean;
    }

    export interface EmptyGalleryStateProps {
      onCreateCharacter: () => void;
      isCreating: boolean;
      isPending: boolean;
    }

  export interface GalleryGridProps {
    nfts: NFT[];
    pendingMint: {
      tokenId: string;
      transactionHash?: string;
      transactionLink?: string;
    } | null;
    onSelectNFT: (nft: NFT) => void;
    isRefetching?: boolean;
  }


  export interface GalleryHeaderProps {
    onCreateCharacter: () => void;
    isCreating: boolean;
    isPending: boolean;
  }

  export interface CharacterCardProps {
    character: Character;
  }

  export interface CreateCharacterProps {
    onSuccess: () => void;
  }

  export interface LoadingSpinnerProps {
    message?: string | React.ReactNode;
  }
  