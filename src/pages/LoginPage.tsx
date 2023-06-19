import { Container, Box } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';


interface LoginProps {
    
}

const LoginPage: React.FC<LoginProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <LoginForm></LoginForm>
      </Container>
    </>
  )
    
}

export default LoginPage;