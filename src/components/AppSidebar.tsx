
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Home size={18} />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center pr-2">
            <span>Chat Rooms</span>
            {connected && (
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus size={14} />
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatRooms.map((room) => (
                <SidebarMenuItem key={room.id}>
                  <SidebarMenuButton asChild>
                    <a href={`#${room.id}`}>
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
          <SidebarGroupLabel>Token Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search token address" 
                  className="pl-8 bg-sidebar-accent text-sidebar-accent-foreground" 
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Settings size={16} className="text-primary" />
            </div>
            <div className="text-xs">
              <div className="font-medium">Settings</div>
              <div className="text-muted-foreground">Customize SolChat</div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
