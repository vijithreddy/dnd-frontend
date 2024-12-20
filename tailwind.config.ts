import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        medieval: ['MedievalSharp', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'sparkle-1': {
          '0%, 100%': { transform: 'scale(0) rotate(45deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(45deg)', opacity: '0.3' },
        },
        'sparkle-2': {
          '0%, 100%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(-45deg)', opacity: '0.3' },
        },
        'sparkle-3': {
          '0%, 100%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1)', opacity: '0.3' },
        },
        shimmer: { // [!code ++]
          '0%': { backgroundPosition: '200% 0' }, // [!code ++]
          '100%': { backgroundPosition: '-200% 0' } // [!code ++]
        }, // [!code ++]
      },
      animation: {
        'sparkle-1': 'sparkle-1 2s ease-in-out infinite',
        'sparkle-2': 'sparkle-2 2s ease-in-out infinite 0.4s',
        'sparkle-3': 'sparkle-3 2s ease-in-out infinite 0.8s',
        shimmer: 'shimmer 2s infinite linear', // [!code ++]
      },
    },
  },
  plugins: [],
};

export default config;