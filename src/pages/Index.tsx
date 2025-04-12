
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import ChatRoom from '@/components/ChatRoom';
import SidebarTrigger from '@/components/SidebarTrigger';
import GmgnBanner from '@/components/GmgnBanner';
import LatestUpdates from '@/components/LatestUpdates';
import NewsBanner from '@/components/NewsBanner';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-background to-accent/50">
        <Navbar />
        
        <div className="flex-1 flex overflow-hidden">
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="p-2 md:hidden">
              <SidebarTrigger />
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {/* News Banner at top */}
              <div className="msn-window mb-4">
                <div className="msn-header">
                  <h2 className="text-lg font-semibold">Latest Updates</h2>
                </div>
                <NewsBanner />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                {/* Chat section with fixed height */}
                <div className="flex-1">
                  <div className="msn-window h-[450px] w-full md:max-w-[550px]">
                    <ChatRoom />
                  </div>
                </div>
                
                {/* Right sidebar */}
                <div className="hidden md:block md:w-80">
                  <div className="msn-window h-[450px]">
                    <div className="msn-header">
                      <h2 className="text-lg font-semibold">Updates</h2>
                    </div>
                    <LatestUpdates />
                  </div>
                </div>
              </div>
              
              {/* GMGN Banner below chat */}
              <div className="mt-4 w-full">
                <GmgnBanner />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
