import React from 'react';
import { Chatroom, Message } from '../types/Chatroom';
import { Box } from '@mui/material';
import { User } from '../types/User';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';
interface PrivateMessageProps {
    message: Message;
    user: User;
    handleMsgClick: (event: React.MouseEvent<HTMLElement>) => void;
    chat: Chatroom;
    
}

const PrivateMessage: React.FC<PrivateMessageProps> = ({ message,user,handleMsgClick,chat }) => {
    const isSentByUser = user._id === message.sender;
    if (message.sender === undefined) {
        throw new Error("Sender undefined");
    }
    let posFlexbox = isSentByUser ? "end": "start";
    let color = isSentByUser?"#28d5b3":"#bbbbbb" ; 

    const isMsgReaded =  (msg: Message) => {
        const userRead = chat.members?.find( u => u != user._id );
        if (userRead !== undefined) {
            const lastReadTime = chat.lastRead[userRead];
            if (lastReadTime !== undefined) {
                if (new Date(lastReadTime).getTime() >= new Date(msg.created).getTime() ) {
                    return true;
                }
            }
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
                        {isMsgReaded(message) ? <DoneAllIcon/> :  <CheckIcon/>}
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default PrivateMessage;
