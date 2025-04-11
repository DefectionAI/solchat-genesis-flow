
import { useState, useEffect, useCallback } from 'react';
import { 
  connectWallet, 
  disconnectWallet, 
  isWalletConnected,
  getWalletPublicKey,
  PhantomWindow
} from '@/services/walletService';
import { useToast } from '@/hooks/use-toast';

export function useWallet() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Update connection status
  const updateConnectionStatus = useCallback(() => {
    const connected = isWalletConnected();
    setConnected(connected);
    
    if (connected) {
      const publicKey = getWalletPublicKey();
      setWalletAddress(publicKey);
    } else {
      setWalletAddress(null);
    }
  }, []);
  
  // Connect wallet
  const connect = useCallback(async () => {
    try {
      setLoading(true);
      const publicKey = await connectWallet();
      setConnected(true);
      setWalletAddress(publicKey);
      toast({
        title: "Wallet Connected",
        description: "Your Solana wallet has been connected successfully.",
      });
      return publicKey;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect your wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      setLoading(true);
      await disconnectWallet();
      setConnected(false);
      setWalletAddress(null);
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect your wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // Listen for wallet connection events
  useEffect(() => {
    // Check initial connection status
    updateConnectionStatus();
    
    // Setup listeners for wallet state changes
    const handleConnect = () => updateConnectionStatus();
    const handleDisconnect = () => {
      setConnected(false);
      setWalletAddress(null);
    };
    
    const provider = (window as PhantomWindow).solana;
    if (provider) {
      provider.on('connect', handleConnect);
      provider.on('disconnect', handleDisconnect);
      
      return () => {
        provider.on('connect', handleConnect);
        provider.on('disconnect', handleDisconnect);
      };
    }
  }, [updateConnectionStatus]);
  
  return {
    connected,
    walletAddress,
    loading,
    connect,
    disconnect
  };
}
