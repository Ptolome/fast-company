import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return <ul className="d-flex flex-row bd-highlight mb-3 mt-3">
        <li><Link className="p-2 bd-highlight" to="/">Main</Link></li>
        <li><Link className="p-2 bd-highlight" to="/login">Login</Link></li>
        <li><Link className="p-2 bd-highlight" to="/users">Users</Link></li>
    </ul>;
};

export default NavBar;
