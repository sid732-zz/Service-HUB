import React from 'react'

export default function Poster() {
    return (
        <div className="py-3 md:py-5">
            <h1 className=" text-2xl md:text-4xl font-medium ml-5 md:ml-10">Why Service Hub?</h1>
            <div className="grid md:grid-flow-col">
                <img
                    className="h-44 md:h-80 lg:h-90 w-auto m-5 md:m-10 rounded-3xl opacity-90 shadow-xl hover:shadow-2xl transform delay-150 hover:rotate-2 "
                    src="./images/1.png"
                    alt="Service Hub" />
                <img
                    className="h-44 md:h-80 lg:h-90 w-auto m-5 md:m-10 rounded-3xl opacity-90 shadow-xl hover:shadow-2xl transform delay-150 hover:-rotate-2"
                    src="./images/2.png"
                        alt="Service Hub" />
            </div>
        </div>
    )
}
