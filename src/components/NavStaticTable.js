import React from 'react';
import {NavLink} from "react-router-dom";

const NavStaticTable = () => {
    return (
        <div className="navigation-static-table">
            <div className="nav-container">
                <ul>
                    <NavLink
                        to="/modifyStaticTable/student"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Student</li>
                    </NavLink>
                    <NavLink
                        to="/modifyStaticTable/formation"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Formation</li>
                    </NavLink>

                </ul>
            </div>
        </div>

    );
};

export default NavStaticTable;