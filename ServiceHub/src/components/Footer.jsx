import React from 'react'
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="bg-gray-800 bg-opacity-90 h-12 mx-auto text-base md:text:xl text-left relative">
                <div className="inline-block m-3 ml-2 absolute space-x-8">
                    <Link className="text-gray-300 hover:text-white text-xs" to="/">&copy;2020-21 Service Hub Pvt. Ltd.</Link>
                </div>
                <div className="inline-block m-3 absolute right-0 space-x-4">
                    <Link className="text-gray-300 hover:text-white hidden md:inline-block text-sm" to="/about">About Us</Link>
                    <Link className="text-gray-300 hover:text-white  text-sm" to="/policy">Privacy Policy </Link>
                    <Link className="text-gray-300 hover:text-white  text-sm" to="/contact">Contact Us</Link>
                </div>
            </div>

        </>
    )
}
