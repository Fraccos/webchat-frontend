import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';


interface TeamPageProps {
}

const TeamPage: React.FC<TeamPageProps> = ({  }) => {
    return (
        <>
            <Stack 
                direction="row" spacing={8} justifyContent={"center"} paddingTop={"50px"}
                divider={<Divider orientation="vertical" color="#fc7703" flexItem />}>
                <Stack justifyContent={"center"} direction="column">
                    <img src={process.env.PUBLIC_URL+"/teamImages/Andriulo.jpg"} width={'auto'} height={'350px'} border-radius= {"8px"}/>
                    <Typography variant="h6" textAlign="center">Francesco Cosimo Andriulo</Typography>
                </Stack>
                <Box>
                    <img src={process.env.PUBLIC_URL+"/teamImages/Traversa.jpg"} width={'auto'} height={'350px'} border-radius= {"8px"}/>
                    <Typography variant="h6" textAlign="center">Emanuele Traversa</Typography>
                </Box>
                <Box>
                    <img src={process.env.PUBLIC_URL+"/teamImages/Zizzo.jpg"} width={'auto'} height={'350px'} border-radius= {"8px"}/>
                    <Typography variant="h6" textAlign="center">Vera Zizzo</Typography>
                </Box>
            </Stack>
        </>
    );
};

export default TeamPage;