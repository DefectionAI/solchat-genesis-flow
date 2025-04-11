
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Initialize connection to Solana devnet
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Interface for Phantom Wallet
export interface PhantomWindow extends Window {
  solana?: {
    isPhantom?: boolean;
    connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: string, callback: (args: any) => void) => void;
    publicKey?: PublicKey | null;
  };
}

export const getProvider = () => {
  if ('solana' in window) {
    const provider = (window as PhantomWindow).solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
  return null;
};

export const connectWallet = async () => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider found');
    }
    const resp = await provider.connect();
    return resp.publicKey.toString();
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const disconnectWallet = async () => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider found');
    }
    await provider.disconnect();
    return true;
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    throw error;
  }
};

export const isWalletConnected = () => {
  const provider = getProvider();
  return !!provider?.publicKey;
};

export const getWalletPublicKey = () => {
  const provider = getProvider();
  return provider?.publicKey?.toString() || null;
};

// Truncate wallet address for display
export const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
