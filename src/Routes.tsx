import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/Homepage";

interface RouterProps {
    
}

const Router: React.FC<RouterProps> = (props) => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/chat/:chatid" element={<ChatPage/>}></Route>
        </Routes>
    )
}

export default Router;