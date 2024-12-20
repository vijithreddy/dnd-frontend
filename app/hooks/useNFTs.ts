// hooks/useNFTs.ts
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { NFT } from '../types/index';

const NFT_QUERY_KEY = 'nfts';
const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
const BATCH_SIZE = 10; // Number of NFTs to fetch in parallel

export const useNFTs = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: [NFT_QUERY_KEY, address],
    queryFn: () => fetchNFTs(address),
    enabled: !!address,
    gcTime: CACHE_TIME,
    staleTime: 0, // Set to 0 to always refetch when needed
    refetchInterval: (data) => {
      // If we have a pending mint, check more frequently
      return data ? 2000 : false;
    },
  });
};

const fetchNFTs = async (address: string | undefined): Promise<NFT[]> => {
  if (!address) return [];
  
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  
  const abi = [
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "ownerOf",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "tokenURI",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const totalSupply = await contract.totalSupply();
  
  if (totalSupply > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error('Total supply is too large to process');
  }
  const totalSupplyNumber = Number(totalSupply);

  const processBatch = async (startIdx: number, endIdx: number) => {
    const batchPromises = [];
    for (let tokenId = startIdx; tokenId <= endIdx; tokenId++) {
      if (tokenId <= totalSupplyNumber) {
        batchPromises.push(
          contract.ownerOf(tokenId)
            .then(async (owner: string) => {
              if (owner.toLowerCase() === address.toLowerCase()) {
                return fetchNFTData(contract, tokenId);
              }
              return null;
            })
            .catch(() => null)
        );
      }
    }
    return Promise.all(batchPromises);
  };

  const batches = [];
  for (let i = 1; i <= totalSupplyNumber; i += BATCH_SIZE) {
    batches.push(processBatch(i, Math.min(i + BATCH_SIZE - 1, totalSupplyNumber)));
  }

  const results = await Promise.all(batches);
  return results.flat().filter((nft: NFT | null): nft is NFT => nft !== null);
};

const fetchNFTData = async (contract: ethers.Contract, tokenId: number): Promise<NFT | null> => {
  try {
    const tokenURI = await contract.tokenURI(tokenId);
    const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'));
    if (!response.ok) throw new Error('Failed to fetch metadata');
    
    const metadata = await response.json();
    
    return {
      tokenId: tokenId.toString(),
      name: metadata.name,
      description: metadata.description,
      image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
      class: metadata.attributes.find((attr: any) => attr.trait_type === 'Class')?.value,
      stats: {
        str: parseInt(metadata.attributes.find((attr: any) => attr.trait_type === 'Strength')?.value || '0'),
        dex: parseInt(metadata.attributes.find((attr: any) => attr.trait_type === 'Dexterity')?.value || '0'),
        con: parseInt(metadata.attributes.find((attr: any) => attr.trait_type === 'Constitution')?.value || '0'),
        int: parseInt(metadata.attributes.find((attr: any) => attr.trait_type === 'Intelligence')?.value || '0'),
        wis: parseInt(metadata.attributes.find((attr: any) => attr.trait_type === 'Wisdom')?.value || '0'),
        cha: parseInt(metadata.attributes.find((attr: any) => attr.trait_type === 'Charisma')?.value || '0')
      }
    };
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return null;
  }
};