import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth';

export default function Login() {

    const navigate = useNavigate();
    const { loginContextFunction } = useAuth()

    const [loginData, setLoginData] = React.useState({})
    const [error, setError] = React.useState("")

    function handleLoginInput(event) {
        const { name, value } = event.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleLoginSubmit(event) {
        try {

            event.preventDefault()

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginData.email.toLowerCase(),
                    password: loginData.password,
                }),
            }

            const response = await fetch('http://localhost:5000/api/v1/auth/login', requestOptions);
            const jsonResponse = await response.json()
            const data = jsonResponse.data;
            const token = jsonResponse.token

            if (jsonResponse.success === true) {
                loginContextFunction(jsonResponse)
                navigate('/');
                window.location.reload();
            } else {
                setError(jsonResponse.message)
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-1">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl leading-tight text-black sm:text-4xl">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/signup"
                                title=""
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        {/* Login Form */}
                        <form onSubmit={handleLoginSubmit} method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            onChange={handleLoginInput}
                                            value={loginData.email}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <a
                                            href={`login/forgot-password`}
                                            title=""
                                            className="text-sm font-semibold text-black hover:underline"
                                            name="password"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            value={loginData.password}
                                            onChange={handleLoginInput}
                                        ></input>
                                    </div>
                                </div>
                                <div>

                                    {error !== "" &&
                                        <div>
                                            <h1 className='px-[2rem] py-[1rem] bg-red-200 text-red-600 rounded-[3rem]'>{error}</h1>
                                        </div>
                                    }
                                    <button type="submit" class="w-full">
                                        <div className="bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5">
                                            <div className="text-base leading-6 self-center whitespace-nowrap">
                                                Login
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
