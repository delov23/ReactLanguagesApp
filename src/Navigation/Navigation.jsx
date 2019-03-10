import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success nav-tabs">
            <Link className="navbar-brand" to="/">
                <img src="https://static.thenounproject.com/png/987-200.png" alt="Logo" width="50px" />
                <span className="navbar-brand-text">Lingo</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav my-2 ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/register">Sign up</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login">Log in</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;