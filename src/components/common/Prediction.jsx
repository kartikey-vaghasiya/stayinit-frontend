import React, { useState } from 'react';
import { useAuth } from '../../contexts/Auth'
import { useNavigate } from "react-router-dom";

// import of utility functions
import { roundToNearestThousand } from '../../utils/utilityFunctions';


const inputStyleClass =
    'py-2 px-4 w-full focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]';

export default function Prediction() {

    const navigate = useNavigate()
    const { authData } = useAuth()

    // output prediction price state which we will be show to users
    const [prediction, setPrediction] = React.useState()

    // property data in form
    const [propertyData, setPropertyData] = useState({
        property_sqft: 1000,
        property_bhk: 3,
        property_city: 'ahmedabad',
        property_locality: 'bopal',
        is_furnished: 'furnished',
        property_project: 'demo',
        num_of_baths: 2,
        bachelors_or_family: 'bachelors/family',
        floornumber: 7,
        totalfloor: 7,
        property_pricenan: 0,
        property_bhknan: 0,
        property_sqftnan: 0,
        num_of_bathsnan: 0,
        floornumbernan: 0,
        totalfloornan: 0
    });

    // making request to server to predict price for user inputed property data
    async function fetchPrediction() {


        // convert form data string to lowercase string for accurate prediction in ml model
        const p_proj = propertyData.property_project.toLowerCase().replace(" ", "_")
        const p_city = propertyData.property_city.toLowerCase()
        const p_loc = propertyData.property_locality.toLowerCase()
        const p_isfun = propertyData.is_furnished.toLowerCase()

        // if user is authenticated... then make api call
        if (authData.isAuthenticate) {
            const response = await fetch('http://localhost:8000/')
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_sqft: propertyData.property_sqft,
                    property_bhk: propertyData.property_bhk,
                    property_city: p_city,
                    property_locality: p_loc,
                    is_furnished: p_isfun,
                    property_project: p_proj,
                    num_of_baths: propertyData.num_of_baths,
                    bachelors_or_family: "bachelors",
                    floornumber: propertyData.floornumber,
                    totalfloor: propertyData.totalfloor || propertyData.atWhichFloor,
                    property_pricenan: 0,
                    property_bhknan: 0,
                    property_sqftnan: 0,
                    num_of_bathsnan: 0,
                    floornumbernan: 0,
                    totalfloornan: 0
                }),
            };

            const data = await response.json()

            setPrediction(data.prediction)
        }
        // if user is not autheticated... then redirect to "login"
        else {
            navigate("/login")
        }
    }

    // handling property form data chnaging by updating "propertyData" state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({
            ...propertyData,
            [name]: value,
        });
    };

    return (
        <div className="md:px-[10rem] mt-6 sm-down: px-12 mx-auto">
            <form className=''>
                <div className="mb-4 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_sqft">
                        Property Sqft
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="property_sqft"
                        value={propertyData.property_sqft}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_bhk">
                        Property BHK
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="property_bhk"
                        value={propertyData.property_bhk}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_city">
                        Property City
                    </label>
                    <input
                        className={inputStyleClass}
                        type="text"
                        name="property_city"
                        value={propertyData.property_city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_locality">
                        Property Locality
                    </label>
                    <input
                        className={inputStyleClass}
                        type="text"
                        name="property_locality"
                        value={propertyData.property_locality}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_furnished">
                        Is Furnished
                    </label>
                    <select
                        className={inputStyleClass}
                        name="is_furnished"
                        value={propertyData.is_furnished}
                        onChange={handleChange}
                        required
                    >
                        <option value="furnished">Furnished</option>
                        <option value="unfurnished">Not Furnished</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_project">
                        Property Project
                    </label>
                    <input
                        className={inputStyleClass}
                        type="text"
                        name="property_project"
                        value={propertyData.property_project}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="num_of_baths">
                        Number of Baths
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="num_of_baths"
                        value={propertyData.num_of_baths}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bachelors_or_family">
                        Suitable for
                    </label>
                    <select
                        className={inputStyleClass}
                        name="bachelors_or_family"
                        value={propertyData.bachelors_or_family}
                        onChange={handleChange}
                        required
                    >
                        <option value="bachelors/family">Bachelors/Family</option>
                        <option value="family">Family</option>
                        <option value="bachelors">Bachelors</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floornumber">
                        Floor Number
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="floornumber"
                        value={propertyData.floornumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalfloor">
                        Total Floor
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="totalfloor"
                        value={propertyData.totalfloor}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        onClick={fetchPrediction}
                        className="bg-[#073937] mb-6 cursor-pointer rounded-[2rem] text-white py-2 px-4 focus:outline-none focus:shadow-outline"
                    >
                        Let's see prediction
                    </button>

                </div>
            </form >
            <div className='mb-6 '>
                {prediction ? (
                    <div className='bg-[#78e7ab] mb-6 rounded-[2rem] text-black py-2 px-4 focus:outline-none focus:shadow-outline'>
                        {`Price Should be between ${roundToNearestThousand(prediction - (prediction * 0.07))} - ${roundToNearestThousand(prediction + (prediction * 0.07))} Rupees`}
                    </div>
                ) : (
                    <div className='text-green-500 text-text-xs'></div>
                )}
            </div>
        </div >
    );
}

