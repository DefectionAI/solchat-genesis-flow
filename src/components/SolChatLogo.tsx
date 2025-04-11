
import React from 'react';
import { cn } from '@/lib/utils';

interface SolChatLogoProps {
  className?: string;
}

const SolChatLogo = ({ className }: SolChatLogoProps) => {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="10" className="fill-primary" />
        <path
          d="M7 10C7 8.34315 8.34315 7 10 7H14C15.6569 7 17 8.34315 17 10V14C17 15.6569 15.6569 17 14 17H10C8.34315 17 7 15.6569 7 14V10Z"
          className="fill-secondary"
          fillOpacity="0.8"
        />
        <path
          d="M8.5 11.5L10.5 9.5M8.5 12.5L13.5 7.5M11.5 12.5L13.5 10.5M10.5 14.5L15.5 9.5M13.5 14.5L15.5 12.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SolChatLogo;
