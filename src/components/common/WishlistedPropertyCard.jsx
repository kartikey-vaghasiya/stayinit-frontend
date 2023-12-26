import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function WishlistedPropertyCard({ flatOrHostel, name, type, profile, setWishlistedProperty, locality, city, image }) {

    async function removeFromWishlist() {

        const res = await axios.delete(`http://localhost:5000/api/v1/wishlist/profile/${profile._id}/${type}/${flatOrHostel._id}`)
        const wishlist = res.data;
        if (wishlist.success === true) {
            setWishlistedProperty((prev) => prev.filter((property) => {
                if (property.flat) {
                    return property.flat._id !== flatOrHostel._id
                }

                if (property.hostel) {
                    return property.hostel._id !== flatOrHostel._id
                }
            }))
        }
    }
    return (
        <div className="flex flex-row gap-10 p-6 justify-between rounded-[1rem] bg-[#F3EADC]">
            <div className="">
                <img src={image} className="w-[15rem] h-[15rem] rounded-br-[2rem]" alt="property_image" />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <h5 className="text-2xl text-bold">{name}</h5>
                    <p className="text-lg">{locality}, {city}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Link to={`/flats/${flatOrHostel._id}`} className="bg-colorG w-[10rem] text-[#FFFBF2] text-center px-4 py-4 rounded-[3rem]">View Details</Link>
                    <button onClick={removeFromWishlist} className="bg-colorG w-[10rem] text-[#FFFBF2] text-center px-4 py-4 rounded-[3rem]"> Remove </button>
                </div>
            </div>
        </div>
    )
}