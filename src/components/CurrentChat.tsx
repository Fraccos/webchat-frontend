import React, { useEffect, useRef, useState } from 'react';
import { Chatroom } from '../types/Chatroom';
import PrivateMessage from './PrivateMessage';
import { User } from '../types/User';
import { Box, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { cAPIWrapper } from '../services/HttpWrapper';
import MessageWrapper from './MessageWrapper';

interface CurrentChatProps {
    currentChat: Chatroom
    user:User
    usernamesMap: any
}

const CurrentChat: React.FC<CurrentChatProps> = ({ currentChat, user, usernamesMap }) => {
    const [msgInput, setMsgInput] = useState("");
    const [msgMenuAnchor, setMsgMenuAchor] = useState<HTMLElement>();
    const [isMenuOpen, setMenuOpen] = useState(false)

    const [scrollPrc, setScrollPrc] = useState(0);
    
    const messageContainerRef = useRef<HTMLDivElement>(null);
    
    const usePreviousValue = <T,> (value: T) => {
        const ref = useRef<T>();
        useEffect(() => {
            ref.current = value; 
        });
        return ref.current;
    }

    const prevChat = usePreviousValue<Chatroom>(currentChat);

    const scrollToBottom = () => {
        const msgContainerEl = messageContainerRef.current;
        if (msgContainerEl) {
            msgContainerEl.scrollTop = msgContainerEl.scrollHeight;
        }    
    }

    useEffect(()=>{
        if (prevChat !== undefined) {
            if (prevChat._id === currentChat._id) {
                if (scrollPrc >= 70) {
                    scrollToBottom();
                }
            }
        }        
    }, [currentChat.messages.length])


    useEffect(()=>{
        scrollToBottom();
    }, [currentChat._id])

    const handleMsgClick = (event: React.MouseEvent<HTMLElement>) => {
        setMsgMenuAchor(event.currentTarget);
        setMenuOpen(!isMenuOpen);
    }
    const handleMenuClose = () => {
        setMenuOpen(false);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (msgInput.length > 0) {
            setMsgInput("");
            cAPIWrapper.post("/chats/message/create", {
                data: {
                    "chatroomId": currentChat._id,
                    "message": {
                        "content": [{
                            "type": "text",
                            "value": msgInput
                        }]    
                    }
                }
            }).then(
                (res) => {
                    
                }   
            )
        }
    }
    const handleScrollChange = (e:  React.UIEvent<HTMLDivElement, UIEvent>) => {
        const el = e.currentTarget;
        setScrollPrc( (el.scrollTop/ el.scrollHeight) * 100);
    }
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height:"90vh"
        }}>
            <Menu
                id="basic-menu"
                anchorEl={msgMenuAnchor}
                open={isMenuOpen}
                onClose={()=>setMenuOpen(false)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleMenuClose}>Elimina</MenuItem>
                <MenuItem onClick={handleMenuClose}>Modifica</MenuItem>
            </Menu>
            <div 
                ref={messageContainerRef}
                onScroll={(e) => handleScrollChange(e)}
                style={{flex : "1 1 0", overflowY: "scroll", marginBottom: "10px"}}>
                {currentChat.messages.map(msg => 
                    <MessageWrapper 
                        chatType={currentChat.type ?? "single"}
                        message={msg}
                        usernamesMap={usernamesMap}
                        handleMsgClick={handleMsgClick}
                        user={user}               />
                )}


            </div>
            <Box sx={{margin: "0px 10px 0px 5px"}}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        sx={{width: "100%"}}
                        value={msgInput}
                        onChange={(e)=> setMsgInput(e.target.value)}
                        placeholder='Invia un messaggio'
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SendIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </Box>
        </Box>
    );
};

export default CurrentChat;
