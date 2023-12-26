import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {


    const [error, setError] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [email, setEmail] = useState('');

    async function sendMail(email) {

        try {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }

            const response = await fetch('http://localhost:5000/api/v1/auth/user/send-reset-password-token', requestOptions);
            const jsonResponse = await response.json()
            const data = jsonResponse.data;

            if (jsonResponse.success === true) {
                setIsValidEmail(() => true)
                setError(() => "")
            }

            else {
                setError(() => jsonResponse.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-colorY ">

            {
                isValidEmail ?

                    <div className='flex flex-col gap-6'>
                        <h1 className='text-xl'>Follow the link send to your email for reset password... </h1>
                        <Link to="/" className='text-white text-center rounded-[3rem] p-3 bg-colorG'>Go Back Home</Link>
                        <Link to="/login" className='text-white text-center rounded-[3rem] p-3 bg-colorG'> Go Back to Login </Link>
                    </div>

                    :

                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            sendMail(email)
                        }}
                        className="flex flex-col gap-8 items-center w-[20rem]"
                    >
                        <div>
                            <h1 className='text-3xl'>
                                Reset Password
                            </h1>
                            <h6>Enter the email registerd with your account</h6>
                        </div>

                        <input type="text"
                            value={email}
                            placeholder='Enter your email registered with us'
                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                            onChange={(e) => setEmail(e.target.value)} />

                        <button type='submit' className='bg-colorG w-full text-[#FFFBF2] px-4 py-4 rounded-[3rem]'>Verify Email</button>

                    </form>
            }

            {
                error !== "" &&
                <div>
                    <h1 className='mt-6 px-3 w-full py-[1rem] bg-red-200 text-white rounded-[3rem]'>{error}</h1>
                </div>
            }

        </div>
    );
};

export default ForgotPassword;