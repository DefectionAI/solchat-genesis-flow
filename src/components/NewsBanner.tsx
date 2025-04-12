
import React from 'react';
import { ChevronRight } from 'lucide-react';

const news = [
  {
    id: 1,
    title: 'SolChat launches with GMGN.ai integration',
    description: 'Our platform now features real-time GMGN token charts and integrated Solana wallet support.',
    date: '2 hours ago'
  },
  {
    id: 2,
    title: 'New premium features for wallet users',
    description: 'Connect your Solana wallet to access pinned messages, highlighted shouts, and more for just 0.5 SOL per feature.',
    date: '1 day ago'
  }
];

const NewsBanner = () => {
  return (
    <div className="p-4 bg-white">
      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="rounded-md border border-primary/30 p-3 hover:border-primary/50 transition-colors cursor-pointer bg-accent/30">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-primary">{item.title}</h4>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm text-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBanner;
