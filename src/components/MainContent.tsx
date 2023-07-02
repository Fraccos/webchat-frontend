import React from 'react';
import Chatbar from './Chatbar';
import CurrentChat from './CurrentChat';
import { Chatroom } from '../types/Chatroom';
import { useParams } from 'react-router-dom';
import { User } from '../types/User';

interface MainContentProps {
    chatrooms: Chatroom[]
    currentChat: Chatroom | undefined,
    user:User,
    usernamesMap: any
}

const MainContent: React.FC<MainContentProps> = ({ chatrooms, user, currentChat, usernamesMap}) => {
    
    
    return (
        <>
            <Chatbar
                currentChat={currentChat}
                user={user}
                usernamesMap={usernamesMap}
            />
            {currentChat ? <CurrentChat
                user={user}
                currentChat={currentChat}
                usernamesMap={usernamesMap}
            />: <p>No chat</p>}
            
        </>
    );
};

export default MainContent;
