
import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Users, 
  Rocket, 
  TrendingUp, 
  Search,
  Settings,
  Plus
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';

const chatRooms = [
  { id: 'general', name: 'General', icon: MessageSquare },
  { id: 'trading', name: 'Trading', icon: TrendingUp },
];

const AppSidebar = () => {
  const { connected } = useWallet();
  
  return (
    <Sidebar className="border-r border-primary/30 bg-accent">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="text-primary hover:bg-primary/10">
                    <Home size={18} />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center pr-2 text-primary font-bold">
            <span>Chat Rooms</span>
            {connected && (
              <Button variant="ghost" size="icon" className="h-5 w-5 text-secondary">
                <Plus size={14} />
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatRooms.map((room) => (
                <SidebarMenuItem key={room.id}>
                  <SidebarMenuButton asChild>
                    <a href={`#${room.id}`} className="text-primary hover:bg-primary/10">
                      <room.icon size={18} />
                      <span>{room.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">Token Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-primary" />
                <Input 
                  placeholder="Search token address" 
                  className="pl-8 border-primary/30 focus:border-primary" 
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-primary/30">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Settings size={16} className="text-primary" />
            </div>
            <div className="text-xs">
              <div className="font-medium text-primary">Settings</div>
              <div className="text-muted-foreground">Customize SolChat</div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
