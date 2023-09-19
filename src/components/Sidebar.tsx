import React, { useState } from 'react';
import RecentChats from './RecentChats';
import Searchbar from './Searchbar';
import { Fab, styled } from '@mui/material';
import HeaderSidebar from './HeaderSidebar';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';
import { FriendshipRequest } from '../types/FriendshipRequest';

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
    friendshipsReq: FriendshipRequest[];
    updateFriendshipsReq: (newReqs: FriendshipRequest[]) => void
    friends: User[];
    jwtToken: string;
}

const Sidebar: React.FC<SidebarProps> = ({ chatrooms,currentChat,toggleNCModel,currentUser, friendshipsReq, updateFriendshipsReq, friends, jwtToken}) => {
    const [filterChat, setFilterChat] = useState("");
    return (
        <>
            <SidebarWrapper>
                <HeaderSidebar
                    currentUser={currentUser}
                    currentChat={currentChat}
                    filterChat={filterChat}
                    filterChatUpdate={(v)=>setFilterChat(v)}
                    friendshipsReq={friendshipsReq}
                    updateFriendshipsReq={updateFriendshipsReq}
                    friends={friends}
                    jwtToken={jwtToken}
                />
                <RecentChats 
                    toggleNCModel={toggleNCModel}
                    chatrooms={chatrooms}
                    filterChat={filterChat}
                    currentUser={currentUser}
                />
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
