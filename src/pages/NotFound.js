import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container mt-5 text-center">
            <div className="display-1 text-danger">404</div>
            <h1 className="display-4">Page Not Found</h1>
            <p className="lead">The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
            {/* Optionally add more links or information here */}
        </div>
    );
}

export default NotFound;
