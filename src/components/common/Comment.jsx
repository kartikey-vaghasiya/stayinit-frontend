import React from "react"

export default function Comment({ comment, profile, createdAt, rating, id }) {


    const [userProfile, setUserProfile] = React.useState(profile)

    return (
        <div className="w-full">
            <div className="">
                <div className="flex flex-col justify-between">
                    <span className="text-sm font-bold">{userProfile.username}</span>
                    <span className="text-sm">{createdAt}</span>
                </div>
                <div className="mt-2">
                    <div className="flex flex-row gap-2">
                        <span className="text-lg">{rating}</span><span><img className="w-[1.5rem]" src="/icons/yellow-star.png" alt="" /></span>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg text-gray-900">{comment}</p>
            </div>
        </div>
    )
}