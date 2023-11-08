import React from "react";
import Formations from "./pages/Formations";
import Students from "./pages/Student";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Formations />}></Route>
                <Route path="/students" element={<Students />}></Route>
                {/*Si path est faux alors on renvoie a home*/}
                <Route path="*" element={<Formations />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;