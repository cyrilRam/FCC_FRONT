import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="nav-container">
                <ul>
                    <NavLink
                        to="/"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Formations</li>
                    </NavLink>
                    <NavLink
                        to="/students"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Students</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
