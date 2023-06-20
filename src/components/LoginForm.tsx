import { Box, Button, Container, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { Check } from '@mui/icons-material';

interface LoginFormProps {
    currentUser: User
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}


const LoginForm: React.FC<LoginFormProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [User, setUser] = useState<User>({username:"", email:""});

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        props.setCurrentUser(User)
    }

    const checkLogin=()=>{
        let UserKey=Object.keys(User)
        let errorFound = false; 
        if (User.email.length===0){
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
                <Typography variant="h4" color="blue">Effettua il login</Typography>
                <Box>
                    <TextField 
                    sx={{width:"270px"}} 
                    label="Email" variant="outlined"
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
                <Stack 
                direction="row">
                    <Link to="/register">
                        <Button sx={{fontSize:"8px"}}>
                            Non hai un account? Registrati 
                        </Button>
                    </Link>
                    <Button sx={{fontSize:"8px"}}>
                        Hai dimenticato la password?
                    </Button>
                </Stack>
                <Button
                    variant="outlined" type="submit" disabled={checkLogin()} >
                    Login
                </Button>
            </Stack>  
        </>
    );
};

export default LoginForm;
