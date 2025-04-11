
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
    description: 'Connect your Solana wallet to access pinned messages, highlighted shouts, and more.',
    date: '1 day ago'
  }
];

const NewsBanner = () => {
  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          Latest Updates
          <ChevronRight className="h-4 w-4 ml-1 text-secondary" />
        </h3>
        
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="rounded-lg border border-border p-3 hover:border-secondary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{item.title}</h4>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;
