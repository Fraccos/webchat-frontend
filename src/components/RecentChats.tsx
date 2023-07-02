import React, { useState } from 'react';
import ChatPreview from './ChatPreview';
import { Alert, Box, Button, ButtonGroup, Fab, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Chatroom } from '../types/Chatroom';
import AddIcon from '@mui/icons-material/Add';
import NewChatroom from './modals/NewChatroomModal';

interface RecentChatsProps {
    chatrooms: Chatroom[]
    toggleNCModel: ()=>void
    filterChat: string
}

const modeList = [
    {
        "name": "Singole",
        "type": "single"
    },
    {
        "name": "Tutte",
        "type": "all"
    },
    {
        "name": "Gruppi",
        "type": "group"
    }
]


const RecentChats: React.FC<RecentChatsProps> = ({ toggleNCModel,filterChat, ...props}) => {
    const [mode, setMode] = useState("all");
    const filteredChatroom = (chatrooms: Chatroom[]) =>  {
        let c = chatrooms;
        if (mode === "single") {
            c = chatrooms.filter(c => c.type === "single");
        }
        else if (mode === "group") {
            c = chatrooms.filter(c => c.type === "group");
        }
        if (filterChat.length > 0) {
            c = chatrooms.filter(c => c.name ? c.name?.includes(filterChat) : false);
        }
        return c;
    }

    const chatrooms = filteredChatroom(props.chatrooms);
    
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
            <ButtonGroup color="primary" aria-label="medium secondary button group" sx={{margin: "5px 10px 5px 10px ", width: 'calc(100% - 20px)'}} fullWidth>
                {modeList.map(el => 
                    <Button
                        variant={mode === el.type ? "contained": "outlined"}
                        onClick={()=>setMode(el.type)}
                        key={el.type}
                            >
                            {el.name}
                        </Button>
                )}
            </ButtonGroup>
            {chatrooms.length === 0 && 
                <>
                {filterChat.length > 0 ?
                <Alert severity="warning">
                    Nessuna chat soddisfa la tua ricerca
                </Alert>
                :
                <Alert severity="success">
                    {mode === "single" && 
                        <span>Non hai nessuna chat <strong>singola</strong> attiva, non perdere tempo creane una! </span>
                    }
                    {mode === "group" && 
                        <span>Non hai nessun <strong>gruppo</strong>, corri l'occasione per farne uno con i tuoi <strong>amici</strong> </span>
                    }
                    {mode === "all" && 
                        <span>Non hai nessuna <strong>chat</strong>, approfittane subito per scrivere ad un utente o creare un gruppo con i tuoi amici </span>
                    }
                </Alert>}   
                </>
            }
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
