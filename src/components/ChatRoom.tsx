
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Smile, Image, Pin, MessagesSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage, { Message } from './ChatMessage';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Welcome to SolChat! The Web3 chat platform for the Solana community.',
    sender: 'SolChat Bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    isCurrentUser: false,
    isWalletConnected: true
  },
  {
    id: '2',
    text: 'Connect your wallet to unlock premium features like pinned messages and highlighted shouts!',
    sender: 'SolChat Bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    isCurrentUser: false,
    isWalletConnected: true
  },
  {
    id: '3',
    text: 'Hey everyone, just joined this chat. Looks awesome!',
    sender: 'Anon4582',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    isCurrentUser: false
  },
  {
    id: '4',
    text: 'Welcome to the community! You can check out the latest token charts in the sidebar.',
    sender: 'SolTrader',
    timestamp: new Date(Date.now() - 1000 * 60), // 1 min ago
    isCurrentUser: false,
    isWalletConnected: true
  }
];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { connected, walletAddress } = useWallet();
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: connected ? `Sol${walletAddress?.slice(0, 4)}` : 'You',
        timestamp: new Date(),
        isCurrentUser: true,
        isWalletConnected: connected
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handlePremiumFeature = (feature: string) => {
    if (!connected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your Solana wallet to use premium features.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: `${feature} Feature Activated`,
      description: `You've used the ${feature} premium feature.`,
    });
  };

  // Auto-scroll to latest messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full pt-4 px-4 overflow-hidden">
      <div className="border-b border-border mb-4 pb-2">
        <h2 className="text-xl font-bold">General Chat</h2>
        <p className="text-sm text-muted-foreground">Public chat room for all SolChat users</p>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="mt-4 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
          >
            <Smile size={20} />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
          >
            <Image size={20} />
          </Button>
          
          {connected && (
            <>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-primary hover:text-primary hover:bg-primary/10"
                onClick={() => handlePremiumFeature('Pin')}
              >
                <Pin size={20} />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-secondary hover:text-secondary hover:bg-secondary/10"
                onClick={() => handlePremiumFeature('Shout')}
              >
                <MessagesSquare size={20} />
              </Button>
            </>
          )}
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={connected ? "Type a message with premium features..." : "Type your message..."}
            className="flex-1"
          />
          
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="text-secondary hover:text-secondary hover:bg-secondary/10"
          >
            <SendHorizontal size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
