import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <main className="container">
            <h1 className="text-center notFound">4<span className="text-danger">0</span>4</h1>            
            <h2 className="text-center notFound">We <span className="text-danger">do not</span> speak this language yet<span className="text-danger">.</span></h2>
            <div className="text-center">
                <Link style={{borderRadius: '100px'}} to="/" className="btn btn-lg btn-danger">Back Home</Link>
            </div>
            <hr />
        </main>
    )
}

export default NotFound;