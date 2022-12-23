import React from 'react';

const Error = ({ message }) => {
    return (
        <div class="flex justify-center items-center h-screen">
            <p>{message}</p>
        </div>
    );
};

export default Error;