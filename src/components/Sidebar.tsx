import React from 'react';
import RecentChats from './RecentChats';
import Searchbar from './Searchbar';
import { styled } from '@mui/material';
import HeaderSidebar from './HeaderSidebar';

const SidebarWrapper = styled('div')(({ theme }) => ({
    backgroundColor: 'pink',
    height: '100vh',
}));

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({  }) => {
    return (
        <>
            <SidebarWrapper>
                <HeaderSidebar/>
                <RecentChats/>
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
