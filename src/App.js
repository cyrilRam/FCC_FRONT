import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const App = () => {
  const [file, setfile] = useState(null);
  const onDrop = (acceptedFiles) => {
    // On récupère le premier fichier
    setfile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
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
      alert("Erreur : Alimentation BDD");
    }
  };

  return (
      <div>
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          <p>
            Glissez et déposez un fichier Excel (.xlsx) ici, ou cliquez pour
            sélectionner un fichier.
          </p>
          <p>{file && file.name}</p>
        </div>

        <button onClick={handleUpload}>Envoyer le fichier</button>
      </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
};
export default App;
