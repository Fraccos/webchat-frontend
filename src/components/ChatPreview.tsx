import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Chatroom, Message } from '../types/Chatroom';
import { Link, To, useNavigate, useParams } from 'react-router-dom';
import AvatarWrapper from './AvatarWrapper';



interface ChatPreviewProps {
    chatroom: Chatroom;
}


const ChatPreview: React.FC<ChatPreviewProps> = ({ chatroom }) => {
    const getLastMsg = (chatroom:Chatroom) =>  chatroom.messages.sort((a,b) => new Date(a.created).getTime() - new Date(b.created).getTime()).slice(-1)[0];
    const { chatid } = useParams();
    const navigate = useNavigate();
    const lastMsg = getLastMsg(chatroom);
    const lastContentPreview = (message: Message) => {
        let text = "";
        if (message === undefined) {
            return text;
        }
        message.content.forEach(el => text += el.value);
        const limit = 30;
        if (text.length >= limit) {
            text = text.slice(0,limit) + " ..."
        }
        return text;
    }
    const handleClick = (destUrl: string) => {
        //navigate("/" + chatroom._id);
    }
    if (lastMsg === undefined || lastMsg === null) {
        return <></>;
    }

    const isSelected = chatid !== undefined && chatid === chatroom._id;
    return (
        <Link to={"/" + chatroom._id } style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton selected={isSelected} divider={true}>
                <Box sx={{display:"flex", alignContent: "center", flexDirection: "row", width:"100%"}}>
                    <Box sx={{flexGrow: 1, display: 'flex', flexDirection:'row'}}>
                        <ListItemAvatar sx={{alignSelf: 'center'}}>
                            <AvatarWrapper name={chatroom.name ?? ""}/>
                        </ListItemAvatar>
                        <ListItemText primary={chatroom.name} secondary={lastContentPreview(lastMsg)} sx={{flexGrow:1}} />
                    </Box>
                    <Box sx={{justifySelf: "end"}}>
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
                </Box>
            </ListItemButton>
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