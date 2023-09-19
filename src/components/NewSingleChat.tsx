import React, { useState } from 'react';
import { User } from '../types/User';
import SearchUserInput from './SearchUserInput';
import { Box, Button, Typography } from '@mui/material';
import { cAPIWrapper } from '../services/HttpWrapper';

interface NewSingleChatProps {
    currentUser: User;
}

const NewSingleChat: React.FC<NewSingleChatProps> = ({currentUser  }) => {
    const [inputSearchUsers, setInputSearchUsers] = useState<User[]>([]);
    const isValid = () => {
        if (inputSearchUsers.length === 1) {
            return true;
        }
        return false;
    }

    const createNewSingle = () => {
        if (isValid()) {
            const members = [...inputSearchUsers.map(u => u._id), currentUser._id];
            const owner = members;
            cAPIWrapper.post("/chats/create", {
                data: {
                    members: members,
                    owner: owner,
                    type: "single"
                }
            }).catch(()=>{});
        }
    }
    const disabled = !isValid();
    return (
        <>
            <SearchUserInput 
                            value={inputSearchUsers}
                            onChange={setInputSearchUsers}
                            label='Cerca la persona con cui conversare'
                            placeholder='Cerca un utente dal suo username'
                            maxLimit={1}
                            friendOnly={false}
                            hideUser={currentUser}
                        />
            <Box sx={{display: "flex", justifyContent: "center", marginTop: '10px'}}>
                <Button variant="contained" disabled={disabled} onClick={()=>createNewSingle()}>Inzia la conversazione</Button>
            </Box> 
        </>
    );
};

export default NewSingleChat;
