import React, { useState } from 'react';
import { User } from '../types/User';
import SearchUserInput from './SearchUserInput';
import { Box, Button, TextField } from '@mui/material';
import { cAPIWrapper } from '../services/HttpWrapper';
import NotificationService from '../services/NotificationService';

interface AddFriendProps {
    currentUser: User; 
}

const AddFriend: React.FC<AddFriendProps> = ({  currentUser  }) => {
    const [newFriend, setNewFriend] = useState<User[]>([]);
    const [requestText, setRequestText] = useState("");

    const handleFriendsUpdate = (newValue: User[]) => {
        setNewFriend(newValue);
    }
    const isValid = () => {
        if (newFriend.length !== 1) {
            return false;
        }
        if (requestText.length < 1) {
            return false;
        }
        return true;
    }
    const disabled = !isValid();

    const sendFriendRequest = () => {
        cAPIWrapper.post("/friends/sendrequest", {
            data: {
                receiver: newFriend[0]._id,
                message: requestText
            }
        }).then( res=> NotificationService.push(
            {
                type: "success",
                content: "Richiesta di amicizia inviata con successo",
                insertionDate: new Date()
            }
        )).catch( (e) => console.error(e));
    }

    return (
        <>
            <SearchUserInput 
                label={'Cerca un nuovo amico'} 
                placeholder={'Cerca un amico dal suo username'} 
                maxLimit={1} 
                value={newFriend} 
                onChange={handleFriendsUpdate}
                hideUser={currentUser}
                hideFriends={true}
            />

            <TextField
                sx={{marginTop:"10px"}}
                value={requestText}
                fullWidth
                placeholder='Messaggio della richiesta'
                onChange={(e)=>setRequestText(e.target.value)}
            />

            <Box sx={{display: "flex", justifyContent: "center", marginTop: '10px'}}>
                <Button variant="contained" disabled={disabled} onClick={sendFriendRequest}>Manda richiesta</Button>
            </Box> 
        </>
    );
};

export default AddFriend;
 