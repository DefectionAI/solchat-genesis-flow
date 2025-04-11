
import React from 'react';
import { ExternalLink, TrendingUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GmgnBanner = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-border shadow-md bg-card/50">
      <div className="p-3 bg-muted/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          <h2 className="text-lg font-semibold">GMGN.ai Live Chart</h2>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">+2.45%</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-muted-foreground hover:text-secondary"
            onClick={() => window.open('https://www.gmgn.cc', '_blank')}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View on GMGN.cc
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-muted-foreground hover:text-secondary"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <iframe 
          src="https://www.gmgn.cc/kline/sol/ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82?theme=dark&interval=15" 
          className="w-full h-[370px] border-0"
          title="GMGN Chart"
        ></iframe>
      </div>
    </div>
  );
};

export default GmgnBanner;
