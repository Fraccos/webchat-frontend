import React from 'react';
import ChatPreview from './ChatPreview';
import { List } from '@mui/material';
import { Chatroom } from '../types/Chatroom';

interface RecentChatsProps {
    chatrooms: Chatroom[]
}

const RecentChats: React.FC<RecentChatsProps> = ({ chatrooms }) => {
    return (
        <List sx={{'width': '100%', 'paddingTop': '0'}}>
            {chatrooms.map( room => 
                <ChatPreview
                    key={room._id}
                    chatroom={room}
                />
            )}

        </List>
    );
};

export default RecentChats;
