import { Box, Button, Container, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface LoginFormProps {
    
}


const LoginForm: React.FC<LoginFormProps> = ({  }) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    return (
        <>
            <Stack
            spacing={2} 
            component="form"
            alignItems="center"
            justifyContent="center"
            sx={{paddingBottom:"20px", paddingTop:"20px", border:1, borderColor:"Blue"}}>
                <Typography variant="h4" color="blue">Effettua il login</Typography>
                <Box>
                    <TextField sx={{width:"270px"}} label="Username" variant="outlined"/>
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
                    <Button sx={{fontSize:"8px"}}>
                        Non hai un account? Registrati
                    </Button>
                    <Button sx={{fontSize:"8px"}}>
                        Hai dimenticato la password?
                    </Button>
                    
                </Stack>
                <Button
                variant="outlined">
                    Login
                </Button>
            </Stack>  
        </>
    );
};

export default LoginForm;
//non funziona space-between