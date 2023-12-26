import React from "react"
import { Link } from "react-router-dom"

export default function Home() {

    return (
        <div className="text-[#073937] h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-8">Welcome to Stayinit</h1>
                <p className="text-xl mb-6">Your Easy Accommodation Solution</p>
                <p className="text-lg mb-8">Find the perfect place to stay for bachelors.</p>
                <div className="flex justify-center">
                    <Link to="/flats" className="text-sm bg-white hover:bg-[#FCF5EB] px-6 py-3 rounded-full lg:text-lg font-semibold transition duration-300 mx-2">
                        Explore Flats
                    </Link>
                    <Link to="/hostels" className="text-sm bg-white hover:bg-[#F3EADC] px-6 py-3 rounded-full lg:text-lg font-semibold transition duration-300 mx-2">
                        Discover Hostels
                    </Link>
                    <Link to="/prediction" className="text-sm bg-white hover:bg-[#F3EADC] px-6 py-3 rounded-full lg:text-lg font-semibold transition duration-300 mx-2">
                        Discover AI Based Price Feature
                    </Link>
                </div>
            </div>
        </div>
    );
};
