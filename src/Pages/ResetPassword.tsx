import { useState, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../api/axios";

import logo from "../assets/Union.svg";
import sign from "../assets/sign.png";
import { Heading } from "../Components/html/Heading";


const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,24}$/;


export const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    /*
        Get the email and OTP passed from VerifyOTP
    */
    const email = location.state?.email || "";
    const otp = location.state?.otp || "";


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordValid, setPasswordValid] = useState<boolean | undefined>(
        undefined
    );

    const [confirmValid, setConfirmValid] = useState<boolean | undefined>(
        undefined
    );

    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    /*
        Handle password input
    */
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;

        setPassword(value);

        setPasswordValid(
            value.trim() === ""
                ? undefined
                : PWD_REGEX.test(value)
        );

        setConfirmValid(
            confirmPassword.trim() === ""
                ? undefined
                : value === confirmPassword
        );

        setError("");
    };


    /*
        Handle confirm password
    */
    const handleConfirmPassword = (
        e: ChangeEvent<HTMLInputElement>
    ) => {

        const value = e.target.value;

        setConfirmPassword(value);

        setConfirmValid(
            value.trim() === ""
                ? undefined
                : password === value
        );

        setError("");
    };


    /*
        Form validation
    */
    const isFormValid =
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        passwordValid === true &&
        confirmValid === true;


    /*
        Submit new password
    */
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        /*
            Prevent the page from being accessed
            without completing OTP verification.
        */
        if (!email || !otp) {

            setError(
                "Your reset session has expired. Please request a new reset code."
            );

            return;
        }

        if (!isFormValid) return;

        setLoading(true);

        try {

            await axios.post("/auth/reset-password", {
                email,
                otp,
                password,
            });

            setSuccess(
                "Your password has been reset successfully."
            );

            /*
                Give the user a moment to see
                the success message before login.
            */
            setTimeout(() => {
                navigate("/Login");
            }, 1500);

        } catch (error) {

            console.error("RESET PASSWORD ERROR:", error);

            setError(
                "Unable to reset your password. Your code may have expired."
            );

        } finally {

            setLoading(false);

        }
    };


    /*
        If the user somehow opens /ResetPassword
        directly without going through OTP,
        don't show the reset form.
    */
    if (!email || !otp) {

        return (
            <section className="min-h-screen flex items-center justify-center px-6">

                <div className="text-center">

                    <h1 className="text-3xl font-semibold text-vercity">
                        Reset session expired
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Please request a new password reset code.
                    </p>

                    <Link
                        to="/ForgotPassword"
                        className="inline-block mt-6 text-vercity hover:underline"
                    >
                        ← Request a new code
                    </Link>

                </div>

            </section>
        );
    }


    return (

        <section className="login-wrapper bg-white flex justify-center items-center min-h-screen">

            <div className="mx-auto flex w-full max-w-7xl min-h-screen items-center px-6 lg:px-12">


                {/* LEFT SIDE */}

                <div className="w-full lg:w-1/2 min-h-screen flex justify-center items-center">

                    <div className="w-full max-w-lg flex flex-col gap-16">


                        {/* LOGO */}

                        <Link to="/">

                            <img
                                src={logo}
                                alt="Vercity"
                                className="w-30"
                            />

                        </Link>


                        <div className="w-full flex justify-center">

                            <div className="w-full max-w-md flex flex-col gap-10">


                                {/* HEADING */}

                                <div className="flex flex-col gap-3">

                                    <Heading
                                        style="text-vercity text-[52px] font-semibold"
                                        label="reset password"
                                    />

                                    <p className="text-[18px] leading-relaxed">
                                        Create a new password for your account.
                                        Make sure it is strong and easy for you
                                        to remember.
                                    </p>

                                </div>


                                {/* FORM */}

                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-6 w-full"
                                >


                                    {/* PASSWORD FIELDS */}

                                    <div className="flex flex-col gap-5">


                                        {/* NEW PASSWORD */}

                                        <div>

                                            <div className="relative flex items-center border border-gray-300 hover:border-gray-500 rounded-xl py-5 px-3">

                                                <input
                                                    id="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={handlePassword}
                                                    onFocus={() =>
                                                        setPasswordFocus(true)
                                                    }
                                                    onBlur={() =>
                                                        setPasswordFocus(false)
                                                    }
                                                    required
                                                    placeholder=" "
                                                    className="absolute inset-0 w-full h-full px-4 rounded-xl focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer"
                                                />

                                                <label
                                                    htmlFor="password"
                                                    className="absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100"
                                                >
                                                    New Password
                                                </label>

                                            </div>


                                            {passwordFocus &&
                                                password &&
                                                passwordValid === false && (

                                                    <p
                                                        className="text-xs rounded-lg bg-black text-white p-2 mt-2"
                                                        role="alert"
                                                    >
                                                        Password must be 6–24
                                                        characters and contain
                                                        uppercase and lowercase
                                                        letters, a number, and a
                                                        special character.
                                                    </p>

                                                )}

                                        </div>


                                        {/* CONFIRM PASSWORD */}

                                        <div>

                                            <div className="relative flex items-center border border-gray-300 hover:border-gray-500 rounded-xl py-5 px-3">

                                                <input
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPassword}
                                                    onFocus={() =>
                                                        setConfirmFocus(true)
                                                    }
                                                    onBlur={() =>
                                                        setConfirmFocus(false)
                                                    }
                                                    required
                                                    placeholder=" "
                                                    className="absolute inset-0 w-full h-full px-4 rounded-xl focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer"
                                                />

                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100"
                                                >
                                                    Confirm Password
                                                </label>

                                            </div>


                                            {confirmFocus &&
                                                confirmPassword &&
                                                confirmValid === false && (

                                                    <p
                                                        className="text-xs rounded-lg bg-black text-white p-2 mt-2"
                                                        role="alert"
                                                    >
                                                        Passwords must match.
                                                    </p>

                                                )}

                                        </div>

                                    </div>


                                    {/* ERROR */}

                                    {error && (

                                        <p
                                            className="text-sm text-red-500"
                                            role="alert"
                                            aria-live="assertive"
                                        >
                                            {error}
                                        </p>

                                    )}


                                    {/* SUCCESS */}

                                    {success && (

                                        <p
                                            className="rounded-lg bg-green-100 text-green-700 p-3 text-sm"
                                            role="status"
                                        >
                                            {success}
                                        </p>

                                    )}


                                    {/* SUBMIT */}

                                    <button
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        className={
                                            !isFormValid || loading
                                                ? "bg-gray-400 text-white px-2 rounded-xl py-2 cursor-not-allowed"
                                                : "bg-vercity text-white px-2 rounded-xl py-2 hover:bg-linear-to-bl hover:from-vercity hover:to-advbut hover:transition hover:ease-in-out hover:duration-300"
                                        }
                                    >

                                        {loading
                                            ? "Resetting..."
                                            : "Reset Password"}

                                    </button>


                                    {/* BACK TO LOGIN */}

                                    <div className="text-center">

                                        <Link
                                            to="/Login"
                                            className="text-vercity hover:underline"
                                        >
                                            ← Back to Login
                                        </Link>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="hidden lg:flex lg:w-1/2 min-h-screen justify-center items-center">

                    <div className="bg-adva overflow-hidden w-full max-w-2xl rounded-2xl">

                        <img
                            src={sign}
                            alt=""
                            className="w-full object-cover"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};