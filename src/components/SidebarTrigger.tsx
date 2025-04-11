
import React from 'react';
import { SidebarTrigger as UISidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

const SidebarTrigger = () => {
  return (
    <UISidebarTrigger>
      <Menu />
    </UISidebarTrigger>
  );
};

export default SidebarTrigger;
