
import React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
  isWalletConnected?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex items-start gap-3 mb-4",
      message.isCurrentUser && "flex-row-reverse"
    )}>
      <div className={cn(
        "flex-shrink-0 h-8 w-8 bg-muted rounded-full flex items-center justify-center",
        message.isWalletConnected && "bg-primary/20"
      )}>
        {message.isWalletConnected ? (
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-primary"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M21 9H3" />
          </svg>
        ) : (
          <User size={16} className="text-foreground/60" />
        )}
      </div>
      
      <div className="flex flex-col max-w-[75%]">
        <div className="flex items-center gap-2 mb-1 text-xs">
          <span className={cn(
            "font-medium",
            message.isWalletConnected ? "text-primary" : "text-muted-foreground"
          )}>
            {message.sender}
            {message.isWalletConnected && (
              <span className="ml-1 inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                Wallet
              </span>
            )}
          </span>
          <span className="text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className={cn(
          "message-bubble",
          message.isCurrentUser ? "message-bubble-user" : "message-bubble-other"
        )}>
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
