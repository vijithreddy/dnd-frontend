// components/gallery/GalleryHeader.tsx
import { GalleryHeaderProps } from '../../types/index';
  
  export function GalleryHeader({ onCreateCharacter, isCreating, isPending }: GalleryHeaderProps) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medieval text-amber-400">Your Characters</h1>
        <button
          onClick={onCreateCharacter}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medieval 
            transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          disabled={isCreating || isPending}
        >
          {isCreating ? 'Summoning...' : 'Generate New Character'}
        </button>
      </div>
    );
  }