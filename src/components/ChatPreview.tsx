import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Chatroom } from '../types/Chatroom';
import { Link } from 'react-router-dom';

interface ChatPreviewProps {
    chatroom: Chatroom;
}


const ChatPreview: React.FC<ChatPreviewProps> = ({ chatroom }) => {
    const getLastMsg = (chatroom:Chatroom) => chatroom.messages.sort((a,b) => new Date(a.created).getTime() - new Date(b.created).getTime()).slice(-1)[0];
    const lastMsg = getLastMsg(chatroom);
    
    return (
        <Link to={"/" + chatroom._id} >
            <ListItem
                secondaryAction={
                    <Box>
                        <Typography component="p">
                            {new Date(lastMsg.created).toLocaleTimeString("it-it", {
                                hour: "2-digit",
                                minute: "2-digit",
                            }) }
                        </Typography>
                        <Typography component="span">
                            XX
                        </Typography>
                    </Box>
                }
                divider={true}
                >
                <ListItemAvatar>
                <Avatar>
                    
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={chatroom.name} secondary="Jan 9, 2014" />
            </ListItem>
        </Link>
    )
    /*
    return (
        <>
            <Stack direction="row">
                <Box>
                    <IconButton 
                    color="inherit"
                    size="medium">
                    <AccountCircleIcon 
                        fontSize='medium'/>
                    </IconButton>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Typography component="p">
                        NOME
                    </Typography>
                    <Typography component="span">
                        DESCRIZIONE
                    </Typography>
                </Box>
                <Box>
                    <Typography component="p">
                        23:32
                    </Typography>
                    <Typography component="span">
                        XX
                    </Typography>
                </Box>
            </Stack>
        </>
    );*/
};

export default ChatPreview;