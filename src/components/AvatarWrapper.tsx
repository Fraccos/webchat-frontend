import { Avatar, AvatarProps, SxProps, Theme } from '@mui/material';
import React from 'react';

interface AvatarWrapperProps  {
    src?: string
    name: string,
    sx?: SxProps<Theme> | undefined;
}

const AvatarWrapper: React.FC<AvatarWrapperProps> = ({ name, src,sx  }) => {
    return (
        <>
            {src ?
                <Avatar alt={name} src={src} sx={sx}/> 
                :
                <Avatar sx={{textTransform: 'uppercase', ...sx}}>{name.slice(0,1)}</Avatar>
            }
        </>
    );
};

export default AvatarWrapper;
