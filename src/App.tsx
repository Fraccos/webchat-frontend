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
import { Alert, AlertColor, Box, CircularProgress, Snackbar } from '@mui/material';
import NotificationService, { NotifyMessage, notifyCallback } from './services/NotificationService';
import NewChatroom from './components/modals/NewChatroomModal';
import { FriendshipRequest } from './types/FriendshipRequest';


function App() {
  const navigate = useNavigate();
  const [JWT, setJWT] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<User>();
  
  const [isLoading, setLoading] = useState(false);

  const [isSocketConnected, setSocketConnected] = useState(false);

  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
  const [usernamesMap, setUsernamesMap] = useState<any>({})

  const [notification, setNotification] = useState<NotifyMessage>();
  const [showNotication, setShowNotification] = useState(false); 
  const [pendingReq, setPendingReq] = useState<FriendshipRequest[]>([]);

  const addNotification:notifyCallback = (n: NotifyMessage) => {
    setNotification(n);
    setShowNotification(true);
  }

  useEffect(()=>{
    NotificationService.serveAsDispachter(addNotification);
  },[])
  
  useEffect(()=>{
    //Verifica se dispone delle info (gli username)
    const missingUserSet = new Set<string>();
    chatrooms.forEach( (chat)=>{
      if (chat.members !== undefined) {
        chat.members.forEach( (uId) => {
          if (uId !== undefined) {
            if (usernamesMap[uId] === undefined) {
              missingUserSet.add(uId);
            }
          }
        })
      }
    })
    /* Sono consapevole di usare in modo non strettamente proprio la post perchè la mia azione è idempotente
    perchè si tratta di un retrive, ma d'altro canto dato che devo passare un array dinamico dimensione ignota a priori
    perchè sia meglio passarlo come body e non come URLparams quindi opto per una posto */
    if (missingUserSet.size > 0) {
      cAPIWrapper.post("/users/usernamesMap/retrive", {
        data: {
          idArray: Array.from(missingUserSet)
        }
      }).then( (obj) => {
        setUsernamesMap( (prev:any) => {
          return {...prev, ...obj.data}
        })
      })
    }
  }, [chatrooms])

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

  const onChatroomCreated = (data: any) => {
    const newChatroom = data as Chatroom;
    let content = newChatroom.type === "group" ?
       <>Sei stato aggiunto al gruppo <strong>{newChatroom.name}</strong></>
        :
      <><strong>{newChatroom.name}</strong> ha iniziato una conversazione con te</>;
    NotificationService.push({
      type: "success",
      content: content,
      insertionDate: new Date()
    })
    setChatrooms( (prev) => [...prev, newChatroom]);
  }

  const onChatroomDeleted = (data: any) => {
    const delChatroom = data;
    setChatrooms(  (prev) => {
      const _del = prev.find(c => c._id.toString() === delChatroom.id.toString());
      NotificationService.push({
        type: "warning",
        content: <>La chatroom <strong>{_del?.name}</strong> è stata eliminata</>,
        insertionDate: new Date()
      })
      return prev.filter(c => c._id.toString() !== delChatroom.id.toString());
    }) 
  }

  const retrivePendingFriendshipReq = () => {
    return cAPIWrapper.get("/friends/pendingrequest").then(
        res => setPendingReq(res.data)
    )
  }

  const onNewFriendshipReq = (data:any) => {

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
    socket.on('chatroomDeleted', onChatroomDeleted);
    socket.on('chatroomCreated', onChatroomCreated);
    socket.on('newFriendshipRequest', onNewFriendshipReq)
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('pushedMessage', onPushedMessage);
      socket.off('chatroomCreated', onChatroomCreated)
      socket.off('chatroomDeleted', onChatroomDeleted);
      socket.off('newFriendshipRequest', onNewFriendshipReq)
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
          setLoading(false);
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
    setLoading(true);
    if (JWT.length > 0) {
      cAPIWrapper.get("/chats/latestedited/0").then((res)=> {
        try {
          const chats = res.data.chatrooms as Chatroom[]
          setChatrooms( chats );
          setUsernamesMap(res.data.usernames);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      })
      .then( () => retrivePendingFriendshipReq())
      .then( () => initSocket() )
    }
  }, [JWT])

  return (
    <div className="App">
        <Snackbar open={showNotication} onClose={()=>setShowNotification( prev => !prev)} anchorOrigin={{vertical:"bottom", horizontal: "right" }} autoHideDuration={10000}>
          {notification && <Alert severity={notification.type as AlertColor} sx={{ width: '100%' }}>
            {notification.content}
          </Alert>}
        </Snackbar>
      
      {!isLoading ? <Routes> 
        <Route path="/:chatid?" element={
          <HomePage
            chatrooms={chatrooms}
            requireAuth={requireAuth}
            user={currentUser}
            usernamesMap={usernamesMap}
            friendshipsReq={pendingReq}
          />} />
        <Route path="/login" element={<LoginPage handleUserUpdate={handleUserUpdate}/>} />
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
      :
      <Box 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          size:"20vw",
          height: "100vh",
          width: "100vw"
        }}>
        <CircularProgress />
      </Box>
      } 
    </div>
  );
}

export default App;
