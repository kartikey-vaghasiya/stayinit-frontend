// Import necessary modules and components
import React from "react"
import Comment from "./Comment"
import { useAuth } from '../../contexts/Auth'
import { useNavigate } from "react-router-dom"

// Define the CommentsDiv component
export default function CommentsDiv({ id, type }) {

    // Get authentication data from the Auth context
    const { authData } = useAuth()
    const { profile, isAuthenticate } = authData

    // Get the navigate function from react-router-dom
    const navigate = useNavigate()

    // Initialize state variables for rating, comment, and user profile
    const [rating, setRating] = React.useState(0)
    const [averageRating, setAverageRating] = React.useState(0);
    const [comment, setComment] = React.useState("")
    const [userProfile, setUserProfile] = React.useState({})

    // Update userProfile state when profile changes
    React.useEffect(() => {
        setUserProfile(profile)
    }, [profile])

    // Initialize state variables for comments and total comments
    const [comments, setComments] = React.useState([]);
    const [totalComments, setTotalComments] = React.useState(() => comments.length)

    // Fetch comments on mount
    React.useEffect(() => {
        async function fetchComments() {
            // GET request to comments API
            const response = await fetch(`http://localhost:5000/api/v1/comment/${type}/${id}`)
            // Convert response to JSON
            const jsonResponse = await response.json()
            // Extract data from JSON response
            const data = jsonResponse.data
            if (jsonResponse.success === true) {
                // Update state with fetched data
                setComments(data.comments)
                setAverageRating(data.averageRating)
                setTotalComments(data.comments.length)
            }
        }
        // Fetch comments
        fetchComments()
    }, [id, type])

    // Handle form submission
    async function handleReviewForm(event) {
        // Stop form from submitting normally
        event.preventDefault()

        // Redirect unauthenticated users to login
        if (!isAuthenticate) {
            navigate("/login")
        } else {
            // Authenticated users can post comments
            try {
                // POST request to comments API
                const response = await fetch('http://localhost:5000/api/v1/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        rating,
                        comment,
                        type,
                        flat: type === "flat" ? id : null,
                        hostel: type === "hostel" ? id : null,
                        profile: userProfile._id
                    })
                })

                // Convert response to JSON
                const jsonResponse = await response.json()

                // On success, reset form and update comments
                if (jsonResponse.success === true) {
                    setComment("")
                    setComments((prev) => [...prev, jsonResponse.data.comment])
                    setRating(0)
                } else {
                    // Log error message on failure
                    console.error(jsonResponse.message)
                }
            } catch (error) {
                // Log any errors during fetch
                console.error(error)
            }
        }
    }


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
                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 items-center justify-center">

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
