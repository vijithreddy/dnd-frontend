// app/components/LoadingSpinner.tsx
import { LoadingSpinnerProps } from '../types/index';
export default function LoadingSpinner({ 
  message 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-amber-400 text-center font-medieval">
        {message}
      </div>
    </div>
  );
}