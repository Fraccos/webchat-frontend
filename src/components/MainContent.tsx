import React from 'react';
import Chatbar from './Chatbar';
import CurrentChat from './CurrentChat';
import { Chatroom } from '../types/Chatroom';
import { useParams } from 'react-router-dom';
import { User } from '../types/User';

interface MainContentProps {
    chatrooms: Chatroom[]
    user:User
}

const MainContent: React.FC<MainContentProps> = ({ chatrooms, user }) => {
    let currentChat: undefined | Chatroom = undefined;
    const { chatid } = useParams();
    if (chatid !== undefined) {
        currentChat = chatrooms.find( el => el._id === chatid);
    }
    
    return (
        <>
            <Chatbar/>
            {currentChat ? <CurrentChat
                user={user}
                currentChat={currentChat}
            />: <p>No chat</p>}
            
        </>
    );
};

export default MainContent;
