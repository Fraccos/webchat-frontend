import React from 'react';
import ChatPreview from './ChatPreview';
import { List } from '@mui/material';

interface RecentChatsProps {
    
}

const RecentChats: React.FC<RecentChatsProps> = ({  }) => {
    return (
        <List sx={{'width': '100%', 'paddingTop': '0'}}>
            {[1,2,3,4].map( el => 
                <ChatPreview
                    key={el}
                />
            )}

        </List>
    );
};

export default RecentChats;
