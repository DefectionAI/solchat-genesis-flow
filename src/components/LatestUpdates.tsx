
import React from 'react';
import { Bell, ChevronRight, Rocket, Users, MessageSquare, TrendingUp } from 'lucide-react';

const news = [
  {
    id: 1,
    title: 'SolChat launches with GMGN.ai integration',
    description: 'Our platform now features real-time GMGN token charts and integrated Solana wallet support.',
    date: '2 hours ago',
    icon: Rocket
  },
  {
    id: 2,
    title: 'New premium features for wallet users',
    description: 'Connect your Solana wallet to access pinned messages, highlighted shouts, and more.',
    date: '1 day ago',
    icon: TrendingUp
  },
  {
    id: 3,
    title: 'Community growing fast!',
    description: 'Our SolChat community is growing quickly! Join the excitement now.',
    date: '2 days ago',
    icon: Users
  },
  {
    id: 4,
    title: 'New chat rooms coming soon',
    description: 'Create your own chat rooms with custom themes and moderation settings.',
    date: '3 days ago',
    icon: MessageSquare
  }
];

const LatestUpdates = () => {
  return (
    <div className="h-full border border-border rounded-lg shadow-md bg-card/50 overflow-y-auto">
      <div className="sticky top-0 p-3 border-b border-border bg-card/90 backdrop-blur-sm z-10">
        <h3 className="text-lg font-semibold flex items-center">
          <Bell className="h-4 w-4 mr-2 text-secondary" />
          Latest Updates
          <ChevronRight className="h-4 w-4 ml-1 text-secondary" />
        </h3>
      </div>
      
      <div className="p-3 space-y-3">
        {news.map((item) => (
          <div key={item.id} className="rounded-lg border border-border p-3 hover:border-secondary/50 transition-colors cursor-pointer">
            <div className="flex gap-3">
              <div className="mt-1 h-6 w-6 text-secondary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <span className="text-xs text-muted-foreground mt-2 block">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUpdates;
