import React from 'react';
import Toolbar from './Toolbar';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';
import { FriendshipRequest } from '../types/FriendshipRequest';

interface HeaderSidebarProps {
    currentChat: Chatroom | undefined
    currentUser: User;
    filterChat: string;
    filterChatUpdate: (v:string)=> void;
    friendshipsReq: FriendshipRequest[];
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ currentChat, currentUser, filterChat, filterChatUpdate,friendshipsReq }) => {
    return (
        <>
            <Toolbar
                currentChat={currentChat}
                currentUser={currentUser}
                filterChat={filterChat}
                filterChatUpdate={filterChatUpdate}
                friendshipsReq={friendshipsReq}
            />
        </>
    );
};

export default HeaderSidebar;
