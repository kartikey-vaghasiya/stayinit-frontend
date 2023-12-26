import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/Auth.jsx"
import axios from "axios";

// utility functions
import { getFirstImage } from "../../utils/utilityFunctions"

export default function SingleFlatCard(props) {

    // getting authData from AuthContext
    const { authData } = useAuth()
    const { isAuthenticate, profile } = authData;
    const navigate = useNavigate()

    // now check if this user has any wishlist or not
    const [wishlistedPropertry, setWishlistedPropertry] = useState([])
    const [wishlistLength, setWishlistLength] = useState(() => wishlistedPropertry.length)

    async function getWishlist() {
        try {
            // now check if this user has any wishlist or not
            const response = await axios.get(`http://localhost:5000/api/v1/wishlist/profile/${profile._id}`);
            const data = response.data;
            console.log("Wishlist Data : ")
            console.log(data)
            let wishlistedPropertry = []
            if (data.success === true) {
                // make a array of wishlisted property by a user 
                data.data.forEach((element) => {
                    wishlistedPropertry.push(element.flat._id)
                })
            }

            setWishlistedPropertry(wishlistedPropertry)
            console.log("Wishlist : ", wishlistedPropertry)

        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        // checking if user is logged in or not if logged in then get his wishlist
        if (isAuthenticate) {
            getWishlist()
        }
    }, [wishlistLength])

    // function to toggle wishlist
    function toggleWishlist() {
        if (isAuthenticate) {
            if (wishlistedPropertry.includes(props.id)) {
                console.log("chhe bhai list ma")
                removeToWishlist()
            } else {
                addToWishlist()
            }
        }
    }

    // function to un-wishlist a flat 
    async function removeToWishlist() {
        // first we have to get that wishlist id
        if (isAuthenticate) {
            const propertyId = props.id;

            const response = await axios.delete(`http://localhost:5000/api/v1/wishlist/profile/${profile._id}/flat/${propertyId}`)
            const deletedWishlist = response.data;

            if (deletedWishlist.success === true) {
                setWishlistedPropertry(() => {
                    return (wishlistedPropertry.filter((property) => {
                        return property !== propertyId
                    }))
                })
                setWishlistLength((prev) => {
                    return prev - 1
                })
            }

        }
    }

    // function to add to wishlist
    async function addToWishlist() {
        if (isAuthenticate) {
            const propertyId = props.id;

            const wishlistData = {
                "flat": props.id,
                "profile": profile._id,
                "type": "flat"
            }

            const response = await axios.post(`http://localhost:5000/api/v1/wishlist`, wishlistData)
            const addedWishlist = response.data;

            if (addedWishlist.success === true) {

                setWishlistedPropertry((prev) => {
                    const newList = [...prev]
                    newList.push(propertyId)
                    return newList
                })

                setWishlistLength((prev) => {
                    return prev + 1
                })

            }
        }
    }

    // returning ui component
    return (

        <section className="cursor-pointer flex flex-col items-center py-2 my-2 min-w-[80%] md:px-[6rem] bg-colorY ">

            <div className="flex flex-col w-full items-center lg:items-start">

                {/* Title And Wishlist button */}

                <div className="flex flex-row justify-between w-full">

                    <div className="w-[90%] flex flex-col gap-3 items-start py-4">
                        <h1 className="leading-3 text-xl">
                            {props.name}
                        </h1>
                        <p className="leading-3 text-sm">
                            {props.locality}, {props.city}
                        </p>
                    </div>

                    {/* Wishlist Button */}
                    <div className="w-[2rem] flex justify-center items-center">
                        <img src={wishlistedPropertry.includes(props.id) ? `/icons/red-heart.png` : `/icons/heart.png`} onClick={toggleWishlist} alt="" />
                    </div>
                </div>

                {/* Photo And Pricing Big Div */}
                <div className="w-full h-full flex lg:flex-row gap-10 items-center lg:items-start flex-col relative">

                    {/* Flat Image */}
                    <div className="flex lg:items-start lg:justify-start flex-col min-w-[200px] min-h-[112px] max-h-[50.6%] max-w-[90%]">
                        <img loading="lazy" src={getFirstImage(props)} className="rounded-br-[3rem] object-cover lg:w-[500px] lg:h-[281px] w-auto h-auto" lazy />
                    </div>


                    {/* Pricing */}
                    <div className="flex items-center justify-center lg:items-end lg:justify-end flex-col w-[100%] lg:w-[60%]">
                        <div className="flex justify-center flex-col w-full h-auto min-w-[200px] max-w-[90%]">
                            <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                                <h3>
                                    <a href="" rel="noopener noreferrer" target="_blank">
                                        ROOM BHK &amp; RENT
                                    </a>
                                </h3>
                            </div>
                            <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                                <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">{props.bhk} BHK Room</div>
                                <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                                    <span className="">from </span>
                                    <span className="font-bold">&#8377; {props.price}</span>
                                </div>
                            </div>
                            <Link to={`./${props.id}`} rel="noopener noreferrer">
                                <div className="lg:absolute bottom-0 right-0 bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[1rem] md-down: my-5">
                                    <div className="text-base leading-6 self-center whitespace-nowrap">
                                        See what’s available
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >

        </section >

    );
}


