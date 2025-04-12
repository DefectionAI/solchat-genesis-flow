
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Smile, Image, Pin, MessagesSquare, Plus, Sticker, Gift, FileMusic, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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
    text: 'Connect your wallet to unlock premium features like pinned messages and highlighted shouts for just 0.5 SOL each! 🚀',
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
    text: 'Welcome to the community! You can check out the latest token charts below. 📈',
    sender: 'SolTrader',
    timestamp: new Date(Date.now() - 1000 * 60), // 1 min ago
    isCurrentUser: false,
    isWalletConnected: true
  }
];

const emojiOptions = ['😀', '😁', '😂', '🤣', '😎', '🚀', '💯', '🔥', '👍', '❤️', '💰', '💸'];

const walletAddress = "3qHbhxWv1cVhf9L9pvyK23g6AxRs6vNQ7aTZHaDBF61r";

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { connected, walletAddress: userWallet } = useWallet();
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: connected ? `Sol${userWallet?.slice(0, 4)}` : 'You',
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
    
    setSelectedFeature(feature);
    setShowPaymentModal(true);
  };

  const processPremiumFeature = () => {
    toast({
      title: `Processing ${selectedFeature} Feature`,
      description: `Please send 0.5 SOL to ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
    });
    
    // In a real app, we would track the payment and enable the feature
    // For now, we'll simulate it with a success message
    setTimeout(() => {
      toast({
        title: `${selectedFeature} Feature Available`,
        description: `You can now use the ${selectedFeature} premium feature after payment confirmation.`,
      });
      setShowPaymentModal(false);
    }, 2000);
  };

  // Auto-scroll to latest messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[450px]">
      <div className="msn-header flex items-center">
        <MessagesSquare className="h-4 w-4 mr-2 text-white" />
        <h2 className="text-lg font-semibold">SolChat Community</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-3 px-4 bg-white">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-border p-3 bg-accent">
        <div className="flex items-center gap-1">
          <div className="relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:text-primary/80 h-8 w-8"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={18} />
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-lg border border-primary/30 shadow-lg grid grid-cols-6 gap-2 w-[240px] z-10">
                {emojiOptions.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-lg hover:bg-accent rounded p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {connected && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:text-primary/80 h-8 w-8"
              title="Attach Image (Premium)"
            >
              <Image size={18} />
            </Button>
          )}
          
          {connected && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:text-primary/80 h-8 w-8"
              title="Attach Audio (Premium)"
            >
              <FileMusic size={18} />
            </Button>
          )}
          
          {connected && (
            <>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-primary hover:bg-primary/10 h-8 w-8"
                onClick={() => handlePremiumFeature('Pin Message')}
                title="Pin Message (0.5 SOL)"
              >
                <Pin size={18} />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-secondary hover:bg-secondary/10 h-8 w-8"
                onClick={() => handlePremiumFeature('Shout')}
                title="Shout Message (0.5 SOL)"
              >
                <AlertCircle size={18} />
              </Button>
            </>
          )}
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={connected ? "Type a message with premium features..." : "Type your message..."}
            className="flex-1 h-8 text-sm border-primary/30 focus:border-primary"
          />
          
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="text-secondary hover:text-secondary/80 h-8 w-8"
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
      </form>
      
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[350px] p-4 bg-white">
            <h3 className="text-lg font-bold text-primary mb-2">Purchase Premium Feature</h3>
            <p className="mb-4">Send 0.5 SOL to address:<br/><span className="font-mono text-sm">{walletAddress}</span></p>
            <p className="text-sm mb-4">After payment, the {selectedFeature} feature will be activated for your account.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)}>Cancel</Button>
              <Button onClick={processPremiumFeature}>Process Payment</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
