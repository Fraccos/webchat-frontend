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

function App() {
  const navigate = useNavigate();
  const [JWT, setJWT] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<User>({username:"", email:""});
  
  const handleUserUpdate = (newUser:User, jwt: string) => {
    setCurrentUser(newUser);
    setJWT(jwt);
  }

  useEffect(()=> {
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
    
    ,[]
  )

  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage currentUser={currentUser} handleUserUpdate={handleUserUpdate}/>} />
        <Route path="/register" element={<RegisterPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
        <Route path="/chat/:chatid" element={<ChatPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