// const { Link, useNavigate } = require("react-router-dom")
// const React = require("react")
// const { useAuth } = require("../utils/AuthContexJSX")

// export default function FlatCard(props) {


//     const navigate = useNavigate()
//     const [isWishListed, setIsWishlisted] = React.useState();
//     const [wishlistID, setWishlistID] = React.useState();

//     const { authData } = useAuth()

//     // Getting ImageUrlArray's 1st Image link
//     const imageUrl = Array.isArray(props.imageUrlArray) && props.imageUrlArray.length > 0
//         ? props.imageUrlArray[0].url
//         : '';

//     // Add to Wishlist
//     const addToWishlist = async function () {

//         // If Not Logged In Then Redirect to login page
//         if (!authData.isAuthenticate) {
//             navigate('/login')
//         }

//         // If Not in Wishlist....
//         if (!isWishListed) {
//             const wishlistData = {
//                 "likedProperty": props.id,
//                 "user": authData.user
//             }

//             const token = localStorage.getItem('token')

//             try {

//                 const options = {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(wishlistData),
//                 };

//                 fetch('http://localhost:5000/api/v1/wishlist/', options)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         return response.json();
//                     })
//                     .then(data => {
//                         setIsWishlisted(true)
//                         setWishlistID(data.data._id)
//                     })
//                     .catch(error => {
//                         console.error('Error:', error);
//                     });

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         // If it is already in wishlist...
//         removeToWishlist()

//     }

//     // Removing in Wishlist
//     const removeToWishlist = async function (id) {
//         const token = localStorage.getItem('token')
//         // deleting by fetch request
//         const options = {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': `Bearer ${token}`
//             },
//         };


//         fetch(`http://localhost:5000/api/v1/wishlist/${wishlistID}`, options)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // if success then isWishlisted == false
//                 setIsWishlisted(false)
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });

//     }

//     // Flat Card

//     const mynav = (<div className="flex flex-col border w-[40%] border-black px-10">
//         <Link to={`./${props.id}`}>
//             <div>
//                 <span className="pr-10">{props.name}</span>
//                 <span className="pr-10">{props.locality}</span>
//                 <a href="https://www.google.com/maps/@21.7448006,70.4431909,15z?entry=ttu">M</a>
//             </div>
//         </Link>

//         <div className="flex flex-row justify-between">
//             <div>
//                 <img className="w-[350px] object-fit" src={imageUrl} alt="flat" />
//             </div>
//             <div className="flex flex-col justify-center">
//                 <button onClick={addToWishlist}> {isWishListed ? "Removed to Wishlist" : "Add to wishlist"} </button>
//                 <div>
//                     <h3>Room Type & Rent</h3>
//                     <div>{props.bhk}BHK   ${props.price}</div>
//                 </div>
//                 <div>
//                     <h1>{props.furnitureType}</h1>
//                     <h1>{props.devloper}</h1>
//                     <h1>{props.sqft} SqFt</h1>
//                 </div>
//                 <Link to={`./${props.id}`}>See Whats Avilable</Link>
//             </div>
//         </div>
//     </div>)

//     return mynav;
