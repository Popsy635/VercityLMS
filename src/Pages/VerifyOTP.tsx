
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

import logo from "../assets/Union.svg";
import sign from "../assets/sign.png";
import { Heading } from "../Components/html/Heading";

export const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // Email passed from the Forgot Password page
    const email = location.state?.email || "";

    const handleOtp = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Only allow numbers and maximum 6 digits
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
            setError("");
        }
    };

    const isFormValid = otp.length === 6;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) return;

        setLoading(true);
        setError("");

        try {
            await axios.post("/auth/verifyotp", {
                email,
                otp,
            });

            navigate("/ResetPassword", {
                state: {
                    email,
                    otp,
                },
            });

        } catch (err) {
            setError("Invalid or expired OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setError("");

            await axios.post("/auth/forgotpassword", {
                email,
            });

        } catch (err) {
            setError("Unable to resend the code. Please try again.");
        }
    };

    return (
        <section className="login-wrapper bg-white flex justify-center items-center min-h-screen">

            <div className="mx-auto flex w-full max-w-7xl min-h-screen items-center px-6 lg:px-12">

                {/* LEFT SIDE */}
                <div className="left w-full lg:w-1/2 min-h-screen flex justify-center items-center">

                    <div className="form-wrapper w-full max-w-lg flex flex-col gap-16">

                        {/* LOGO */}
                        <Link to="/">
                            <div>
                                <img
                                    src={logo}
                                    alt="Vercity"
                                    className="w-30"
                                />
                            </div>
                        </Link>

                        <div className="w-full flex justify-center">

                            <div className="w-full max-w-md flex flex-col gap-10">

                                {/* HEADING */}
                                <div className="flex flex-col gap-3">

                                    <Heading
                                        style="text-vercity text-[52px] font-semibold"
                                        label="check your email"
                                    />

                                    <p className="text-[18px] leading-relaxed">
                                        We've sent a 6-digit verification code to{" "}
                                        <span className="font-medium">
                                            {email || "your email address"}
                                        </span>
                                        . Enter the code below to continue.
                                    </p>

                                </div>


                                {/* FORM */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-6 w-full"
                                >

                                    <div className="flex flex-col gap-2">

                                        <div className="relative flex items-center border border-gray-300 hover:border-gray-500 rounded-xl py-5 px-3">

                                            <input
                                                id="otp"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                maxLength={6}
                                                value={otp}
                                                onChange={handleOtp}
                                                required
                                                placeholder=" "
                                                className="absolute inset-0 w-full h-full px-4 rounded-xl focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer"
                                            />

                                            <label
                                                htmlFor="otp"
                                                className="absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100"
                                            >
                                                Enter verification code
                                            </label>

                                        </div>

                                        <p className="text-sm text-gray-500">
                                            Enter the 6-digit code from your email.
                                        </p>

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


                                    {/* VERIFY BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        className={
                                            !isFormValid || loading
                                                ? "bg-gray-400 text-white px-2 rounded-xl py-2 cursor-not-allowed"
                                                : "bg-vercity active:bg-vercity/50 text-white px-2 rounded-xl py-2 hover:bg-linear-to-bl hover:from-vercity hover:to-advbut hover:transition hover:ease-in-out hover:duration-300"
                                        }
                                    >
                                        {loading ? "Verifying..." : "Verify Code"}
                                    </button>


                                    {/* RESEND */}
                                    <div className="text-center text-sm">

                                        <span className="text-gray-500">
                                            Didn't receive the code?{" "}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            className="text-vercity hover:underline"
                                        >
                                            Resend Code
                                        </button>

                                    </div>


                                    {/* BACK */}
                                    <div className="text-center">

                                        <Link
                                            to="/ForgotPassword"
                                            className="text-vercity hover:underline"
                                        >
                                            ← Back to Forgot Password
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

