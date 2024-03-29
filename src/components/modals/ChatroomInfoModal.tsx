import React, { useState } from 'react';
import { Chatroom } from '../../types/Chatroom';
import { User } from '../../types/User';
import ModalWrapper, { ModalWrapperProps } from './ModalWrapper';
import AvatarWrapper from '../AvatarWrapper';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { cAPIWrapper } from '../../services/HttpWrapper';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmInputDialog from '../dialogs/ConfirmInputDialog';

interface ChatroomInfoModalProps extends ModalWrapperProps {
    chat: Chatroom;
    user: User;
    usernamesMap: any;
}

const ChatroomInfoModal: React.FC<ChatroomInfoModalProps> = ({ open, toggleOpen, chat, user, usernamesMap }) => {
    const [openConfirmDelete, setConfirmDelete] = useState(false);

    const toggleConfirmDelete = () => setConfirmDelete( (prev) => !prev);

    const deleteChat = ( ) => {
        cAPIWrapper.del("/chats/delete", {
            data : {
                chatroomId: chat._id
                
            }
        }).then(res => {
            toggleConfirmDelete();
        }).catch( e => console.error(e))
    }

    const canDelete = chat.type === "single" || (chat.type === "group" && chat.owners?.includes(user._id?.toString()))

    return (
        <>
            <ModalWrapper open={open} toggleOpen={toggleOpen} sx={{display:  openConfirmDelete ?  "none": "inherit"}}>
                <Stack direction={'column'}>
                    <Stack direction={"row"} justifyContent={"center"} sx={{height:"100%"}}>
                        <Stack direction={'column'} justifyContent={"center"} alignContent={"center"} alignItems={"center"} sx={{height:"100%"}}>
                            <AvatarWrapper sx={{fontSize: "2em", height: "80px", width: "80px"}} name={chat.name ?? "?"}></AvatarWrapper>
                            <h2><Box sx={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                                {chat.type === "single" ? <PersonIcon/> : chat.type === "group" ? <PeopleAltIcon/>: null} <span style={{marginLeft: "8px"}}>{chat.name}</span> 
                                </Box></h2>
                        </Stack>
                    </Stack>
                    <Box>
                            <h2 style={{marginLeft: "10px"}}>Lista Membri:</h2>
                            <List>
                                {chat.members !== undefined && chat.members.map(uId => uId ? <ListItem key={uId} divider={true}>
                                        <ListItemAvatar>
                                            <AvatarWrapper name={uId === user._id ? user.username : usernamesMap[uId] ?? null}></AvatarWrapper>
                                        </ListItemAvatar>
                                        <ListItemText>{uId === user._id ? user.username : usernamesMap[uId] ?? "Caricamento..."}</ListItemText>
                                    </ListItem> : null
                                )}
                            </List>
                    </Box>
                    <Stack flexDirection={"row"}  justifySelf={"end"}  justifyContent={"end"} justifyItems={"end"} alignItems={"end"}>
                        <Box alignSelf={"end"} sx={{marginTop: "10px"}}>
                            {canDelete && <Button color="error" variant='contained' onClick={()=>toggleConfirmDelete()}>Elimina</Button>}
                        </Box> 
                    </Stack>
                </Stack>
            </ModalWrapper>
            {chat.name && <ConfirmInputDialog
                title="Elimina chatroom" 
                showDialog={openConfirmDelete} 
                toggleShowDialog={toggleConfirmDelete} 
                onConfirmCallback={()=>deleteChat()} 
                textToConfirm={chat.name}                
            >
                Come precauzione, inserisci il nome della chat che si desidera eliminare, ovvero  <strong>{chat.name}</strong>
				<Alert color="warning">
					ATTENZIONE non sarà possibile riprisitinare i
					messaggi una volta eliminata la chat
				</Alert>
            </ConfirmInputDialog>}
        </>
    );
};

export default ChatroomInfoModal;
