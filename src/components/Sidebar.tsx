import React from 'react';
import RecentChats from './RecentChats';
import Searchbar from './Searchbar';
import { styled } from '@mui/material';

const SidebarWrapper = styled('div')(({ theme }) => ({
    backgroundColor: 'pink',
    flex: '0 245px',
    justifyContent: 'left',
    height: '100vh',
    borderRight: '2px solid #dfb9fd',
}));

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({  }) => {
    return (
        <>
            <SidebarWrapper>
                <RecentChats/>
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
