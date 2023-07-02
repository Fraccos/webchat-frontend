import React from 'react';
import Toolbar from './Toolbar';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';

interface HeaderSidebarProps {
    currentChat: Chatroom | undefined
    currentUser: User;
    filterChat: string;
    filterChatUpdate: (v:string)=> void;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ currentChat, currentUser, filterChat, filterChatUpdate }) => {
    return (
        <>
            <Toolbar
                currentChat={currentChat}
                currentUser={currentUser}
                filterChat={filterChat}
                filterChatUpdate={filterChatUpdate}
                
            />
        </>
    );
};

export default HeaderSidebar;
