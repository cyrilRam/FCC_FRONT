import React from 'react';
import Navigation from "../components/Navigation";
import Upload from "../components/Upload";

const UploadFile = () => {
    return (
        <div className="uploadfile">
            <Navigation/>
            <div className="upload-container">
                <Upload table={"results"}/>
                <Upload table={"Autres"}/>
            </div>
        </div>
    );
};

export default UploadFile;