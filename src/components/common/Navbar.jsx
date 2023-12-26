'use client'

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../../contexts/Auth'

export default function Navbar() {

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const { authData, logoutContextFunction } = useAuth()
    const { isAuthenticate, profile } = authData


    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [userProfile, setUserProfile] = React.useState({})

    useEffect(() => {
        setUserProfile(profile)
    }, [profile])

    return (
        <div className="w-full px-[2rem] shadow-sm md:px-[6rem] bg-colorY sticky top-0 z-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between py-1">
                {/* Logo */}
                <div className="inline-flex items-center">
                    <a href="/" className=" cursor-pointer">
                        <div className='flex flex-row gap-3 items-center text-xl'>
                            <img src="/stayinit.svg" className='w-32' alt="" />
                        </div>
                    </a>
                </div>

                {/* Login Signup Kartik */}
                <div className="hidden lg:block">
                    <div className="inline-flex space-x-6">
                        {isAuthenticate ?
                            (
                                <div className="">
                                    <div key="Logout">
                                        <button
                                            onClick={logoutContextFunction}
                                            className=""
                                        >
                                            <div className='text-xl flex flex-row gap-3 py-2 px-5 items-center hover:bg-colorYH rounded-[2rem]'>
                                                <img src="/icons/login.png" className='w-5 h-5' alt="" /> <span>Logout</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="">
                                    <div key="Login">
                                        <Link
                                            to="/login"
                                            className=""
                                        >
                                            <div className='text-xl flex flex-row gap-3 py-2 px-5 items-center hover:bg-colorYH rounded-[2rem]'>
                                                <img src="/icons/login.png" className='w-5 h-5' alt="" /> <span>login</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        {isAuthenticate ?
                            (
                                <div className="flex flex-row gap-4">
                                    <div key="User">
                                        <Link
                                            to="/user/wishlist"
                                            className=""
                                        >
                                            <div className='text-xl flex flex-row gap-3 py-2 px-5 items-center hover:bg-colorYH rounded-[2rem]'>
                                                <img src="/icons/heart.png" className='w-5 h-5' alt="" /> <span>Wishlist</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div key="User">
                                        <Link
                                            to="/"
                                            className=""
                                        >
                                            <div className='text-xl flex flex-row gap-3 py-2 px-5 items-center hover:bg-colorYH rounded-[2rem]'>
                                                <img src="/icons/user.png" className='w-5 h-5' alt="" /> <span>{userProfile ? userProfile.username : "User"}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="">
                                    <div key="Signup">
                                        <Link
                                            to="/signup"
                                            className=""
                                        >
                                            <div className='text-xl flex flex-row gap-3 py-2 px-5 items-center hover:bg-colorYH rounded-[2rem]'>
                                                <img src="/icons/user.png" className='w-5 h-5' alt="" /> <span>Signup</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}

                    </div>
                </div>

                {/* Toggle Menu */}
                <div className="lg:hidden">
                    {/* <h1>Hey</h1> */}
                    <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                </div>

                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-colorY shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex flex-row items-center justify-center">
                                    <div className="inline-flex items-center space-x-2">
                                        <span className="font-bold">
                                            <img src="/stayinit.png" className='w-[7rem]' alt="" />
                                        </span>
                                    </div>
                                    <div className="-mr-2 absolute top-8 right-8" >
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <X className="h-8 w-8" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="">
                                        {/* Login Signup Kartik */}
                                        <div className="flex flex-col gap-4 items-center">

                                            {isAuthenticate ?
                                                (<div className="inline-flex space-x-8">
                                                    <button
                                                        onClick={logoutContextFunction}
                                                        className="text-xl font-light text-gray-800 hover:text-gray-900 cursor-pointer py-2 px-4 hover:bg-colorYH rounded-[2rem]"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>) :

                                                (<div className="inline-flex space-x-8">
                                                    <div key="Login">
                                                        <a
                                                            href="/login"
                                                            className="text-xl font-light text-gray-800 hover:text-gray-900 cursor-pointer py-2 px-4 hover:bg-colorYH rounded-[2rem]"
                                                        >
                                                            Login
                                                        </a>
                                                    </div>
                                                </div>)
                                            }

                                            {isAuthenticate ?
                                                (<div className="inline-flex space-x-8">
                                                    <a
                                                        href="/"
                                                        className="text-xl font-light text-gray-800 hover:text-gray-900 cursor-pointer py-2 px-4 hover:bg-colorYH rounded-[2rem]"
                                                    >
                                                        {userProfile ? userProfile.username : "User"}
                                                    </a>
                                                </div>) :

                                                (<div className="inline-flex space-x-8">
                                                    <div key="Logout">
                                                        <a
                                                            href=""
                                                            className="text-xl font-light text-gray-800 hover:text-gray-900 cursor-pointer py-2 px-4 hover:bg-colorYH rounded-[2rem]"
                                                        >
                                                            Signup
                                                        </a>
                                                    </div>
                                                </div>)
                                            }

                                            <div className="inline-flex space-x-8">
                                                <a
                                                    href="/"
                                                    className="text-xl font-light text-gray-800 hover:text-gray-900 cursor-pointer py-2 px-4 hover:bg-colorYH rounded-[2rem]"
                                                >
                                                    About Us
                                                </a>
                                            </div>

                                            <div className="inline-flex space-x-8">
                                                <a
                                                    href="/"
                                                    className="text-xl font-light text-gray-800 hover:text-gray-900 cursor-pointer py-2 px-4 hover:bg-colorYH rounded-[2rem]"
                                                >
                                                    Contact US
                                                </a>
                                            </div>

                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
