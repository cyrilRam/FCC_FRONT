import React from "react";
import {NavLink} from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="en-tete">
                <h3>Name Application</h3>
                <div className="connect-info">
                    <div className="disconnect">
                        <h4>disconnect</h4>
                        <AiOutlineUser size={"1.2em"} color="black"/>
                    </div>
                    <h4>UserID</h4>
                </div>
            </div>
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
