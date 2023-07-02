import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../types/User';
import { Link, useNavigate } from 'react-router-dom';
import { cAPIWrapper } from '../services/HttpWrapper';

interface RegisterFormProps {
}

type userForm = {
    email: string,
    username: string,
    password: string,
    passwordConfirm: string
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [error, setError] = useState<string>();
    const [userForm, setUserForm] = useState<userForm>({email: "", password:"", username: "", passwordConfirm: ""});

    const navigate = useNavigate();

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        cAPIWrapper.post("/users/register", {
            data: userForm
        }).then(
            (res) => {
                if (res.status === 200) {
                    navigate("/login");
                }
                else {
                    setError(res.data.msg);
                }
            }
        ).catch( (e) => {
            setError(e);
        })
    }

    const checkRegister=()=>{
        let UserKey=Object.keys(userForm)
        let errorFound = false; 
        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-z]+$/);
        if (userForm.email.length===0){
            errorFound = true;
        } else if (userForm.username.length===0){
            errorFound = true;
        }
        else if (!emailRegex.test(userForm.email)) {
            errorFound = true;
        }   
        else if (userForm.passwordConfirm !== userForm.password) {
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
                        value={userForm.passwordConfirm}
                        onChange={(e)=> setUserForm({...userForm, passwordConfirm: e.target.value} )}
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
