import React, {useState} from 'react';
import {useDropzone} from "react-dropzone";
import axios from "axios";

const Upload = ({table}) => {
    const [file, setfile] = useState(null);
    const onDrop = (acceptedFiles) => {
        setfile(acceptedFiles[0]);
    };
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: ".xlsx",
        multiple: false,
    });

    const handleUpload = async () => {

        if (!file) {
            alert("Veuillez sélectionner un fichier Excel.");
            return;
        } else {
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith(".xlsx")) {
                alert("Le fichier doit être au format Excel (.xlsx).");
                setfile(null);
                return;
            }
        }

        const formData = new FormData();
        formData.append(`file`, file); //dans la fonction du back on a juste file
        console.log(file);
        console.log(formData);

        try {
            // Effectuez la requête POST
            const response = await axios.post(
                `http://localhost:8000/api/ImportsDataFromFile/${table}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setfile(null); //une fois le post realisé on supprime

            // Gérez la réponse de l'API ici
            alert("Réponse de l'API :" + response.data);
        } catch (error) {
            console.error("Erreur lors de l'envoi du fichier :", error);
            const errorDetails = error.response.data.detail;
            console.log(errorDetails);
            alert("Erreur : " + errorDetails);
        }
    };

    return (

        <div className="drop-container">
            <h1>{table}</h1>
            <div className="dropzone">
                <div {...getRootProps()} className="drop">
                    <input {...getInputProps()} />
                    {!file && <img src="./assets/3616929.png"/>}
                    {file && (<div className="excel">
                            <img src="./assets/excel-logo-0.png"/>
                            <p>{file.name}</p>
                        </div>
                    )}
                </div>

                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>

    );
};


export default Upload;