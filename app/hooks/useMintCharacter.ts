// hooks/useMintCharacter.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { CharacterResponse } from '../types/index';

export const NFT_QUERY_KEY = 'nfts';

export const useMintCharacter = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!address) throw new Error('No wallet connected');
      
      const characterClasses = ['bard', 'warrior', 'mage', 'rogue', 'cleric'];
      const randomClass = characterClasses[Math.floor(Math.random() * characterClasses.length)];
      
      const response = await fetch('http://localhost:3010/game/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAddress: address,
          characterClass: randomClass,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create character');
      }

      const data: CharacterResponse = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NFT_QUERY_KEY] });
    },
  });
};