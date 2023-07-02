import React from 'react';
import { Message } from '../types/Chatroom';
import { Avatar, Box, IconButton, Stack, Tooltip, withStyles } from '@mui/material';
import { User } from '../types/User';
import AvatarWrapper from './AvatarWrapper';

interface GroupMessageProps {
    message: Message;
    user: User;
    usernamesMap: any;
    handleMsgClick: (event: React.MouseEvent<HTMLElement>) => void;
}



const GroupMessage: React.FC<GroupMessageProps> = ({ message,user,handleMsgClick,usernamesMap }) => {
    const isSentByUser = user._id === message.sender;
    if (message.sender === undefined) {
        throw new Error("Sender undefined");
    }
    let posFlexbox = isSentByUser ? "end": "start";
    let color = isSentByUser?"#28d5b3":"#bbbbbb" ; 

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
                        <span style={{float: "right" , fontSize:"12px"}}>
                            {new Date(message.created).toLocaleTimeString("it-it", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                            }) }</span>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default GroupMessage;
