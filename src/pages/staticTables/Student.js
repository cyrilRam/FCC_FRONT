import React from 'react';
import Navigation from "../../components/Navigation";
import NavStaticTable from "../../components/NavStaticTable";
import Table from "../../components/Table";

const Student = () => {
    return (
        <div className="stat-table">
            <Navigation/>
            <div className="stat-table-body">
                <NavStaticTable/>
                <Table table={"student"}/>
            </div>
        </div>
    );
};

export default Student;