import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { User } from './types/User';
import ChatPage from './pages/ChatPage';

function App() {

  const [JWT, setJWT] = useState("")
  const [currentUser, setCurrentUser] = useState<User>({username:"", email:""});
  
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/register" element={<RegisterPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
        <Route path="/chat/:chatid" element={<ChatPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
