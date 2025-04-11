
import React from 'react';
import { Twitter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import SolChatLogo from './SolChatLogo';
import { useWallet } from '@/hooks/useWallet';
import { truncateAddress } from '@/services/walletService';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const { connected, walletAddress, loading, connect, disconnect } = useWallet();

  const handleWalletAction = async () => {
    if (connected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  return (
    <header className={cn("flex h-16 items-center px-4 border-b border-border", className)}>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <SolChatLogo className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-tight">SolChat</h1>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground truncate max-w-[200px]">
          <span className="hidden sm:inline">Contract: </span>
          <span className="font-mono">UkHH6c7mM...pQZgZ74J82</span>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a 
            href="https://pumpfun.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm1-9.5c0 .83-.67 1.5-1.5 1.5S13 7.33 13 6.5 13.67 5 14.5 5 16 5.67 16 6.5zM10 5c.83 0 1.5.67 1.5 1.5S10.83 8 10 8 8.5 7.33 8.5 6.5 9.17 5 10 5z" />
            </svg>
          </a>
        </div>
        
        <Button 
          className="wallet-button"
          onClick={handleWalletAction}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M22 10H2" />
            </svg>
          )}
          {connected ? truncateAddress(walletAddress || '') : 'Connect Wallet'}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
