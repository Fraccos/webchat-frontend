import { Container, Box } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { User } from '../types/User';


interface LoginProps {
  handleUserUpdate: (user:User, token: string) => void
}

const LoginPage: React.FC<LoginProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <LoginForm 
          handleUserUpdate={props.handleUserUpdate}
        />
      </Container>
    </>
  )
    
}

export default LoginPage;