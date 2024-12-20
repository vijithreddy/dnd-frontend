// components/gallery/CelebrationOverlay.tsx
  import { CelebrationOverlayProps } from '../../types/index';
  
  export function CelebrationOverlay({ show }: CelebrationOverlayProps) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <div className="text-center animate-bounce">
          <h2 className="text-4xl font-medieval text-amber-400 mb-2">
            Character Created!
          </h2>
          <p className="text-amber-300/80">
            Your new hero has joined the party!
          </p>
        </div>
      </div>
    );
  }