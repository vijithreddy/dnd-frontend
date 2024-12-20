// components/gallery/EmptyGalleryState.tsx
import { EmptyGalleryStateProps } from '../../types/index';
export function EmptyGalleryState({ onCreateCharacter, isCreating, isPending }: EmptyGalleryStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-amber-400/80 font-medieval text-xl mb-4">
        Your adventure awaits! Create your first character to begin.
      </p>
      <button
        onClick={onCreateCharacter}
        className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medieval 
            transition-all duration-300 transform hover:scale-105"
        disabled={isCreating || isPending}
      >
        Start Your Journey
      </button>
    </div>
  );
}