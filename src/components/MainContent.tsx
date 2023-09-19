import React, { useState } from 'react';
import Chatbar from './Chatbar';
import CurrentChat from './CurrentChat';
import { Chatroom } from '../types/Chatroom';
import { useParams } from 'react-router-dom';
import { User } from '../types/User';
import ChatEmpy from './ChatEmpty';

interface MainContentProps {
    chatrooms: Chatroom[]
    currentChat: Chatroom | undefined,
    user:User,
    usernamesMap: any
}

const MainContent: React.FC<MainContentProps> = ({ chatrooms, user, currentChat, usernamesMap}) => {
    const [filterMsg, setFilterMsg] = useState("");
    const handleFilterMsg = (msgFilter: string) => {
        setFilterMsg(msgFilter);
    }
    
    return (
        <>
            <Chatbar
                currentChat={currentChat}
                user={user}
                usernamesMap={usernamesMap}
                filterMsg={filterMsg}
                updateFilterMsg={handleFilterMsg}
            />
            {currentChat ? <CurrentChat
                user={user}
                currentChat={currentChat}
                filterMsg={filterMsg}
                usernamesMap={usernamesMap}
            />: <ChatEmpy></ChatEmpy>}
            
        </>
    );
};

export default MainContent;


