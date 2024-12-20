// components/NFTModal.tsx
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { TransactionDefault } from '@coinbase/onchainkit/transaction';
import { NFTModalProps } from '../types/index';

export function NFTModal({ nft, onClose }: NFTModalProps) {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [showTransfer, setShowTransfer] = useState(false);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const transferAbi = [
    {
      type: 'function',
      name: 'transferFrom',
      inputs: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    }
  ] as const;

  const contracts = [
    {
      address: contractAddress,
      abi: transferAbi,
      functionName: 'transferFrom',
      args: [
        address as `0x${string}`, 
        (recipientAddress || address) as `0x${string}`, 
        BigInt(nft.tokenId)
      ]
    }
  ];

  const handleTransferSuccess = () => {
    setShowTransfer(false);
    setTimeout(onClose, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        {/* Main Modal Content */}
        <div className={`grid md:grid-cols-2 gap-6 ${showTransfer ? 'opacity-50' : ''}`}>
          <img 
            src={nft.image} 
            alt={nft.name}
            className="w-full rounded-lg"
          />
          
          <div>
            <h2 className="text-2xl font-medieval text-amber-400 mb-4">{nft.name}</h2>
            <p className="text-gray-300 mb-4">{nft.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {nft.stats && Object.entries(nft.stats).map(([stat, value]) => (
                <div key={stat} className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-amber-400/80 text-sm uppercase">{stat}</div>
                  <div className="text-xl font-bold">{String(value)}</div>
                </div>
              ))}
            </div>

            {address && contractAddress && !showTransfer && (
              <button
                onClick={() => setShowTransfer(true)}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 
                  hover:from-amber-700 hover:to-amber-800 text-white rounded-lg font-medieval 
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Transfer Character</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Transfer Overlay */}
        {showTransfer && (
          <div className="absolute inset-0 bg-gray-800 rounded-lg p-6 flex flex-col animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medieval text-amber-400">Transfer {nft.name}</h3>
              <button 
                onClick={() => setShowTransfer(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 rounded-lg text-white 
                    focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                  placeholder="0x..."
                />
              </div>

              <TransactionDefault 
                contracts={contracts}
                chainId={84532}
                disabled={!recipientAddress}
                onSuccess={handleTransferSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}