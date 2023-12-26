import React, { useState, useEffect } from "react"
import SingleFlatCard from "./SingleFlatCard"
import FlatFilters from "./FlatFilters"
import useFetch from "../../hooks/useFetch"
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.jsx"


export default function AllFlatsCard() {


    // data fetching
    const { data, loading, errors } = useFetch("http://localhost:5000/api/v1/flat")

    // filtering flats
    const [searchParams, setSearchParams] = useSearchParams()

    const filters = {
        minPrice: Number(searchParams.get("minPrice")),
        maxPrice: Number(searchParams.get("maxPrice")),
        minSqft: Number(searchParams.get("minSqft")),
        maxSqft: Number(searchParams.get("maxSqft")),
        bhk: Number(searchParams.get("property_bhk")),
        furnitureType: searchParams.get("furnitureType"),
    }


    const filteredFlatsData = data.filter((singleFlat) => {

        const {
            property_name, property_price, property_bhk, property_sqft, property_devloper, property_locality, property_city, furnitureType
        } = singleFlat

        return (

            (filters.minPrice ? Number(filters.minPrice) <= Number(property_price) : true) &&
            (filters.maxPrice ? Number(filters.maxPrice) >= Number(property_price) : true) &&
            (filters.minSqft ? Number(filters.minSqft) <= Number(property_sqft) : true) &&
            (filters.maxSqft ? Number(filters.maxSqft) >= Number(property_sqft) : true) &&
            (filters.bhk ? Number(filters.bhk) === Number(property_bhk) : true) &&
            (filters.furnitureType ? filters.furnitureType === furnitureType : true)
        )
    })


    // Wishlisted flats by user ( if user is logged in )
    const { authData } = useAuth()
    const { profile, isAuthenticate } = authData;


    const flatCards = filteredFlatsData.map((flat) => {
        return (
            <SingleFlatCard
                key={flat._id}
                profile={profile}
                id={flat._id}
                name={flat.property_name}
                price={flat.property_price}
                bhk={flat.property_bhk}
                sqft={flat.property_sqft}
                devloper={flat.property_devloper}
                locality={flat.property_locality}
                city={flat.property_city}
                locality_url={flat.locality_url}
                arrayOfImages={flat.arrayOfImages}
                furnitureType={flat.furnitureType}
            />
        )
    });

    // now we have wishlist of that user so we assign wishlisted : true in <SingleFlatCard /> component
    // filterd flatcards


    // returning ui component or loading... component
    if (loading) {
        return (
            <div className="h-[100vh] w-[100vw] flex justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className=" ">
                <FlatFilters />
                <div className="">
                    <h1 className="cursor-pointer py-2 my-2 min-w-[80%] md:px-[6rem] text-center lg:text-left"><u>Showing {flatCards.length} results</u></h1>
                    {flatCards}
                </div>
            </div>
        )
    }
}