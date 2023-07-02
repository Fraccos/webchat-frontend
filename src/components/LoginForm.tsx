import { Box, Button, Container, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import { Check } from '@mui/icons-material';
import { cAPIWrapper } from '../services/HttpWrapper';

interface LoginFormProps {
    handleUserUpdate: (user:User, token: string) => void
}

type UserInput = {
    email:string
    password: string,

}
const LoginForm: React.FC<LoginFormProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [input, setInput] = useState<UserInput>({email:"", password:""});

    const navigate = useNavigate();

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        cAPIWrapper.post("/users/login", {
            data: input
        }).then(
            (res) => {
                if (res.status === 200) {
                    props.handleUserUpdate(res.data.user, res.data.token);
                    navigate("/");
                }
                else {
                    setError(res.data.msg);
                }
            }
        ).catch( (e) => {
            setError(e);
        })

        
    }

    const isFormFilled=()=>{
        let errorFound = false; 
        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-z]+$/);
        if (input.email.length === 0){
            return false;
        } 
        else if (input.password.length === 0) {
            return false;
        }
        else if (!emailRegex.test(input.email)) {
            return false;
        }   
        return true;
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
                    type="email"
                    value={input.email} onChange={(e)=>{setInput({...input, email:e.target.value})}}/>
                </Box>
                <Box>
                    <TextField type={showPassword ? 'text' : 'password'} variant="outlined" label="Password"
                        value={input.password}
                        onChange={(e)=>{setInput({...input, password:e.target.value})}}
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
                </Stack>
                <Button
                    variant="outlined" type="submit" disabled={!isFormFilled()} >
                    Login
                </Button>
            </Stack>  
        </>
    );
};

export default LoginForm;
