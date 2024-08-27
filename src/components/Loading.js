

import React from 'react';

function Loading() {
    return (
        <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3">
                <p>Loading... Please wait.</p>
            </div>
        </div>
    );
}

export default Loading;
