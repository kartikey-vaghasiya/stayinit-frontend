import Pricing from "./Pricing"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { getFirstImage } from "../../utils/utilityFunctions";

export default function HostelCard(props) {


    const navigate = useNavigate()

    // pricing and sharing ui component
    const pricingAndSharingDivArray = Array.isArray(props.pricingAndSharing) ?
        props.pricingAndSharing.map((x, i) => {
            return (
                <Pricing key={i} price={x.price} sharing={x.sharing} />
            )
        }) : []


    return (

        <section className="cursor-pointer flex flex-col items-center py-2 my-2  md:px-[6rem] bg-colorY  ">

            <div className="flex flex-col w-full items-center lg:items-start">

                {/* Title */}
                <div className="w-[90%] flex flex-col gap-3 items-start py-4">
                    <h1 className="leading-3 text-xl">
                        {props.name}
                    </h1>
                    <p className="leading-3 text-sm">
                        {props.locality}, {props.city}
                    </p>
                </div>

                {/* Photo And Pricing Big Div */}
                <div className="w-full h-full flex lg:flex-row gap-10 items-center lg:items-start flex-col relative">

                    {/* Hostel Image */}
                    <div className="flex lg:items-start lg:justify-start flex-col min-w-[200px] min-h-[112px] max-h-[50.6%] max-w-[90%]">
                        <img loading="lazy" src={getFirstImage(props)} className="rounded-br-[3rem] object-cover lg:w-[500px] lg:h-[281px] w-auto h-auto" />
                    </div>


                    {/* Pricing */}
                    <div className="flex items-center justify-center lg:items-end lg:justify-end flex-col w-[100%] lg:w-[60%]">
                        <div className="flex justify-center flex-col w-full h-auto min-w-[200px] max-w-[90%]">
                            <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                                <h3>
                                    <a href="" rel="noopener noreferrer" target="_blank">
                                        ROOM Sharing &amp; RENT
                                    </a>
                                </h3>
                            </div>

                            {pricingAndSharingDivArray}

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
            </div>

        </section>
    );
}


// const [isWishListed, setIsWishlisted] = React.useState();
// const [wishlistID, setWishlistID] = React.useState();
// Hostel Card
// return (
//     <div className="flex flex-col border border-black px-10">
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
//                 <button onClick={addToWishlist}>{isWishListed ? "Removed to Wishlist" : "Add to wishlist"} </button>
//                 <div>
//                     <h3>Room Type & Rent</h3>
//                     {pricingAndSharingDivArray}
//                 </div>
//                 <Link to={`./${props.id}`}>See Whats Avilable</Link>
//             </div>
//         </div>
//     </div>
// )



    // // function: for adding to wishlist
    // const addToWishlist = async function () {

    //     // If Not Logged In Then Redirect to login page 
    //     if (!authData.isAuthenticate) {
    //         navigate('/login')
    //     }

    //     // If Not in Wishlist....
    //     if (!isWishListed) {
    //         const wishlistData = {
    //             "likedProperty": props.id,
    //             "user": authData.user
    //         }

    //         const token = localStorage.getItem('token')

    //         try {

    //             const options = {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'authorization': `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify(wishlistData),
    //             };

    //             fetch('http://localhost:5000/api/v1/wishlist/', options)
    //                 .then(response => {
    //                     if (!response.ok) {
    //                         throw new Error('Network response was not ok');
    //                     }
    //                     return response.json();
    //                 })
    //                 .then(data => {
    //                     setIsWishlisted(true)
    //                     setWishlistID(data.data._id)
    //                 })
    //                 .catch(error => {
    //                     console.error('Error:', error);
    //                 });

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }

    //     // If it is already in wishlist...
    //     removeToWishlist()

    // }

    // // function: for removing to wishlist
    // const removeToWishlist = async function (id) {
    //     const token = localStorage.getItem('token')
    //     // deleting by fetch request
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${token}`
    //         },
    //     };


    //     fetch(`http://localhost:5000/api/v1/wishlist/${wishlistID}`, options)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             // if success then isWishlisted == false
    //             setIsWishlisted(false)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });

    // }