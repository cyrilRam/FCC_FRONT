import React from 'react';
import Navigation from '../../components/Navigation';
import Table from "../../components/Table";
import NavStaticTable from "../../components/NavStaticTable";

const Formations = () => {
    return (
        <div className="stat-table">
            <Navigation/>
            <NavStaticTable/>
            <Table table={"formation"}/>

        </div>
    );
};

export default Formations;