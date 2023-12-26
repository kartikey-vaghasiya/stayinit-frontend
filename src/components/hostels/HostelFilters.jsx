import React from "react"
import { genNewSearchParamString } from "../../utils/utilityFunctions";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";

export default function HostelFilters(props) {

    // setting search params for filtering
    const [searchParams, setSearchParams] = useSearchParams()

    function updateSearchParams(event) {
        setSearchParams((prev) => {
            if (event.target.type === "checkbox") {
                return genNewSearchParamString(event.target.name, event.target.checked, searchParams)
            }
            return genNewSearchParamString(event.target.name, event.target.value, searchParams)
        })
    }

    function clearAllFilters() {
        setSearchParams((prev) => {
            return undefined;
        })
    }


    const inputStyleClass = "py-2 px-4 sm: w-[10rem] focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"
    const inputStyleClassForGender = "py-2 px-4 w-[10rem] sm:w-[10rem] focus:outline-none placeholder:text-[#073937] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"

    return (
        <div className="flex flex-row overflow-x-scroll justify-center items-center mb-2 px-[2rem] md:px-[6rem] ">
            <div className="flex sm:flex-row justify-start items-center flex-nowrap gap-2 my-3 py-[0.5rem] w-full" >

                {/* Gender */}
                <select className={inputStyleClassForGender + " cursor-pointer text-[#073937] bg-colorY2"} name="BoysOrGirls" id="gender" onChange={updateSearchParams} value={searchParams.get("BoysOrGirls")}>
                    <option value="None">Select Gender</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Both">Both</option>
                </select>

                {/* Pricing */}
                <input className={inputStyleClass + " appearance-none"} placeholder="Min Price" type="number" name="minPrice" id="minPrice" onChange={updateSearchParams} value={Number(searchParams.get("minPrice")) || null} />
                <input className={inputStyleClass + " appearance-none"} placeholder="Max Price" type="number" name="maxPrice" id="maxPrice" onChange={updateSearchParams} value={Number(searchParams.get("maxPrice")) || null} />

                {/* aminites */}

                <label htmlFor="wifi" className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer group"}>
                    <input type="checkbox" name="wifi" id="wifi" onChange={updateSearchParams} checked={searchParams.get("wifi") === "true" ? true : false} />
                    Wifi
                </label>
                <label htmlFor="ac" className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                    <input className="" type="checkbox" name="ac" id="ac" onChange={updateSearchParams} checked={searchParams.get("ac") === "true" ? true : false} />
                    Ac
                </label>
                <label htmlFor="gym" className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                    <input className="" type="checkbox" name="gym" id="gym" onChange={updateSearchParams} checked={searchParams.get("gym") === "true" ? true : false} />
                    Gym
                </label>
                <label htmlFor="laundry" className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                    <input className="" type="checkbox" name="laundry" id="laundry" onChange={updateSearchParams} checked={searchParams.get("laundry") === "true" ? true : false} />
                    Laundry
                </label>

                {/* Clear All filters */}
                <button className={inputStyleClass + " text-red-400"} onClick={clearAllFilters}> <u>Clear</u></button>

                <div><pre>  </pre></div>
            </div>
        </div >
    )
}