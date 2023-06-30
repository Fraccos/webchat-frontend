import React from 'react';
import Toolbar from './Toolbar';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';

interface HeaderSidebarProps {
    currentChat: Chatroom | undefined
    currentUser: User;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ currentChat, currentUser }) => {
    return (
        <>
            <Toolbar
                currentChat={currentChat}
                currentUser={currentUser}
            />
        </>
    );
};

export default HeaderSidebar;
