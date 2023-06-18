import { Container, Box } from '@mui/material';
import React from 'react';


interface LoginProps {
    
}

const LoginPage: React.FC<LoginProps> = (props) => {
  return (
    <>
      <Container sx={{border: "black", padding:"50px"}}>
        <h1>Hello World</h1>
      </Container>
        
    </>
  )
    
}

export default LoginPage;