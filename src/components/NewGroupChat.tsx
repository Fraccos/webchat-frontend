import React, { useState } from 'react';
import { User } from '../types/User';
import SearchUserInput from './SearchUserInput';
import { Alert, Box, Button, Typography } from '@mui/material';
import { cAPIWrapper } from '../services/HttpWrapper';

interface NewGroupChatProps {
    currentUser: User;
}

const NewGroupChat: React.FC<NewGroupChatProps> = ({currentUser  }) => {
    const [inputSearchUsers, setInputSearchUsers] = useState<User[]>([]);
    const isValid = () => {
        if (inputSearchUsers.length === 1) {
            return true;
        }
        return false;
    }

    const createNewSingle = () => {
        if (isValid()) {
            const members = [...inputSearchUsers, currentUser._id];
            const owners = members;
            cAPIWrapper.post("/chats/create", {
                data: {
                    members: members,
                    owners: owners,
                    type: "group"
                }
            })
        }
    }
    const disabled = !isValid();
    return (
        <>
            <Alert severity="warning"><strong>ATTENZIONE</strong> puoi aggiungere ad un gruppo solo i tuoi amici, ma ricorda che puoi mandare richieste di amicizia in qualsiasi momento</Alert>

            <SearchUserInput 
                            value={inputSearchUsers}
                            onChange={setInputSearchUsers}
                            label='Aggiungi i tuoi amici al gruppo'
                            placeholder='Cerca un tuo amico dal suo username'
                            maxLimit={5}
                            friendOnly={true}
                            hideUser={currentUser}
                        />
            <Box sx={{display: "flex", justifyContent: "center", marginTop: '10px'}}>
                <Button variant="contained" disabled={disabled} onClick={()=>createNewSingle()}>Inzia la conversazione</Button>
            </Box> 
        </>
    );
};

export default NewGroupChat;
