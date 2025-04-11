
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import ChatRoom from '@/components/ChatRoom';
import NewsBanner from '@/components/NewsBanner';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden flex flex-col">
              <ChatRoom />
            </div>
            <NewsBanner />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
