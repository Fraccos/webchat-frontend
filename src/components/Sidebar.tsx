import React from 'react';
import RecentChats from './RecentChats';
import Searchbar from './Searchbar';
import { Fab, styled } from '@mui/material';
import HeaderSidebar from './HeaderSidebar';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';

const SidebarWrapper = styled('div')(({ theme }) => ({
    backgroundColor: '#eff3ff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'

}));

interface SidebarProps {
    chatrooms: Chatroom[]
    currentChat: Chatroom | undefined;
    toggleNCModel: ()=>void;
    currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ chatrooms,currentChat,toggleNCModel,currentUser}) => {
    return (
        <>
            <SidebarWrapper>
                <HeaderSidebar
                    currentUser={currentUser}
                    currentChat={currentChat}
                />
                <RecentChats 
                    toggleNCModel={toggleNCModel}
                    chatrooms={chatrooms}
                />
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
