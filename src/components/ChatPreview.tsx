import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ChatPreviewProps {
}

const ChatPreview: React.FC<ChatPreviewProps> = ({  }) => {
    return (
        <ListItem
            secondaryAction={
                <Box>
                    <Typography component="p">
                        23:32
                    </Typography>
                    <Typography component="span">
                        XX
                    </Typography>
                </Box>
            }
            divider={true}
            >
            <ListItemAvatar>
            <Avatar>
                
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
    )
    /*
    return (
        <>
            <Stack direction="row">
                <Box>
                    <IconButton 
                    color="inherit"
                    size="medium">
                    <AccountCircleIcon 
                        fontSize='medium'/>
                    </IconButton>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Typography component="p">
                        NOME
                    </Typography>
                    <Typography component="span">
                        DESCRIZIONE
                    </Typography>
                </Box>
                <Box>
                    <Typography component="p">
                        23:32
                    </Typography>
                    <Typography component="span">
                        XX
                    </Typography>
                </Box>
            </Stack>
        </>
    );*/
};

export default ChatPreview;