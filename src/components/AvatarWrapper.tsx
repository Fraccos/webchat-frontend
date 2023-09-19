import { Avatar, AvatarProps, CircularProgress, SxProps, Theme } from '@mui/material';
import React from 'react';
import { User } from '../types/User';

interface AvatarWrapperProps  {
    src?: string
    name: string | null,
    sx?: SxProps<Theme> | undefined;
}
const defBackgroundColor = [ '#7EE70E', '#FF1746', '#3C6DFF', '#AB23D8', '#21CC8D', '#28BBD1', '#DA5615', '#D1BD28', '#D128A1', '#3928D1' ];

const simpleColorHash = (name: string) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++)  {
       sum += name.charCodeAt(i)*(i+1);
    }
    return defBackgroundColor[sum % defBackgroundColor.length];
} 

const AvatarWrapper: React.FC<AvatarWrapperProps> = ({ name, src,sx  }) => {
    return (
        <>
            {name === null ?
                <CircularProgress size={30}/>:
                <>
                {  src ?
                    <Avatar alt={name} src={src} sx={sx}/> 
                    :
                    <Avatar sx={{textTransform: 'uppercase', ...sx, background: simpleColorHash(name)}}>{name.slice(0,1)}</Avatar>
                }
                </>
            }
        </>
    );
};

export default AvatarWrapper;
