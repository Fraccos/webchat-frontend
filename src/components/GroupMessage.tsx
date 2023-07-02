import React from 'react';
import { Chatroom, Message } from '../types/Chatroom';
import { Avatar, Box, IconButton, Stack, Tooltip, withStyles } from '@mui/material';
import { User } from '../types/User';
import AvatarWrapper from './AvatarWrapper';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';

interface GroupMessageProps {
    message: Message;
    user: User;
    usernamesMap: any;
    handleMsgClick: (event: React.MouseEvent<HTMLElement>) => void;
    chat: Chatroom;
}



const GroupMessage: React.FC<GroupMessageProps> = ({ message,user,handleMsgClick,usernamesMap,chat }) => {
    const isSentByUser = user._id === message.sender;
    if (message.sender === undefined) {
        throw new Error("Sender undefined");
    }
    let posFlexbox = isSentByUser ? "end": "start";
    let color = isSentByUser?"#28d5b3":"#bbbbbb" ; 

    const isMsgReaded =  (msg: Message) => {
        const usersRead = chat.members?.filter( u => u != user._id );
        if (usersRead !== undefined) {
            const lastReadTimeArray = usersRead.map(u => new Date(chat.lastRead[u ??""]).getTime());
            let read = true;
            const msgCreationTime = new Date(msg.created).getTime();
            lastReadTimeArray.forEach( readedTime => {
                if (readedTime < msgCreationTime) {
                    read = false
                }
            })
            return read;
        }
        return false;
    }
    return (
        <>
                    <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: posFlexbox,
                    margin: "10px 10px 0 10px"

                }}
            >
                <Tooltip 
                    placement='top' 
                    sx={{ "& .MuiTooltip-tooltip": { margin: "1px !important" } }}
                    title={message.sender === user._id ? user.username : usernamesMap[message.sender] ?? "Caricamento..."} 
                    
                    arrow>
                    <IconButton disableRipple>
                        <AvatarWrapper name={message.sender === user._id ? user.username : usernamesMap[message.sender] ?? null} sx={{alignSelf: "end", marginRight: "5px"}}></AvatarWrapper>
                    </IconButton>
                </Tooltip>
                <Box sx={{
                    padding: "10px 10px 10px 10px",
                    borderRadius: "10px 10px 10px 0px",
                    backgroundColor: color,
                    maxWidth: "60%"
                }}>
                    <div onClick={(e)=>handleMsgClick(e)}>
                        {message.content.map(chunk => <p style={{margin:"0"}}>{chunk.value}</p>)}
                        <Box sx={{display: "flex", flexDirection: "row", alignContent:"center", alignItems:"center", width: "100%"}}>
                            {isSentByUser &&<Box sx={{justifySelf: "start"}}>
                                {isMsgReaded(message) ? <DoneAllIcon color='primary'/> :  <CheckIcon/>}
                            </Box>}
                            <Box sx={{justifySelf:"end", flexGrow: 1}}>
                                <span style={{float: "right" , fontSize:"12px"}}>
                                {new Date(message.created).toLocaleTimeString("it-it", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        
                                }) }</span>
                            </Box>
                            
                        </Box>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default GroupMessage;
