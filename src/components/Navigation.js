import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="nav-container">
                <ul>
                    <NavLink
                        to="/"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Upload Files</li>
                    </NavLink>
                    <NavLink
                        to="/calcul"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Calcul</li>
                    </NavLink>
                    <NavLink
                        to="/modifyStaticTable/student"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Modify Static Table</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
