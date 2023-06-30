import React from 'react';
import Chatbar from './Chatbar';
import CurrentChat from './CurrentChat';
import { Chatroom } from '../types/Chatroom';
import { useParams } from 'react-router-dom';
import { User } from '../types/User';

interface MainContentProps {
    chatrooms: Chatroom[]
    currentChat: Chatroom | undefined,
    user:User
}

const MainContent: React.FC<MainContentProps> = ({ chatrooms, user, currentChat }) => {
    
    
    return (
        <>
            <Chatbar
                currentChat={currentChat}
            />
            {currentChat ? <CurrentChat
                user={user}
                currentChat={currentChat}
            />: <p>No chat</p>}
            
        </>
    );
};

export default MainContent;
