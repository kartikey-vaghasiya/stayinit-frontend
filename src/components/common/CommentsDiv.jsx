import React from "react"
import Comment from "./Comment"
import { useAuth } from '../../contexts/Auth'
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function CommentsDiv({ id, type }) {



    const { authData } = useAuth()
    const { profile, isAuthenticate } = authData
    const navigate = useNavigate()

    const [rating, setRating] = React.useState(0)
    const [averageRating, setAverageRating] = React.useState(0);
    const [comment, setComment] = React.useState("")
    const [userProfile, setUserProfile] = React.useState({})

    React.useEffect(() => {
        setUserProfile(profile)
    }, [profile])

    const [comments, setComments] = React.useState([]);
    const [totalComments, setTotalComments] = React.useState(() => comments.length)

    React.useEffect(() => {
        async function fetchComments() {
            const response = await axios.get(`http://localhost:5000/api/v1/comment/${type}/${id}`)
            const jsonResponse = response.data
            if (jsonResponse.success === true) {
                setComments(jsonResponse.data.comments)
                setTotalComments(jsonResponse.data.comments.length)
                setAverageRating(jsonResponse.data.averageRating)
            }
        }
        fetchComments()
    }, [totalComments])

    // function to handle star clicked by user for rating
    function handleStarClicked(event) {
        const star = Number(event.target.id)
        setRating(star)
    }

    // function to handle comment input
    function handleComment(event) {
        setComment(event.target.value)
    }


    // function to submit star ratings and comments to the backend
    async function handleReviewForm(event) {
        event.preventDefault()

        if (!userProfile) {
            navigate("/login")
        }

        else {

            try {
                const response = await axios.post('http://localhost:5000/api/v1/comment', {
                    rating,
                    comment,
                    type,
                    flat: type === "flat" ? id : null,
                    hostel: type === "hostel" ? id : null,
                    profile: userProfile._id
                })

                const responseJson = response.data
                if (responseJson.success === true) {
                    setComment("")
                    setComments((prev) => {
                        const newComments = [...prev, responseJson.data]
                        return newComments
                    })
                    setTotalComments((prev) => prev + 1)
                    setRating(0)
                } else {
                    console.error(data.message)
                }
            }
            catch (error) {
                console.error(error.message)
            }
        }

    };

    // function to automatically allocate and deallocate star color 
    React.useEffect(() => {

        if (rating != 0) {
            for (let i = 1; i <= rating; i++) {
                document.getElementById(i).src = "/icons/yellow-star.png"
            }

            for (let i = rating + 1; i <= 5; i++) {
                document.getElementById(i).src = "/icons/star.png"
            }
        }

        else {
            for (let i = 1; i <= 5; i++) {
                document.getElementById(i).src = "/icons/star.png"
            }
        }

    }, [rating])


    console.log("comments", comments)
    return (
        <div className="md-down: justify-items-center grid grid-cols-1 lg:grid-cols-2 gap-8 relative ">

            {/* Adding a Comment */}
            <div className="cursor-pointer rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex items-center justify-center flex-col w-full gap-6 h-auto min-w-[300px] max-w-[600px]">
                {/* avrage star ratings */}
                <div className="flex text-lg flex-row gap-2">
                    <span>Average Rating of </span><span className="">{averageRating}</span><span><img className="w-[1.5rem]" src="/icons/yellow-star.png" alt="" /></span>
                </div>
                <p>With Total : {totalComments} Ratings </p>

                {/* User input to give rating and comment */}
                <form onSubmit={handleReviewForm} className="flex flex-col gap-4 items-center justify-center">

                    <div className="flex flex-row gap-3 justify-center items-center">
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/star.png" id="1" alt="star" onClick={(event) => handleStarClicked(event)} />
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/star.png" id="2" alt="star" onClick={(event) => handleStarClicked(event)} />
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/star.png" id="3" alt="star" onClick={(event) => handleStarClicked(event)} />
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/star.png" id="4" alt="star" onClick={(event) => handleStarClicked(event)} />
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/star.png" id="5" alt="star" onClick={(event) => handleStarClicked(event)} />
                    </div>

                    <textarea
                        className="flex w-[20rem] rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                        placeholder="Enter your Review about this Flat/Hostel"
                        value={comment} name="comment" id="comment" onChange={(event) => handleComment(event)} />

                    <button type="submit" className="text-xs bg-colorG text-[#FFFBF2] px-3 py-3 rounded-[3rem] w-full"> Submit your Review {userProfile ? " as " + userProfile.username : " ( Login to comment ) "}</button>
                </form>
            </div>



            {/* Displaying all comments */}
            <div className="cursor-pointer rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex items-center flex-col w-full h-[20rem] overflow-y-scroll min-w-[300px] max-w-[600px]">

                <div className="flex flex-col gap-4 mt-[2rem]">
                    {comments ? comments.map((singleComment) => {
                        return (
                            <>
                                <Comment key={singleComment._id} id={singleComment._id} comment={singleComment.comment} rating={singleComment.rating} profile={singleComment.profile} createdAt={singleComment.createdAt} />
                                <hr />
                            </>
                        )
                    }) : <></>}

                </div>
            </div>
        </div>
    )
}