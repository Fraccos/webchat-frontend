import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CurrentChat from '../components/CurrentChat';
import { Grid } from '@mui/material';


interface HomeProps {
    
}

const HomePage: React.FC<HomeProps> = (props) => {
  return (
    <>
      <Header/>
      <Grid container spacing={0.5}>
        <Grid xs={4}>
          <Sidebar/>
        </Grid>
        <Grid xs={8}>
          <CurrentChat/>
        </Grid>
      </Grid>
    </>
  )
    
}

export default HomePage;