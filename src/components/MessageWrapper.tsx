import React from 'react';
import { Message } from '../types/Chatroom';
import { Box } from '@mui/material';
import InfoMessage from './InfoMessage';
import PrivateMessage from './PrivateMessage';
import { User } from '../types/User';
import GroupMessage from './GroupMessage';

interface MessageWrapperProps {
    message: Message;
    chatType: string;
    user?: User;
    usernamesMap:any
    handleMsgClick?: (event: React.MouseEvent<HTMLElement>) => void;
    filterMsg: string;
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({ message, chatType, user, handleMsgClick,usernamesMap,filterMsg }) => {
    const isInfoMessage = (msg: Message) => {
        const content = msg.content;
        if (msg.content.length === 1) {
            if (msg.content[0].type === "notification") {
                return true;
            }
        }
        return false;
    }
 
    
    return (
        <>
            {isInfoMessage(message) ? 
                <InfoMessage message={message}></InfoMessage> :
                
                user !== undefined && handleMsgClick !== undefined ?
                    <>
                    {chatType === "single" &&
                        <PrivateMessage 
                            message={message}
                            handleMsgClick={handleMsgClick}
                            user={user}  ></PrivateMessage>
                    }
                    {chatType === "group" &&
                        <GroupMessage 
                            message={message}
                            handleMsgClick={handleMsgClick}
                            usernamesMap={usernamesMap}
                            user={user}  ></GroupMessage>
                    }
                    </>
                : null
                
            }
            
        </>
    );
};

export default MessageWrapper;
