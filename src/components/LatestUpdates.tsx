
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
    description: 'Send premium messages for just 0.5 SOL per feature. Pay to: 3qHbhxWv1cVhf9L9pvyK23g6AxRs6vNQ7aTZHaDBF61r',
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
    <div className="h-[calc(450px-40px)] overflow-y-auto">
      <div className="p-3 space-y-3">
        {news.map((item) => (
          <div key={item.id} className="rounded-md border border-primary/30 p-3 hover:border-primary transition-colors cursor-pointer bg-accent/30">
            <div className="flex gap-3">
              <div className="mt-1 h-6 w-6 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-primary">{item.title}</h4>
                </div>
                <p className="text-sm text-foreground">{item.description}</p>
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
