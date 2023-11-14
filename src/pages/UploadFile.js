import React from 'react';
import Navigation from "../components/Navigation";
import Upload from "../components/Upload";

const UploadFile = () => {
    return (
        <div>
            <Navigation/>
            <h1>MAJ des tables d'import</h1>
            <Upload table={"results"}/>
        </div>
    );
};

export default UploadFile;