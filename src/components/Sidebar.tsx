import React, { useState } from 'react';
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
    const [filterChat, setFilterChat] = useState("");
    return (
        <>
            <SidebarWrapper>
                <HeaderSidebar
                    currentUser={currentUser}
                    currentChat={currentChat}
                    filterChat={filterChat}
                    filterChatUpdate={(v)=>setFilterChat(v)}
                    
                />
                <RecentChats 
                    toggleNCModel={toggleNCModel}
                    chatrooms={chatrooms}
                    filterChat={filterChat}
                />
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
