import React, { useState } from 'react';
import ModalWrapper, { ModalWrapperProps } from './ModalWrapper';
import { Box, ButtonGroup, Button } from '@mui/material';
import FriendsList from '../FriendsList';
import { User } from '../../types/User';
import AddFriend from '../AddFriend';
import FriendPendingRequest from '../FriendPendingRequest';

interface FriendsModalProps extends ModalWrapperProps {
    currentUser: User;
}

const FriendsModal: React.FC<FriendsModalProps> = ({ open, toggleOpen, currentUser}) => {
    const [mode, setMode] = useState("requestList");

    const modeList = [
        {
            "name": "Lista Amici",
            "type": "friendsList"
        },
        {
            "name": "Richieste in attesa",
            "type": "requestList"
        },
        {
            "name": "Cerca un nuovo amico",
            "type": "searchFriend"
        },
    ]
    return (
        <>
            <ModalWrapper open={open} toggleOpen={toggleOpen} >
                <Box sx={{display:'flex', justifyItems:'center'}}>
                    <ButtonGroup variant="outlined" fullWidth aria-label="outlined primary button group" sx={{width: '100%'}}>
                        {modeList.map(el => 
                        <Button
                            variant={mode === el.type ? "contained": "outlined"}
                            onClick={()=>setMode(el.type)}
                            >
                            {el.name}
                        </Button>
                        )}
                    </ButtonGroup>
                </Box>
                <Box sx={{marginTop: '20px'}}>
                    {mode === "friendsList" &&
                        <FriendsList currentUser={currentUser}></FriendsList>
                    }
                    {mode === "searchFriend" &&
                        <AddFriend currentUser={currentUser}></AddFriend>
                    }
                    {mode === "requestList" &&
                        <FriendPendingRequest currentUser={currentUser}></FriendPendingRequest>
                    }
                </Box>
            </ModalWrapper>
        </>
    );
};

export default FriendsModal;
