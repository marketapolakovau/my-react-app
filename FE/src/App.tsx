
import './App.css'

import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Detail from "./pages/detail/Detail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/detail/:productId" element={<Detail />} />
        </Routes>
    );
}

export default App
