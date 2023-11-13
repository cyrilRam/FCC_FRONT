import React from 'react';
import Navigation from "../../components/Navigation";
import NavStaticTable from "../../components/NavStaticTable";
import Table from "../../components/Table";

const Student = () => {
    return (
        <div className="student">
            <Navigation/>
            <NavStaticTable/>
            <Table table={"student"}/>
        </div>
    );
};

export default Student;