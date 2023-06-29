import React, { useEffect } from 'react';
import HeaderSidebar from '../components/HeaderSidebar';
import Sidebar from '../components/Sidebar';
import { Container, Grid } from '@mui/material';
import MainContent from '../components/MainContent';
import { Chatroom } from '../types/Chatroom';
import { User } from '../types/User';


interface HomeProps {
  chatrooms: Chatroom[]
  user: User | undefined
  requireAuth: () => void;
}



const HomePage: React.FC<HomeProps> = ({chatrooms, user,requireAuth }) => {
  requireAuth();
  if (user === undefined) {
    return <></>
  }

  return (
    <>
      <div>
        <Grid container spacing={0.5}>
          <Grid xs={6} md={4}>
            <Sidebar 
              chatrooms={chatrooms}
            />  
          </Grid>
          <Grid xs={6} md={8}>
            <MainContent
              chatrooms={chatrooms}
              user={user}
            />
          </Grid>
        </Grid>
      </div>
    </>
  )
    
}

export default HomePage;