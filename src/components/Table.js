import React, {useEffect, useState} from 'react';
import axios from "axios";

const Table = () => {
    const [data, setData] = useState([]);
    const [dataLoad, setDataLoad] = useState(false);

    const getData = () => {
        axios.get(
            `http://localhost:8000/api/formations`
        )
            .then((res) => {
                setData(JSON.parse(res.data));
                setDataLoad(true);
            });

    }

    useEffect(() => {
        getData();
        console.log(data);
    }, [dataLoad]);

    const handleEdit = (index, fieldName, value) => {
        const newData = [...data];
        newData[index][fieldName] = value;
        setData(newData);
        console.log(data)

    };

    const handleDelete = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData.splice(index, 1);
            console.log(newData); // newData est le tableau mis à jour
            return newData;
        });
    };

    const columns = data[0] ? Object.keys(data[0]) : [];
    return (
        <div>
            {columns.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        {columns
                            .filter((column) => column !== 'id')
                            .map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>{Object.keys(row).map((column, colIndex) => (column !== "id" && (
                            <td key={colIndex}><input type="text" value={row[column]}
                                                      onChange={(e) => handleEdit(rowIndex, column, e.target.value)}/>
                            </td>)))}
                            <td>
                                <button onClick={() => handleDelete(rowIndex)}>Supprimer</button>
                            </td>
                        </tr>))}
                    </tbody>

                </table>

            )}
        </div>
    );
};

export default Table;