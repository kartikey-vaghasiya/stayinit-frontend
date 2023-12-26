import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {


    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [isOtpSent, setIsOtpSent] = React.useState(false)
    const [otp, setOtp] = React.useState("")
    const [isUserVerified, setIsUserVerified] = React.useState(false);
    const [signupData, setSignupData] = React.useState({})
    const [error, setError] = React.useState("")


    async function handleEmailSubmit(event) {
        event.preventDefault()
        if (!email) { setError("Please enter your email") }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }

        const response = await fetch('http://localhost:5000/api/v1/auth/register/send-verification-otp', requestOptions);
        const jsonResponse = await response.json()
        const data = jsonResponse.data;

        if (jsonResponse.success === true) {
            setIsOtpSent(true)
            setError("")
        }

        else {
            setIsOtpSent(false)
            setError(jsonResponse.message)
        }
    }

    async function handleOtpSubmit(event) {
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, email }),
        }

        const response = await fetch('http://localhost:5000/api/v1/auth/register/verify-otp', requestOptions);
        const jsonResponse = await response.json()
        const data = jsonResponse.data;

        if (jsonResponse.success === true) {
            setIsUserVerified(true)
            setError("")
        }

        else {
            setIsUserVerified(false)
            setError(jsonResponse.message)
        }
    }

    function handleSignupInput(event) {
        const { name, value } = event.target;
        setSignupData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleUserSubmit(event) {

        try {
            event.preventDefault()

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: signupData.username,
                    email: email,
                    phoneNumber: signupData.phoneNumber,
                    password: signupData.password,
                    confirmPassword: signupData.confirmPassword,
                })
            }

            const response = await fetch('http://localhost:5000/api/v1/auth/register', requestOptions);
            const jsonResponse = await response.json()
            const data = jsonResponse.data;
            if (jsonResponse.success === true) {
                navigate('/login');
                setError("")
            }
            else {
                setError(jsonResponse.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className='w-full h-full justify-center items-center '>
            <div className='h-full w-full flex flex-col justify-evenly items-center'>
                <h2 className="text-3xl leading-tight text-black sm:text-4xl">Signup/Register</h2>
                <div>
                    <p className='text-red-500'>{error !== "" ? error.toLocaleUpperCase() : ""}</p>
                    <p className='font-semibold cursor-pointer'>Already have an accout?<Link to="/login">Login</Link></p>
                </div>
                <div className='flex flex-col'>
                    {!isOtpSent ?
                        <div className='flex flex-col w-[20rem]'>
                            {/* email form */}
                            <form onSubmit={(event) => { handleEmailSubmit(event) }} className='flex flex-col'>

                                <input
                                    type="email"
                                    placeholder='Email'
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    value={email}
                                    className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                />
                                <input type="submit" className="bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5" value="Submit" />
                            </form>
                        </div>
                        :
                        !isUserVerified ?
                            <div className='flex flex-col w-[20rem] gap-4'>
                                <h1 className='mt-2 text-xl text-gray-600'> You will get OTP email </h1>
                                {/* otp form */}
                                <form onSubmit={(event) => { handleOtpSubmit(event) }} className='flex flex-col' >

                                    <input
                                        type="text"
                                        onChange={(event) => { setOtp(event.target.value) }}
                                        value={otp}
                                        placeholder='OTP'
                                        className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                    />
                                    <input type="submit" className='bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5' value="Verify OTP" />
                                </form>
                            </div>
                            :
                            <div className='flex flex-col w-[20rem] '>
                                {/* signup form */}
                                <form onSubmit={(event) => { handleUserSubmit(event) }} className='flex flex-col gap-4'>

                                    <input
                                        type="text"
                                        onChange={handleSignupInput}
                                        value={signupData.username}
                                        placeholder='Username'
                                        name='username'
                                        className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        onChange={handleSignupInput}
                                        value={signupData.phoneNumber}
                                        placeholder='Phone Number'
                                        name='phoneNumber'
                                        className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                    />
                                    <input
                                        type="password"
                                        onChange={handleSignupInput}
                                        value={signupData.password}
                                        placeholder='Password'
                                        name='password'
                                        className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                    />

                                    <input
                                        type="password"
                                        onChange={handleSignupInput}
                                        value={signupData.confirmPassword}
                                        placeholder='Confirm Password'
                                        name='confirmPassword'
                                        className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                    />
                                    <input type="submit" className="bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5" value="Signup" />
                                </form>
                            </div>
                    }
                </div>
            </div>
        </section >

    )
}
