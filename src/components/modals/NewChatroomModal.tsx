import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchUserInput from '../SearchUserInput'
import { User } from '../../types/User';
import NewSingleChat from '../NewSingleChat';
import NewGroupChat from '../NewGroupChat';
import ModalWrapper from './ModalWrapper';
import AddFriend from '../AddFriend';

interface NewChatroomProps {
    open: boolean;
    currentUser: User;
    toggleOpen: () => void;
}

const NewChatroom: React.FC<NewChatroomProps> = ({ open, currentUser,toggleOpen }) => {
    
    const [mode, setMode] = useState("newSingle");

    const modeList = [
        {
            "name": "Crea un nuovo gruppo",
            "type": "newGroup"
        },
        {
            "name": "Nuova conversazione",
            "type": "newSingle"
        },
        {
            "name": "Cerca un nuovo amico",
            "type": "searchFriend"
        },
    ]
    return (
        <>
            <ModalWrapper open={open} toggleOpen={toggleOpen}>
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
                    <Box sx={{marginTop: "20px"}}>
                        {mode === "newSingle" && 
                            <NewSingleChat currentUser={currentUser} />
                        }
                        {mode === "newGroup" && 
                            <NewGroupChat currentUser={currentUser} />
                        }
                        {mode === "searchFriend" &&
                            <AddFriend currentUser={currentUser}></AddFriend>
                        }
                    </Box>
        </ModalWrapper>
        </>
    );
};

export default NewChatroom;
