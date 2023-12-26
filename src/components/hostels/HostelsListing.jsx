import React from "react"
import SingleHostelCard from "./SingleHostelCard"
import HostelFilters from "./HostelFilters"
import useFetch from "../../hooks/useFetch"
import { useSearchParams } from "react-router-dom";


export default function HostelListing() {

    const [searchParams] = useSearchParams()

    const filters = {
        "minPrice": Number(searchParams.get("minPrice")),
        "maxPrice": Number(searchParams.get("maxPrice")),

        "wifi": searchParams.get("wifi") === "true" ? true : false,
        "gym": searchParams.get("gym") === "true" ? true : false,
        "laundry": searchParams.get("laundry") === "true" ? true : false,
        "ac": searchParams.get("ac") === "true" ? true : false,

        "BoysOrGirls": searchParams.get("BoysOrGirls")
    }

    // for fetchind data
    const { data, loading } = useFetch("http://localhost:5000/api/v1/hostel")

    // Getting Hostel Cards 
    const filteredHostels = data.filter((singleHostel) => {

        const {
            pricingAndSharing, forWhichGender, acFacility, wifiFacility, gymFacility, freeLaundry
        } = singleHostel

        let minPrice = Infinity;
        let maxPrice = 0;

        minPrice = pricingAndSharing.reduce((acc, curr) => {
            return (Math.min(minPrice, curr.price))
        }, Infinity)

        maxPrice = pricingAndSharing.reduce((acc, curr) => {
            return (Math.max(maxPrice, curr.price))
        }, 0)

        const exp =
            (filters.ac ? filters.ac === true ? filters.ac === acFacility : true : true) &&
            (filters.wifi ? filters.ac === true ? filters.wifi === wifiFacility : true : true) &&
            (filters.gym ? filters.ac === true ? filters.gym === gymFacility : true : true) &&
            (filters.laundry ? filters.ac === true ? filters.laundry === freeLaundry : true : true) &&
            (((filters.BoysOrGirls !== "None" && filters.BoysOrGirls)) ? forWhichGender === filters.BoysOrGirls : true) &&
            (filters.minPrice ? filters.minPrice <= maxPrice : true) &&
            (filters.maxPrice ? filters.maxPrice >= minPrice : true)

        return exp;

    })



    const hostelCards = filteredHostels.map((hostel) => {

        return (
            <SingleHostelCard
                key={hostel._id}
                user="localstorage mathi id levani"
                id={hostel._id}
                name={hostel.hostel_name}
                pricingAndSharing={hostel.pricingAndSharing}
                locality={hostel.locality}
                city={hostel.city}
                price={hostel.property_price}
                sqft={hostel.property_sqft}
                arrayOfImages={hostel.arrayOfImages}
            />
        )
    })
    // List of Hostel Cards
    if (!loading) {
        return (
            <div className="overflow-x-hidden ">
                <HostelFilters />
                <div className="min-w-[80%]">
                    <h1 className="cursor-pointer py-2 my-2 min-w-[80%] md:px-[6rem] text-center lg:text-left"><u>Showing {hostelCards.length} results</u></h1>
                    {hostelCards}
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col h-[100vh] w-[100vw] justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }
}