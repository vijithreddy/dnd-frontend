// app/components/CharacterCard.tsx
'use client';

import { CharacterCardProps } from '../types/index';



export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <div className="relative">
        <img 
          src={character.imageUri} 
          alt={character.name} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <span className="absolute top-2 right-2 bg-blue-500 px-3 py-1 rounded-full text-white">
          {character.class}
        </span>
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-white">{character.name}</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(character.stats).map(([stat, value]) => (
          <div key={stat} className="bg-gray-700 p-3 rounded-lg">
            <h3 className="text-blue-400 capitalize">{stat}</h3>
            <p className="text-2xl text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Backstory</h3>
          <p className="text-gray-300">{character.backstory}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Personality</h3>
          <p className="text-gray-300">{character.personality}</p>
        </div>
      </div>
    </div>
  );
}