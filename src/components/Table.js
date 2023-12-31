import React, {useEffect, useState} from 'react';
import axios from "axios";

const Table = ({table}) => {
    const [data, setData] = useState([]);
    const [dataLoad, setDataLoad] = useState(false);
    const [modifyData, setModifyData] = useState(false)

    const getData = () => {
        axios.get(
            `http://localhost:8000/api/getStaticTable/${table}`
        )
            .then((res) => {
                setData(JSON.parse(res.data));
                setDataLoad(true);
            });

    }

    const postNewData = async () => {
        if (modifyData) {
            const userConfirmed = window.confirm("Êtes-vous sûr de vouloir effectuer les modifications ?");
            if (userConfirmed) {
                try {
                    // Effectuez la requête POST
                    const response = await axios.post(
                        `http://localhost:8000/api/updateTable`,
                        data,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    // Gérez la réponse de l'API ici
                    alert("Réponse de l'API :" + response.data);
                    getData()
                } catch (error) {
                    console.error("Erreur lors de l'envoi du fichier :", error);
                    const errorDetails = error.response.data.detail;
                    console.log(errorDetails);
                    alert("Erreur : " + errorDetails);
                }
            } else {
                window.location.reload();
            }


        } else {
            alert("Acune Modification n'a été effectuée");
        }
    }

    useEffect(() => {
        getData();
        console.log(data);
    }, [dataLoad]);

    const handleEdit = (index, fieldName, value) => {
        const newData = [...data];
        newData[index][fieldName] = value;
        setData(newData);
        console.log(data);
        setModifyData(true);

    };

    const handleDelete = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData.splice(index, 1);
            console.log(newData); // newData est le tableau mis à jour
            setModifyData(true);

            return newData;
        });
    };

    const handleAdd = () => {
        const newDataRow = {}; // Create an empty object for the new row
        columns.forEach(column => {
            column == 'id' ? newDataRow[column] = null : newDataRow[column] = "";
            //newDataRow[column] = ""; // You can set a default value here if needed
        });

        // Add the new row to the state
        setData(prevData => [...prevData, newDataRow]);
        setModifyData(true);


    }


    const columns = data[0] ? Object.keys(data[0]) : [];
    return (
        <div className="table">
            <div className="table-container">
                <h1>Table {table}</h1>
                {columns.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            {columns
                                .filter((column) => column !== 'id')
                                .map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>{Object.keys(row).map((column, colIndex) => (column !== "id" && (
                                <td key={colIndex}><input type="text" value={row[column]}
                                                          onChange={(e) => handleEdit(rowIndex, column, e.target.value)}/>
                                </td>)))}
                                <td>
                                    {/*<button onClick={() => handleDelete(rowIndex)}>Supprimer</button>*/}
                                    <img src="/assets/checked.png" onClick={() => handleDelete(rowIndex)}/>
                                </td>
                            </tr>))}
                        </tbody>

                    </table>

                )}
            </div>
            <div className="button-container">
                {/*<button onClick={postNewData}>Save</button>*/}
                <img src="/assets/save.png" onClick={postNewData}/>
                <button onClick={handleAdd}>+ Add Row</button>
            </div>
        </div>
    );
};

export default Table;