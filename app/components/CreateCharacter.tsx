// app/components/CreateCharacter.tsx
'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { CreateCharacterProps } from '../types/index';
const characterClasses = ['warrior', 'mage', 'rogue', 'cleric', 'bard'];



export default function CreateCharacter({ onSuccess }: CreateCharacterProps) {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const createCharacter = async () => {
    if (!address) return;

    try {
      setLoading(true);
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

      onSuccess();
    } catch (error) {
      console.error('Error creating character:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={createCharacter}
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      {loading ? 'Creating...' : 'Create New Character'}
    </button>
  );
}