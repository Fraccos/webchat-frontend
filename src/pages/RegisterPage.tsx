import { Container } from '@mui/material';
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { User } from '../types/User';


interface RegisterProps {
  currentUser: User
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <RegisterForm currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} />
      </Container>
    </>
  )
    
}

export default RegisterPage;