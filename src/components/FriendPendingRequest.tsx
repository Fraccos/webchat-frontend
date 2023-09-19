import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { ListItemButton, Box, ListItemAvatar, ListItemText, Typography, List, Button, ListItem, Alert } from '@mui/material';
import AvatarWrapper from './AvatarWrapper';
import { FriendshipRequest } from '../types/FriendshipRequest';
import { cAPIWrapper, methodHTTP } from '../services/HttpWrapper';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CenteredSpinner from './CenteredSpinner';

interface FriendPendingRequestProps {
    currentUser: User
    friendshipsReq: FriendshipRequest[];
    updateFriendshipsReq: (newReqs: FriendshipRequest[]) => void
}

const FriendPendingRequest: React.FC<FriendPendingRequestProps> = ({  currentUser, friendshipsReq,updateFriendshipsReq}) => {
    const [isLoading, setLoading] = useState(false);

    const handleResponse = (reqId: string, accept:boolean) => {
        let url = "/friends/acceptrequest";
        let method: methodHTTP = 'POST';
        if (!accept) {
            url = "/friends/rejectrequest";
            method = 'DELETE'
        }
        setLoading(true);
        cAPIWrapper.req(url,method, {
            data: {
                requestID: reqId
            },
        }).then(
            (res) => {
                updateFriendshipsReq( friendshipsReq.filter(r => r._id.toString() !== reqId) )
        }).finally(
            ()=>setLoading(false)
        )
    }


    return (
        <>  
            {isLoading ? <CenteredSpinner/> : <>
                {friendshipsReq.length === 0 &&
                    <Alert severity="success">Non hai nessuna richiesta di amicizia pendente</Alert>
                }
                <List>
                    {friendshipsReq.map(req => 
                    <ListItem divider={true}>
                        <Box sx={{display:"flex", alignContent: "center", flexDirection: "row", width:"100%"}}>
                            <Box sx={{flexGrow: 1, display: 'flex', flexDirection:'row'}}>
                                <ListItemAvatar sx={{alignSelf: 'center'}}>
                                    <AvatarWrapper name={req.sender.username}/>
                                </ListItemAvatar>
                                <ListItemText primary={req.sender.username} secondary={req.message} sx={{flexGrow:1}} />
                            </Box>
                            <Box sx={{justifySelf: "end", alignSelf: "center"}}>
                                <Box sx={{display: "flex", flexDirection: "row"}}>
                                    <Button variant="contained" color="success" endIcon={<ThumbUpAltIcon />} onClick={()=>handleResponse(req._id,true)}>
                                        Accetta
                                    </Button>
                                        <Button sx={{marginLeft: '10px'}} variant="contained" color="error" endIcon={<ThumbDownAltIcon />} onClick={()=>handleResponse(req._id,false)}>
                                        Riufiuta
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </ListItem>)}
                </List>
            </>}
        </>
    );
};

export default FriendPendingRequest;
