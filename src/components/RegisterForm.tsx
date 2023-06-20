import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../types/User';
import { Link } from 'react-router-dom';

interface RegisterFormProps {
    currentUser: User
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [User, setUser] = useState<User>({username:"", email:""});

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        props.setCurrentUser(User)
    }

    const checkRegister=()=>{
        let UserKey=Object.keys(User)
        let errorFound = false; 
        if (User.email.length===0){
            errorFound = true;
        } else if (User.username.length===0){
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
                        value={User.username} onChange={(e)=>{setUser({...User, username:e.target.value})}}/>
                </Box>
                <Box>
                    <TextField 
                        sx={{width:"270px"}} label="Email" variant="outlined"
                        value={User.email} onChange={(e)=>{setUser({...User, email:e.target.value})}}/>
                </Box>
                <Box>
                    <TextField type={showPassword ? 'text' : 'password'} variant="outlined" label="Password"
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
