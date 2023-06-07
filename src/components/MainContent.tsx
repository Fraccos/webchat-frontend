import React from 'react';
import Chatbar from './Chatbar';
import CurrentChat from './CurrentChat';

interface MainContentProps {
}

const MainContent: React.FC<MainContentProps> = ({  }) => {
    return (
        <>
            <Chatbar/>
            <CurrentChat/>
            
        </>
    );
};

export default MainContent;
