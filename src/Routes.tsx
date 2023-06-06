import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";

interface RouterProps {
    
}

const Router: React.FC<RouterProps> = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
        </Routes>
    )
}

export default Router;