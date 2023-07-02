import React, { useState } from 'react';
import { User } from '../types/User';
import SearchUserInput from './SearchUserInput';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { cAPIWrapper } from '../services/HttpWrapper';
import NotificationService from '../services/NotificationService';

interface NewGroupChatProps {
    currentUser: User;
}

const NewGroupChat: React.FC<NewGroupChatProps> = ({currentUser  }) => {
    const [inputSearchUsers, setInputSearchUsers] = useState<User[]>([]);
    const [groupName, setGroupName] = useState("");
    const isFilled = () => {
        if (inputSearchUsers.length < 1) {
            return false;
        }
        if (groupName.length < 0) {
            return false;
        }
        return true;
    }

    const isValid = () => {
        if (groupName.length > 15) {
            NotificationService.push({
                type:"error",
                content:"Il nome può avere al più 15 caratteri",
                insertionDate: new Date(),
            })
            return false;
        }
        return true;
    }

    const createNewGroup = () => {
        if (isFilled()) {
            if (isValid()) {
                const members = [...inputSearchUsers.map(u => u._id), currentUser._id];
                const owners = members;
                cAPIWrapper.post("/chats/create", {
                    data: {
                        members: members,
                        owners: owners,
                        name: groupName,
                        type: "group"
                    }
                })
            }
        }
    }
    const disabled = !isFilled();
    return (
        <>
            <Alert severity="warning"><strong>ATTENZIONE</strong> puoi aggiungere ad un gruppo solo i tuoi amici, ma ricorda che puoi mandare richieste di amicizia in qualsiasi momento</Alert>

            <Box sx={{marginTop: '10px'}}>
                <SearchUserInput 
                            value={inputSearchUsers}
                            onChange={setInputSearchUsers}
                            label='Aggiungi i tuoi amici al gruppo'
                            placeholder='Cerca un tuo amico dal suo username'
                            maxLimit={5}
                            friendOnly={true}
                            hideUser={currentUser}
                        />
            </Box>
            <TextField
                placeholder='Nome del gruppo'
                value={groupName}
                onChange={e=>setGroupName(e.target.value)}
                sx={{marginTop:'10px'}}
            />
            <Box sx={{display: "flex", justifyContent: "center", marginTop: '10px'}}>
                <Button variant="contained" disabled={disabled} onClick={()=>createNewGroup()}>Inzia la conversazione</Button>
            </Box> 
        </>
    );
};

export default NewGroupChat;
