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

    const handleUplaodFile = () => {
        console.log("chargement")
    }

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
                <button onClick={handleUplaodFile}> Charger Excel</button>
            </div>
        </div>
    );
};


export default Calcul;