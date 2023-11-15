import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import axios from "axios";

const Calcul = () => {

    const [date, setDate] = useState([])
    const [dateLoad, setDateLoad] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const getData = () => {
        axios
            .get(`http://localhost:8000/api/getPeriodWithData`)
            .then((res) => {
                setDate(res.data);
                setDateLoad(true);
                setSelectedDate(date[0])
                console.log(selectedDate)
            });
    };

    useEffect(() => {
        getData();
        console.log(date)
    }, [dateLoad]);

    const handleCalcul = async () => {
        try {
            // Effectuez la requête POST
            const response = await axios.get(
                `http://localhost:8000/api/makeCalcul/${selectedDate}`
            );
            // Gérez la réponse de l'API ici
            alert("Réponse de l'API :" + response.data);
        } catch (error) {
            console.error("Erreur lors du calcul :", error);
            const errorDetails = error.response.data.detail;
            console.log(errorDetails);
            alert("Erreur : " + errorDetails);
        }
    }

    const generateExcel = () => {
        axios({
            url: `http://localhost:8000/api/uploadExcelMoyennes/${selectedDate}`,
            method: 'GET',
            responseType: 'blob',
        })
            .then(response => {
                // Créer un lien pour télécharger le fichier Excel
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resultats_etudiants.xlsx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => console.error('Erreur lors de la récupération du fichier Excel :', error));
    };

    return (
        <div>
            <Navigation/>
            <div className="calcul">
                <label>Sélectionnez une date :</label>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    {date.map((date) => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))}
                </select>

                <button onClick={handleCalcul}>Calcul</button>
            </div>
            <div className="uploadFile">
                <button onClick={generateExcel}> Charger Excel</button>
            </div>
        </div>
    );
};


export default Calcul;