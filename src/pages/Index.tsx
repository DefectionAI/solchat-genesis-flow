
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import ChatRoom from '@/components/ChatRoom';
import NewsBanner from '@/components/NewsBanner';
import SidebarTrigger from '@/components/SidebarTrigger';
import GmgnBanner from '@/components/GmgnBanner';
import LatestUpdates from '@/components/LatestUpdates';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="p-2 md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 flex flex-col overflow-hidden p-4">
                <GmgnBanner />
                <div className="flex flex-1 mt-4 gap-4 overflow-hidden">
                  <div className="flex-1 flex flex-col overflow-hidden border border-border rounded-lg shadow-md bg-card/50">
                    <ChatRoom />
                  </div>
                  <div className="hidden md:flex md:w-80 flex-col overflow-hidden">
                    <LatestUpdates />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
