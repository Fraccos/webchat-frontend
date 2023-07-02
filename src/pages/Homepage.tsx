import React, { useEffect, useState } from 'react';
import HeaderSidebar from '../components/HeaderSidebar';
import Sidebar from '../components/Sidebar';
import { Container, Grid } from '@mui/material';
import MainContent from '../components/MainContent';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';
import { useParams } from 'react-router-dom';
import NewChatroom from '../components/modals/NewChatroomModal';
import { FriendshipRequest } from '../types/FriendshipRequest';


interface HomeProps {
  chatrooms: Chatroom[]
  user: User | undefined
  requireAuth: () => void;
  usernamesMap: any
  friendshipsReq: FriendshipRequest[];
  friends: User[];
  updateFriendshipsReq: (newReqs: FriendshipRequest[]) => void
}



const HomePage: React.FC<HomeProps> = ({chatrooms, user,requireAuth,usernamesMap,friendshipsReq, updateFriendshipsReq, friends }) => {
  requireAuth();
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false);
  const { chatid } = useParams();
  if (user === undefined) {
    return <></>
  }
  let currentChat: undefined | Chatroom = undefined;
  if (chatid !== undefined) {
    currentChat = chatrooms.find( el => el._id === chatid);
  }

  
  const toggleNCModel = () => {
    setNewChatModalOpen((prev)=>!prev);
  }
  const lastCreatedChatrooms = ():Chatroom[] => {
    if (chatrooms) {
      return chatrooms;
    }
    return chatrooms;
  }
  return (
    <>
      <div>
        <Grid container spacing={0.5}>
          <Grid xs={6} md={4}>
            <Sidebar 
              currentChat={currentChat}
              currentUser={user}
              chatrooms={lastCreatedChatrooms()}
              toggleNCModel={toggleNCModel}
              friendshipsReq={friendshipsReq}
              friends={friends}
              updateFriendshipsReq={updateFriendshipsReq}
            />  
          </Grid>
          <Grid xs={6} md={8}>
            <MainContent
              currentChat={currentChat}
              chatrooms={chatrooms}
              usernamesMap={usernamesMap}
              user={user}
            />
          </Grid>
        </Grid>
        <NewChatroom 
          currentUser={user}
          open={isNewChatModalOpen} toggleOpen={toggleNCModel}
          ></NewChatroom>
      </div>
    </>
  )
    
}

export default HomePage;