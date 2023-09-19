import { Avatar, Badge, Chip, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Chatroom, Message } from '../types/Chatroom';
import { Link, To, useNavigate, useParams } from 'react-router-dom';
import AvatarWrapper from './AvatarWrapper';
import { User } from '../types/User';
import { cAPIWrapper } from '../services/HttpWrapper';

interface ChatPreviewProps {
    chatroom: Chatroom;
    currentUser: User;
}


const ChatPreview: React.FC<ChatPreviewProps> = ({ chatroom,currentUser }) => {
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
    const isInfoMessage = (msg: Message) => {
        const content = msg.content;
        if (msg.content.length === 1) {
            if (msg.content[0].type === "notification") {
                return true;
            }
        }
        return false;
    }
    const countUnreadMessages = () => {
        if (currentUser._id !== undefined) {
            const lastReadDate = chatroom.lastRead[currentUser._id]
            const lastReadTime= new Date(lastReadDate).getTime();
            let i = 0;
            chatroom.messages.forEach( msg => {
                if (msg.sender?.toString() !== currentUser._id && !isInfoMessage(msg)) {
                    if (lastReadTime < new Date(msg.created).getTime()) {
                        i++;
                    }    
                }
            })
            return i;
        }
        return 0;
    }
    const unreadMsgCounter = countUnreadMessages();
    const isSelected = chatid !== undefined && chatid === chatroom._id;

    const updateLastReaded = () => {
        cAPIWrapper.put("/chats/updatelastread", {
            data: {
                chatroomId: chatroom._id
            }
        })
    }
    return (
        <Link to={"/" + chatroom._id } style={{ textDecoration: 'none', color: 'inherit' }} onClick={()=>updateLastReaded()}>
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
                            {unreadMsgCounter > 0 &&
                                <Box sx={{display: "flex", justifyContent:"center"}}>
                                <Chip label={unreadMsgCounter} size="small" color="primary"/>
                                </Box>
                            }
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