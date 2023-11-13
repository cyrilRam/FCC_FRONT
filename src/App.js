import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UploadFile from "./pages/UploadFile";
import Calcul from "./pages/Calcul";
import Student from "./pages/staticTables/Student";
import Formations from "./pages/staticTables/Formations";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UploadFile/>}></Route>
                <Route path="/calcul" element={<Calcul/>}></Route>
                <Route path="/modifyStaticTable/student" element={<Student/>}></Route>
                <Route path="/modifyStaticTable/formation" element={<Formations/>}></Route>

                {/*Si path est faux alors on renvoie a home*/}
                <Route path="*" element={<UploadFile/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;