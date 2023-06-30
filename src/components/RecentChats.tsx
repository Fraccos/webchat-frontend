import React, { useState } from 'react';
import ChatPreview from './ChatPreview';
import { Box, Fab, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Chatroom } from '../types/Chatroom';
import AddIcon from '@mui/icons-material/Add';
import NewChatroom from './modals/NewChatroomModal';

interface RecentChatsProps {
    chatrooms: Chatroom[]
    toggleNCModel: ()=>void
}

const RecentChats: React.FC<RecentChatsProps> = ({ chatrooms, toggleNCModel }) => {
    const getTimeOfLastMessageOfChat = (c: Chatroom):number => {
        if (c.messages.length === 0) {
            return -1;
        }
        return new Date(c.messages[0].created).getTime();
    }   
    const sortByLastMessage = () => {
        let sortedChatrooms: Chatroom[] = chatrooms.map(c => {
            c.messages = c.messages.sort( (a,b) => new Date(b.created).getTime() - new Date(a.created).getTime());
            return c;
        })
        return sortedChatrooms.sort( (a,b) => getTimeOfLastMessageOfChat(b) - getTimeOfLastMessageOfChat(a));
    }

    return (
        <>
            <List aria-label="contacts"  sx={{'width': '100%', 'paddingTop': '0', overflowY: "scroll", height: '90vh', flexGrow:1}}>
                <Box sx={{height:'100%', overflowY: 'scroll'}}>
                    {sortByLastMessage().map( room => 
                        <ChatPreview
                            key={room._id}
                            chatroom={room}
                        />
                    )}
                </Box>
                
                <div style={{position: "absolute", left: 0, bottom: 0, width: '100%', display:'flex', flexDirection: 'row', justifyContent:'end'}}>
                    <Fab sx={{margin: '15px'}}color="primary" aria-label="add" onClick={toggleNCModel}>
                        <AddIcon />
                    </Fab>
                </div>
            </List>
        </>
    );
};

export default RecentChats;
