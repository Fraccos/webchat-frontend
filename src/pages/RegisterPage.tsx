import { Container } from '@mui/material';
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { User } from '../types/User';


interface RegisterProps {

}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <RegisterForm />
      </Container>
    </>
  )
    
}

export default RegisterPage;