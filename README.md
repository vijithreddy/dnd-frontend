# D&D Character NFT Frontend

A Next.js-based web application for creating and managing D&D character NFTs on the Base Sepolia network.

## Features

- Connect wallet using Coinbase's OnchainKit
- Mint new D&D character NFTs
- View character gallery with stats and details
- Real-time transaction monitoring
- Rate limiting protection
- Responsive design with medieval theme
- IPFS image handling

## Tech Stack

- **Frontend Framework**: OnchainKit
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Image Handling**: Next.js Image with IPFS support

## Prerequisites

- Deploy Backend first [https://github.com/vijithreddy/dnd-nft-backend]
- Node.js 18+
- npm or yarn

## Environment Variables

Create a `.env.local` file with the following:

NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=dnd-frontend
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key [From Coinbase Developer portal]
NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG=smartWalletOnly
NEXT_PUBLIC_API_HOST={Your DND Backend}
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_RPC_URL=your_rpc_url

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dnd-frontend.git
   cd dnd-frontend

2. Install dependencies:

   ```bash
   npm install 
   or
   yarn install

3. Run the development server:

   ```bash
   npm run dev
   or
   yarn dev
