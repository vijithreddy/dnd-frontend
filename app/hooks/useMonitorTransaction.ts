import { useEffect } from 'react';
import { usePublicClient } from 'wagmi';

export const useMonitorTransaction = (
  transactionHash: string | undefined,
  onConfirmed: (receipt: any) => void
) => {
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!transactionHash || !publicClient) return;

    const checkTransaction = async () => {
      try {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: transactionHash as `0x${string}`,
        });
        
        if (receipt.status === 'success') {
          onConfirmed(receipt);
        }
      } catch (error) {
        console.error('Error monitoring transaction:', error);
      }
    };

    checkTransaction();
  }, [transactionHash, onConfirmed, publicClient]);
};