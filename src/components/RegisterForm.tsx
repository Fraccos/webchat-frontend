import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../types/User';
import { Link } from 'react-router-dom';

interface RegisterFormProps {

}

type userForm = {
    email: string,
    username: string,
    password: string,
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [userForm, setUserForm] = useState<userForm>({email: "", password:"", username: ""});

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
    }

    const checkRegister=()=>{
        let UserKey=Object.keys(userForm)
        let errorFound = false; 
        if (userForm.email.length===0){
            errorFound = true;
        } else if (userForm.username.length===0){
            errorFound = true;
        }
        return errorFound
      }


    return (
        <>
            <Stack
                spacing={2} 
                component="form"
                alignItems="center"
                justifyContent="center"
                onSubmit={(e) => handleSubmit(e)}
                sx={{paddingBottom:"20px", paddingTop:"20px", border:1, borderColor:"Blue"}}>
                <Typography variant="h4" color="blue">Registrati</Typography>
                <Box>
                    <TextField 
                        sx={{width:"270px"}} label="Username" variant="outlined"
                        value={userForm.username} onChange={(e)=>{setUserForm({...userForm, username:e.target.value})}}/>
                </Box>
                <Box>
                    <TextField 
                        sx={{width:"270px"}} label="Email" variant="outlined"
                        value={userForm.email} onChange={(e)=>{setUserForm({...userForm, email:e.target.value})}}/>
                </Box>
                <Box>
                    <TextField type={showPassword ? 'text' : 'password'} variant="outlined" label="Password"
                        value={userForm.password}
                        onChange={(e)=> setUserForm({...userForm, password: e.target.value} )}
                        InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )}}/>
                </Box>
                <Box>
                    <TextField type={showPassword ? 'text' : 'password'} variant="outlined" label="Conferma password"
                        InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )}}/>
                </Box>
                <Link to="/login">
                    <Button sx={{fontSize:"8px"}} >
                        Hai già un accunt? Accedi
                    </Button>
                </Link>
                <Button
                    variant="outlined" type="submit" disabled={checkRegister()}>
                    Registrati
                </Button>
            </Stack>  
        </>
    );
};

export default RegisterForm;
