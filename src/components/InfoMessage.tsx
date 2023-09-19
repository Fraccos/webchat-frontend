import React from 'react';
import { Message } from '../types/Chatroom';
import { Box } from '@mui/material';

interface InfoMessageProps {
    message: Message;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message  }) => {
    const getInfoValue = (message: Message) => {
        return message.content[0].value;
    }
    return (
        <>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: "10px 10px 0 10px"
                }}>
                    <Box sx={{
                        padding: "10px 10px 10px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#acd5d7",
                    }}>
                        {getInfoValue(message)}
                    </Box>
                </Box>            
        </>
    );
};

export default InfoMessage;
