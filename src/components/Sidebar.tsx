import React from 'react';
import RecentChats from './RecentChats';
import Searchbar from './Searchbar';
import { styled } from '@mui/material';

  const SidebarWrapper = styled('div')(({ theme }) => ({
    
  }));

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({  }) => {
    return (
        <>
            <SidebarWrapper>
                <Searchbar/>
                <RecentChats/>
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
