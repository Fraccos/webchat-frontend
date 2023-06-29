import React from 'react';
import {useParams} from 'react-router-dom'

interface ChatProps {
    
}

const ChatPage: React.FC<ChatProps> = (props) => {
  const { chatid } = useParams();
  return (
    <>
      {chatid === undefined && 
        <p>Seleziona una chat dal menu laterale</p> 
      }
      Qualcosa c'è
        
    </>
  )
    
}

export default ChatPage;