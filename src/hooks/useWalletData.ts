import { useState, useEffect } from 'react';
import { WalletData } from '../types/auth';
import { HomeAPI } from '../services/api';

interface UseWalletDataReturn {
  wallet: WalletData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useWalletData = (): UseWalletDataReturn => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      const walletData = await HomeAPI.getWalletBalance();
      setWallet(walletData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch wallet data');
      console.error('Wallet fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchWallet();
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return {
    wallet,
    loading,
    error,
    refetch,
  };
};
