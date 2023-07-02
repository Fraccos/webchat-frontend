import { List, ListItemAvatar, ListItem, ListItemText, Box, Button, Alert, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AvatarWrapper from './AvatarWrapper';
import { User } from '../types/User';
import { cAPIWrapper } from '../services/HttpWrapper';
import DeleteIcon from '@mui/icons-material/Delete';
import CenteredSpinner from './CenteredSpinner';
import ConfirmInputDialog from './dialogs/ConfirmInputDialog';

interface FriendsListProps {
    currentUser: User;
    toggleDelDialog: () => void;
    showDelDialog: boolean;

}

const FriendsList: React.FC<FriendsListProps> = ({ currentUser,toggleDelDialog,showDelDialog }) => {
    const [delFriend, setDelFriend] = useState<User>();
    const [friends, setFriends] = useState<User[]>([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        cAPIWrapper.get(`/users/friends/retrive/${currentUser._id}` ).then(
            res => setFriends(res.data)
        ).finally( ()=>
            setLoading(false)
        )
    },[])

    const openDelDialog = ( u: User) => {
        setDelFriend(u);
        toggleDelDialog();
    }


    const deleteFriend = () => {
        setLoading(true)
        cAPIWrapper.del(`/users/friends/remove`, {
            data: {
                oldFriend: delFriend?._id
            }
        } ).then(
            //res => setFriends(res.data)
        ).finally( ()=>
            setLoading(false)
        )
        
    }
    return (
        <>
            {isLoading ? <CenteredSpinner /> :
            <List>
                {friends.length === 0 &&
                    <Alert severity="info">Al momento non hai ancora amici, inzia a inviare nuove richieste di amicizia</Alert>
                }
                {friends.map(friend => 
                <ListItem divider={true}>
                    <Box sx={{display:"flex", alignContent: "center", flexDirection: "row", width:"100%"}}>
                        <Box sx={{flexGrow: 1, display: 'flex', flexDirection:'row'}}>
                            <ListItemAvatar sx={{alignSelf: 'center'}}>
                                <AvatarWrapper name={friend.username}/>
                            </ListItemAvatar>
                            <ListItemText primary={friend.username}  sx={{flexGrow:1}} />
                        </Box>
                        <Box sx={{justifySelf: "end", alignSelf: "center"}}>
                            <Box sx={{display: "flex", flexDirection: "row"}}>
                                <Button sx={{marginLeft: '10px'}} variant="contained" color="error" endIcon={<DeleteIcon />} onClick={()=>openDelDialog(friend)}>
                                    Rimuovi Amico
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </ListItem>)}
            </List>}
           {delFriend && <ConfirmInputDialog
                title="Elimina amico" 
                showDialog={showDelDialog} 
                toggleShowDialog={toggleDelDialog} 
                onConfirmCallback={()=>deleteFriend()} 
                textToConfirm={delFriend.username}                
            >
                Come precauzione, inserisci il nome dell'amico che si desidera eliminare, ovvero  <strong>{delFriend.username}</strong>
				<Alert color="info">
                    <strong>{delFriend.username}</strong> potrà sempre ricevere/inviare a te nuove richieste di amicizia in futuro
				</Alert>
                <Alert color="info" sx={{marginTop: "5px", marginBottom: "10px"}}>
                    Le chat e i gruppi in comune con <strong>{delFriend.username}</strong> non saranno eliminati
				</Alert>
            </ConfirmInputDialog>}
        </>
    );
};

export default FriendsList;
