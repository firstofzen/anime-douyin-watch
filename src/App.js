
import { BrowserRouter, Route, Router, Routes, Switch } from "react-router-dom";
import Home from "./Home";
import UserInfo from "./UserInfo";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userInfo" element={<UserInfo />}/>
            </Routes>
        </BrowserRouter>
    );
}
