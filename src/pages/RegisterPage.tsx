import { Container } from '@mui/material';
import React from 'react';
import RegisterForm from '../components/RegisterForm';


interface RegisterProps {
    
}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  return (
    <>
      <Container sx={{padding:"50px"}}>
        <RegisterForm></RegisterForm>
      </Container>
    </>
  )
    
}

export default RegisterPage;