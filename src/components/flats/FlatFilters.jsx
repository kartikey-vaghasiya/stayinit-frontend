import React from "react"
import { useSearchParams } from "react-router-dom";
import { genNewSearchParamString } from "../../utils/utilityFunctions";

export default function FlatFilters(props) {

    // setting search params for filtering
    const [searchParams, setSearchParams] = useSearchParams()

    function updateSearchParams(event) {
        setSearchParams((prev) => {
            return genNewSearchParamString(event.target.name, event.target.value, searchParams)
        })
    }

    function clearAllFilters() {
        setSearchParams((prev) => {
            setBhk(0)
            return undefined;
        })
    }

    // state for bhk counter and function for increment and decrement bhk's value
    const [bhk, setBhk] = React.useState(0)

    function increamentBHK() {
        setBhk((prev) => {
            return prev + 1
        });
    }
    function decrementBHK() {

        setBhk((prev) => {
            return prev - 1
        });
    }

    React.useEffect(() => {
        if (bhk != 0) {
            setSearchParams((prev) => {
                return genNewSearchParamString("property_bhk", bhk, searchParams)
            })
        }
    }, [bhk])

    // css for filters

    const inputStyleClass = "py-2 px-4 sm: w-[10rem] focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"
    const inputStyleClassForFurniture = "py-2 px-4 w-[10rem] md:w-[10rem] focus:outline-none placeholder:text-[#073937] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"

    // returing ui component
    return (

        <div className="flex flex-row overflow-x-scroll justify-center items-center mb-2 px-[2rem] md:px-[6rem] ">
            <div className="flex sm:flex-row justify-start items-center flex-nowrap gap-2 my-3 py-[0.5rem] w-full " >

                {/* BHK Filters */}
                <div className={inputStyleClass + ' flex flex-row gap-4 justify-center items-center'}>
                    <div>BHK</div>
                    <button className="text-xl bold" onClick={decrementBHK}>-</button>
                    <div className="" value={Number(searchParams.get("propery_bhk"))} > {bhk || 0} </div>
                    < button className="text-xl bold" onClick={increamentBHK}>+</button>
                </div>

                {/* Furniture Type Filters */}
                <select className={inputStyleClassForFurniture + " cursor-pointer text-[#073937] bg-colorY2"} name="furnitureType" id="furniture" onChange={updateSearchParams} value={searchParams.get("furnitureType")}>
                    <option value="None">Select</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semifurnished">SemiFurnished</option>
                </select>

                {/* Pricing and Sqft Filters */}
                <input className={inputStyleClass} type="number" placeholder="Min Price" name="minPrice" id="minPrice" onChange={updateSearchParams} value={Number(searchParams.get("minPrice")) || null} />
                <input className={inputStyleClass} type="number" placeholder="Max Price" name="maxPrice" id="maxPrice" onChange={updateSearchParams} value={Number(searchParams.get("maxPrice")) || null} />
                <input className={inputStyleClass} type="number" placeholder="Min Sqft" name="minSqft" id="minSqft" onChange={updateSearchParams} value={Number(searchParams.get("minSqft")) || null} />
                <input className={inputStyleClass} type="number" placeholder="Max Sqft" name="maxSqft" id="maxSqft" onChange={updateSearchParams} value={Number(searchParams.get("maxSqft")) || null} />

                {/* Clear All filters */}
                <button className={inputStyleClass + " text-red-400"} onClick={clearAllFilters}> <u>Clear</u></button>

                <div><pre>  </pre></div>

            </div >
        </div>
    )
}