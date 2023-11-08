import React, {useState} from 'react';
import {useDropzone} from "react-dropzone";
import axios from "axios";

const Upload = () => {
    const [file, setfile] = useState(null);
    const onDrop = (acceptedFiles) => {
        // On récupère le premier fichier
        setfile(acceptedFiles[0]);
    };
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: ".xlsx", // Autoriser uniquement les fichiers Excel
        multiple: true, // Autoriser uniquement un seul fichier
    });

    const handleUpload = async () => {
        if (!file) {
            alert("Veuillez sélectionner un fichier Excel.");
            return;
        }

        const formData = new FormData();
        formData.append(`file`, file);
        console.log(file);
        console.log(formData);

        try {
            // Effectuez la requête POST
            const response = await axios.post(
                "http://localhost:8000/api/formations",
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
            <h1>Importation Fichier Excel</h1>
            <div className="dropzone">
                <div {...getRootProps()} className="drop">
                    <input {...getInputProps()} />
                    <p>
                        Glissez et déposez un fichier Excel (.xlsx) ici, ou cliquez pour
                        sélectionner un fichier.
                    </p>
                    <p>{file && file.name}</p>
                </div>

                <button onClick={handleUpload}>Envoyer le fichier</button>
            </div>
        </div>
        
    );
};


export default Upload;