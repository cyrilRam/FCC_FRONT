import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import axios from "axios";

const Calcul = () => {

    const [date, setDate] = useState([])
    const [lastDateCalcul, setlastDatecalcul] = useState('')
    const [dateLoad, setDateLoad] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const getLastDateCalcul = async (period) => {

        await axios
            .get(`http://localhost:8000/api/lastCalculForPeriod/${period}`)
            .then((res) => {
                setlastDatecalcul(res.data);
            });


    }
    const getData = async () => {
        await axios
            .get(`http://localhost:8000/api/getPeriodWithData`)
            .then((res) => {
                setDate(res.data);
                setDateLoad(true);
                setSelectedDate(res.data[0])
                //  getLastDateCalcul(res.data[0])
            });

    };

    useEffect(() => {
        getData();
    }, [dateLoad]);

    useEffect(() => {
        //etre sur que la data a deja ete charge avant d'appeler l'api qui recup derniere date de calcul
        if (dateLoad) {
            getLastDateCalcul(selectedDate);
        }

    }, [selectedDate])

    const handleCalcul = async () => {
        try {
            // Effectuez la requête POST
            const response = await axios.get(
                `http://localhost:8000/api/makeCalcul/${selectedDate}`
            );
            getLastDateCalcul(selectedDate);
            // Gérez la réponse de l'API ici
            alert("Réponse de l'API :" + response.data);
        } catch (error) {
            console.error("Erreur lors du calcul :", error);
            const errorDetails = error.response.data.detail;
            console.log(errorDetails);
            alert("Erreur : " + errorDetails);
        }
    }

    const generateExcel = async () => {
        if (lastDateCalcul) {
            await axios({
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

        } else {
            alert("Veuillez lancer les calcules sur la periode " + selectedDate)
        }

    };

    return (
        <div className="calcul">
            <Navigation/>
            <div className="period-calcul">
                <div className="period">
                    <label>Period</label>
                    <select value={selectedDate} onChange={(e) => {
                        setSelectedDate(e.target.value);
                    }}>
                        {date.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                    <p>Last Calcul Update : {lastDateCalcul} </p>
                </div>
                <button onClick={handleCalcul}>Calcul</button>
            </div>
            <div className="download">
                <button onClick={generateExcel}> Charger Excel</button>
            </div>
        </div>
    );
};


export default Calcul;