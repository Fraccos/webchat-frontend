import { Container, Box } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { User } from '../types/User';


interface LoginProps {
  currentUser: User
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

const LoginPage: React.FC<LoginProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <LoginForm currentUser={props.currentUser} setCurrentUser={props.setCurrentUser}/>
      </Container>
    </>
  )
    
}

export default LoginPage;