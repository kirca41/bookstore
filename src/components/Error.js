import React from 'react';

import '../styles/Error.css';

const Error = ({content}) => {
    return (
        <div className="error-content">
            <i className="fas fa-exclamation" />
            <span>{content}</span>
        </div>
    );
};

export default Error;