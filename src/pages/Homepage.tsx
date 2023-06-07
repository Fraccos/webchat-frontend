import React from 'react';
import HeaderSidebar from '../components/HeaderSidebar';
import Sidebar from '../components/Sidebar';
import { Container, Grid } from '@mui/material';
import MainContent from '../components/MainContent';


interface HomeProps {
    
}

const HomePage: React.FC<HomeProps> = (props) => {
  return (
    <>
      <div>
        <Grid container spacing={0.5}>
          <Grid xs={4}>
            <HeaderSidebar/>
            <Sidebar/>
          </Grid>
          <Grid xs={8}>
            <MainContent/>
          </Grid>
        </Grid>
      </div>
    </>
  )
    
}

export default HomePage;