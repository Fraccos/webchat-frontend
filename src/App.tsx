import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { User } from './types/User';
import ChatPage from './pages/ChatPage';
import { cAPIWrapper } from './services/HttpWrapper';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { socket } from './services/socket';
import { Socket, io } from 'socket.io-client';
import { Chatroom, Message } from './types/Chatroom';


function App() {
  const navigate = useNavigate();
  const [JWT, setJWT] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<User>();
  
  const [isSocketConnected, setSocketConnected] = useState(false);

  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])

  const handleUserUpdate = (newUser:User, jwt: string) => {
    setCurrentUser(newUser);
    setJWT(jwt);
  }

  const onPushedMessage = (data: any) => {
    const chatroomId = data.id as string;
    const msg = data.message as Message;
    setChatrooms((prevChatrooms) => {
      const chatroom = prevChatrooms.find(el => el._id === chatroomId);
      if (chatroom) {
        chatroom.messages.push(msg)
      }
      return [...prevChatrooms];
    });
    
    
  }

  const initSocket = () => {
    const URL = "http://localhost:5000";

    const socket = io(URL, {
        auth: {
            token: JWT
        }
    });
    function onConnect() {
      setSocketConnected(true);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('pushedMessage', onPushedMessage);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('pushedMessage', onPushedMessage);
    };
  }

  const initUser = () => {
    cAPIWrapper.post("/users/jwt/create").then(
      (res) => {
        handleUserUpdate(res.data.user, res.data.token);
      }
    ).catch( (er:AxiosError) => {
      if (er.response) {
        if (er.response.status === 401) {
          navigate("/login");
        }
      } 
    })
  }

  const requireAuth = () => {
    if (currentUser === undefined) {
      initUser();
    }
  }


  useEffect( () => {
    if (JWT.length > 0) {
      cAPIWrapper.get("/chats/latestedited/0").then((res)=> {
        try {
          const chats = res.data as Chatroom[]
          setChatrooms( chats );
          initSocket();
        } catch (e) {
          console.error(e);
        }
      })
    }
  }, [JWT])

  return (
    <div className="App">
      <Routes> 
        <Route path="/:chatid?" element={
          <HomePage
            chatrooms={chatrooms}
            requireAuth={requireAuth}
            user={currentUser}
          />} />
        <Route path="/login" element={<LoginPage handleUserUpdate={handleUserUpdate}/>} />
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </div>
  );
}

export default App;
