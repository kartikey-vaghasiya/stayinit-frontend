import React, { useContext, useEffect, useState } from "react"
import { useAuth, AuthContext } from "../../contexts/Auth"
import axios from "axios"
import WishlistedPropertyCard from "./WishlistedPropertyCard"
import { getFirstImage } from "../../utils/utilityFunctions"
export default function Wishlist() {

    const { authData } = useContext(AuthContext)
    const { profile, isAuthenticate } = authData;
    const [wishlistedProperty, setWishlistedProperty] = useState([])

    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        setUserProfile(profile)
    }, [profile])

    async function getWishlist() {
        try {
            if (Object.keys(userProfile).length !== 0) {

                const profileId = userProfile._id
                console.log(profileId)
                const res = await axios.get(`http://localhost:5000/api/v1/wishlist/profile/${profileId}`)
                const jsonResponse = res.data;

                if (jsonResponse.success === true) {
                    setWishlistedProperty(jsonResponse.data)
                }
            }

        } catch (err) {
            console.log("error inside the getWishList() function : " + err.message)
        }
    }

    useEffect(() => {
        if (userProfile) {
            getWishlist()
        }
    }, [userProfile]);

    const wishlistedPropertyCard = wishlistedProperty.map((property) => {
        return (
            <WishlistedPropertyCard
                key={property._id}
                flatOrHostel={property.flat || property.hostel}
                name={property.flat ? property.flat.property_name : property.hostel.hostel_name}
                locality={property.flat ? property.flat.property_locality : property.hostel.locality}
                city={property.flat ? property.flat.property_city : property.hostel.city}
                image={getFirstImage(property.flat ? property.flat : property.hostel)}
                profile={userProfile}
                setWishlistedProperty={setWishlistedProperty}
                type={property.flat ? "flat" : "hostel"}
            />
        )
    })

    return (
        <div>
            <div></div>
            <div className="w-full flex flex-row flex-wrap gap-10 items-center justify-center p-6">
                {wishlistedPropertyCard}
            </div>
        </div>
    )
}