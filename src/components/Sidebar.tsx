import React from 'react';
import RecentChats from './RecentChats';
import Searchbar from './Searchbar';
import { styled } from '@mui/material';
import HeaderSidebar from './HeaderSidebar';
import { Chatroom } from '../types/Chatroom';

const SidebarWrapper = styled('div')(({ theme }) => ({
    backgroundColor: 'pink',
    height: '100vh',
}));

interface SidebarProps {
    chatrooms: Chatroom[]
}

const Sidebar: React.FC<SidebarProps> = ({ chatrooms }) => {
    return (
        <>
            <SidebarWrapper>
                <HeaderSidebar/>
                <RecentChats
                    chatrooms={chatrooms}
                />
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
