import React from 'react'
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Union.svg'

import { useState, type ChangeEvent } from "react";
import { Link } from 'react-router-dom'
import { Heading } from '../Components/html/Heading'

import sign from '../assets/sign.png'






export const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined);

    const validateEmail = (value: string) => {
        const isValid =
            value.trim() === ""
                ? true
                : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        setEmailValid(isValid);
        return isValid;
    };

    const navigate = useNavigate();

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setEmail(value);
        validateEmail(value);
    };

    const isFormValid =
        email.trim() !== "" &&
        emailValid === true;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "/auth/forgotpassword",
                {
                    email,
                }
            );

            navigate("/VerifyOTP", {
                state: {email},

        });

            setSuccess(response.data.message);
        } catch (err) {
            setError("Unable to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='login-wrapper bg-white m-h-screen'>
            <div className="mx-auto grid w-full max-w-7xl min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="left flex min-h-screen w-full items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
                    <div className="form-wrapper w-full max-w-md ">
                        <Link to="/">
                            <div><img src={logo} alt="" className='w-30' /></div>
                        </Link>
                        <div className="mt-16 flex w-full flex-col gap-10">
                            
                                <div className='flex flex-col gap-2'>
                                    <Heading style='text-vercity text-[52px] font-semibold' label='forgot password?' />

                                    <p className="max-w-md text-base leading-relaxed sm:text-lg">Enter the email associated with your account and we'll send you a link to reset your password.</p>

                                </div>


                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                                    <div className=' flex flex-col gap-2'>
                                        <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 transition text-base focus:border-gray-500  sm:text-sm/6 group'>
                                            <input
                                                id="email"
                                                type="text"

                                                autoComplete='on'
                                                onChange={handleEmail}
                                                value={email}
                                                required
                                                className="py-2 pr-3 pl-3 rounded-xl absolute inset-0 w-full focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                                            <label htmlFor="email" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:pb-0 peer-focus:scale-100   '>Enter Email</label>
                                        </div>{emailValid === false && email.trim() !== "" && (
                                            <span className="text-xs text-red-500">
                                                Invalid email address
                                            </span>
                                        )}

                                    </div>

                                    <button type="submit"
                                        disabled={!isFormValid || loading} className={`${!isFormValid || loading
                                            ? "bg-gray-400 text-white px-2 rounded-xl py-1 cursor-not-allowed"
                                            : "bg-vercity active:bg-vercity/50 text-white px-2 rounded-xl py-1 hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 "}`}>{loading ? "Sending..." : " Reset Email"}</button>

                                    <div className="text-center">
                                        <Link
                                            to="/Login"
                                            className="text-vercity hover:underline"
                                        >
                                            ← Back to Login
                                        </Link>
                                    </div>

                                </form>
                                {success && (
                                    <div className="rounded-lg bg-green-100 text-green-700 p-3">
                                        {success}
                                    </div>
                                )}

                                {error && (
                                    <div className="rounded-lg bg-red-100 text-red-700 p-3">
                                        {error}
                                    </div>
                                )}




                            
                        </div>
                    </div>



                </div>
                <div className="hidden min-h-screen w-full items-center justify-center px-6 py-10 lg:flex">
                    <div className='bg-adva overflow-hidden mx-w-xl rounded-2xl '><img src={sign} alt="" className=' w-full object-cover ' /></div>
                </div>
            </div>
        </section>
    )
}
