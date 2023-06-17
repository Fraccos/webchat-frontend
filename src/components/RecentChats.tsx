import React from 'react';
import ChatPreview from './ChatPreview';

interface RecentChatsProps {
    
}

const RecentChats: React.FC<RecentChatsProps> = ({  }) => {
    return (
        <>
            {[1,2,3,4].map( el => 
                <ChatPreview
                    key={el}
                />
            )}

        </>
    );
};

export default RecentChats;
