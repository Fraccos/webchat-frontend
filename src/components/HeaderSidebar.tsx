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
    updateFriendshipsReq: (newReqs: FriendshipRequest[]) => void
    friends: User[];
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ currentChat, currentUser, filterChat, filterChatUpdate,friendshipsReq,updateFriendshipsReq, friends }) => {
    return (
        <>
            <Toolbar
                currentChat={currentChat}
                currentUser={currentUser}
                filterChat={filterChat}
                filterChatUpdate={filterChatUpdate}
                updateFriendshipsReq={updateFriendshipsReq}
                friendshipsReq={friendshipsReq}
                friends={friends}
            />
        </>
    );
};

export default HeaderSidebar;
