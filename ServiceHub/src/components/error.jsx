import React from 'react';

export const ServerError = () => {
    return (
        <div style={{fontFamily:`"Gill Sans",sans-serif`}} className="bg-gray-400 h-96 flex items-center justify-center">
                <img src="../icons/smiley.png" alt="" className="w-36 h-36 sm:w-48 sm:h-48 mx-3"/>
                <span className="h-36 text-5xl font-bold">OOPS!<br/><span className="text-2xl sm:text-4xl">Something Went Wrong <br/></span><span className="text-xl sm:text-3xl">We are trying to fix that soon.</span></span>

        </div>
    );
}

export const Error404 = () => {
    return (
        <div className="bg-gray-400 h-96 flex items-center justify-center text-4xl">
            404 <br/>
            ERROR <br/>
            Page Not Found
        </div>
    );
}