
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Smile, Image, Pin, MessagesSquare, Plus, Sticker, Gift, FileMusic } from 'lucide-react';
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
    text: 'Connect your wallet to unlock premium features like pinned messages and highlighted shouts! 🚀',
    sender: 'SolChat Bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    isCurrentUser: false,
    isWalletConnected: true
  },
  {
    id: '3',
    text: 'Hey everyone, just joined this chat. Looks awesome! 😎',
    sender: 'Anon4582',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    isCurrentUser: false
  },
  {
    id: '4',
    text: 'Welcome to the community! You can check out the latest token charts above. 📈',
    sender: 'SolTrader',
    timestamp: new Date(Date.now() - 1000 * 60), // 1 min ago
    isCurrentUser: false,
    isWalletConnected: true
  }
];

const emojiOptions = ['😀', '😁', '😂', '🤣', '😎', '🚀', '💯', '🔥', '👍', '❤️', '💰', '💸'];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
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
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-3 bg-card/90 backdrop-blur-sm">
        <h2 className="text-lg font-semibold flex items-center">
          <MessagesSquare className="h-4 w-4 mr-2 text-secondary" />
          SolChat Community
        </h2>
        <p className="text-xs text-muted-foreground">Public chat room for all SolChat users</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-3 px-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-border p-3 bg-card/90 backdrop-blur-sm">
        <div className="flex items-center gap-1">
          <div className="relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={18} />
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 p-2 bg-card rounded-lg border border-border shadow-lg grid grid-cols-6 gap-2 w-[240px]">
                {emojiOptions.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-lg hover:bg-muted rounded p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <Image size={18} />
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <Sticker size={18} />
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <FileMusic size={18} />
          </Button>
          
          {connected && (
            <>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                onClick={() => handlePremiumFeature('Pin')}
              >
                <Pin size={18} />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-secondary hover:text-secondary hover:bg-secondary/10 h-8 w-8"
                onClick={() => handlePremiumFeature('Gift')}
              >
                <Gift size={18} />
              </Button>
            </>
          )}
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={connected ? "Type a message with premium features..." : "Type your message..."}
            className="flex-1 h-8 text-sm"
          />
          
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="text-secondary hover:text-secondary hover:bg-secondary/10 h-8 w-8"
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
