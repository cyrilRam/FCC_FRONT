import React from 'react';
import Navigation from '../components/Navigation';
import Upload from "../components/Upload";

const Formations = () => {
    return (
        <div className="formations">
            <Navigation/>
            <Upload/>
            <div className="formation-container">
                <h1>Table Formations</h1>
            </div>

        </div>
    );
};

export default Formations;