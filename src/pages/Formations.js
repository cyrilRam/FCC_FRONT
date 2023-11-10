import React from 'react';
import Navigation from '../components/Navigation';
import Upload from "../components/Upload";
import Table from "../components/Table";

const Formations = () => {
    return (
        <div className="formations">
            <Navigation/>
            <Upload/>
            <div className="formation-container">
                <h1>Table Formations</h1>
            </div>
            <Table/>

        </div>
    );
};

export default Formations;