import React from "react";
import { Link } from "react-router-dom";
function Header() {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1">
                    Test Task
                </Link>
            </div>
        </nav>
    );
}

export default Header;
