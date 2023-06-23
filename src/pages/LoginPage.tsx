import { Container, Box } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { User } from '../types/User';


interface LoginProps {
  currentUser: User
  handleUserUpdate: (user:User, token: string) => void
}

const LoginPage: React.FC<LoginProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <LoginForm 
          currentUser={props.currentUser} 
          handleUserUpdate={props.handleUserUpdate}
        />
      </Container>
    </>
  )
    
}

export default LoginPage;