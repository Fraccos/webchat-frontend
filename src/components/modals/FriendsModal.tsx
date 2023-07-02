import React, { useState } from 'react';
import ModalWrapper, { ModalWrapperProps } from './ModalWrapper';
import { Box, ButtonGroup, Button } from '@mui/material';
import FriendsList from '../FriendsList';
import { User } from '../../types/User';
import AddFriend from '../AddFriend';
import FriendPendingRequest from '../FriendPendingRequest';
import { FriendshipRequest } from '../../types/FriendshipRequest';
import ConfirmInputDialog from '../dialogs/ConfirmInputDialog';

interface FriendsModalProps extends ModalWrapperProps {
    currentUser: User;
    friendshipsReq: FriendshipRequest[];
}

const FriendsModal: React.FC<FriendsModalProps> = ({ open, toggleOpen, currentUser,friendshipsReq}) => {
    const [mode, setMode] = useState("requestList");
    const [showDelFriendDialog, setDelFriendDialog] = useState(false);

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
            <ModalWrapper open={open} toggleOpen={toggleOpen} sx={{display:  showDelFriendDialog ?  "none": "inherit"}} >
                <Box sx={{display:'flex', justifyItems:'center'}}>
                    <ButtonGroup variant="outlined" fullWidth aria-label="outlined primary button group" sx={{width: '100%'}}>
                        {modeList.map(el => 
                            <Button
                                variant={mode === el.type ? "contained": "outlined"}
                                onClick={()=>setMode(el.type)}
                                key={el.type}
                                >
                                {el.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Box>
                <Box sx={{marginTop: '20px'}}>
                    {mode === "friendsList" &&
                        <FriendsList 
                            toggleDelDialog={()=>setDelFriendDialog( prev => !prev)}
                            showDelDialog={showDelFriendDialog}
                            currentUser={currentUser}
                            ></FriendsList>
                    }
                    {mode === "searchFriend" &&
                        <AddFriend currentUser={currentUser}></AddFriend>
                    }
                    {mode === "requestList" &&
                        <FriendPendingRequest 
                            currentUser={currentUser}
                            friendshipsReq={friendshipsReq}
                        ></FriendPendingRequest>
                    }
                </Box>
            </ModalWrapper>
            
        </>
    );
};

export default FriendsModal;
