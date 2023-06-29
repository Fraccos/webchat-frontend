import React from 'react';
import { Message } from '../types/Chatroom';
import { Box } from '@mui/material';
import { User } from '../types/User';

interface PrivateMessageProps {
    message: Message;
    user: User;
    handleMsgClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PrivateMessage: React.FC<PrivateMessageProps> = ({ message,user,handleMsgClick }) => {
    const isSentByUser = user._id === message.sender;
    if (message.sender === undefined) {
        throw new Error("Sender undefined");
    }
    let posFlexbox = isSentByUser ? "end": "start";
    let color = isSentByUser?"#06a082":"gray" ; 
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
                <Box sx={{
                    padding: "10px 10px 10px 10px",
                    borderRadius: "10px",
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

export default PrivateMessage;
