import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import logo from "../assets/Union.svg";
import master from "../assets/money.png"
import visa from "../assets/visa.png"
import verve from "../assets/verve.png";
import paypal from "../assets/paypal.png";
import bank from "../assets/transfer.png";

type Course = {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string | null;
    category?: string;
    level?: string;
    price?: number;
    instructorId?: {
        name?: string;
    };
};

type PaymentMethod = "card" | "paypal" | "bank";

export const Checkout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const course = location.state?.course as Course | undefined;

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("card");

    const [agreed, setAgreed] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    /*
     * If user refreshes checkout and React Router
     * state disappears.
     */
    if (!course) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-2xl font-semibold">
                        Course not found
                    </h1>

                    <button
                        onClick={() => navigate("/Courses")}
                        className="mt-5 rounded-lg bg-vercity px-5 py-2.5 text-white"
                    >
                        Back to Courses
                    </button>

                </div>

            </div>
        );
    }


    const price = course.price || 0;


    const handleProceed = async () => {

        if (!agreed) {
            setError("Please agree to the terms before proceeding.");
            return;
        }

        if (!course?._id) {
            setError("Course information is missing.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axiosPrivate.post(
                "/payment/initialize",
                {
                    type: "course",
                    courseId: course._id,
                }
            );


            console.log("PAYMENT INITIALIZE:", response.data);

            const authorizationUrl =
                response.data?.data?.authorizationUrl;

            const reference =
                response.data?.data?.reference;

            console.log("PAYMENT REFERENCE:", reference);

            if (!authorizationUrl) {
                throw new Error(
                    "Payment authorization URL was not returned."
                );
            }

            // Save the course before leaving the site
            localStorage.setItem("pendingCourseId", course._id);
            localStorage.setItem("paymentReference", reference);
            // Redirect to Paystack
            window.location.href = authorizationUrl;
            console.log("AUTHORIZATION URL:", authorizationUrl);

        } catch (err: any) {

            console.error("PAYMENT ERROR:", err);

            console.log("STATUS:", err?.response?.status);
            console.log("DATA:", err?.response?.data);

            setError(
                err?.response?.data?.message ||
                "Unable to initialize payment. Please try again."
            );

        } finally {

            setLoading(false);


        }
    };


    return (

        <div className="min-h-screen bg-white">


            {/* ================= HEADER ================= */}

            <header className="h-24 border-b border-gray-300">

                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

                    <img
                        src={logo}
                        alt="Vercity"
                        className="w-32"
                    />

                    <button
                        onClick={() => navigate(-1)}
                        className="text-vercity hover:underline"
                    >
                        Exit
                    </button>

                </div>

            </header>



            {/* ================= MAIN ================= */}

            <main className="bg-[#f7f7fa]">

                <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl lg:grid-cols-2">


                    {/* ================= PAYMENT ================= */}

                    <section className="bg-white px-6 py-12 lg:px-12">

                        <div className="mx-auto max-w-xl">


                            <h1 className="text-3xl font-semibold">
                                Check Out
                            </h1>


                            <p className="mt-2 text-sm text-gray-600">
                                All Payment Are Safe And Secure.
                            </p>



                            {/* PAYMENT METHOD */}

                            <div className="mt-10">

                                <h2 className="text-xl font-medium">
                                    Payment Method
                                </h2>



                                <div className="mt-4 border border-gray-400">


                                    {/* CARD */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPaymentMethod("card")
                                        }
                                        className="flex w-full items-center justify-between border-b border-gray-400 bg-gray-100 px-4 py-3"
                                    >

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`h-5 w-5 rounded-full border-2 border-vercity ${paymentMethod === "card"
                                                    ? "bg-vercity"
                                                    : "bg-white"
                                                    }`}
                                            />

                                            <span>
                                                Cards
                                            </span>

                                        </div>


                                        <div className="flex items-center gap-2">

                                            <img
                                                src={master}
                                                alt="Mastercard"
                                                className="h-8 w-12 object-contain"
                                            />

                                            <img
                                                src={visa}
                                                alt="Visa"
                                                className="h-8 w-12 object-contain"
                                            />

                                            <img
                                                src={verve}
                                                alt="Verve"
                                                className="h-8 w-12 object-contain"
                                            />

                                        </div>

                                    </button>



                                    {/* CARD DETAILS */}

                                    {paymentMethod === "card" && (

                                        <div className="space-y-5 p-8">

                                            <div>

                                                <label className="mb-2 block text-sm">
                                                    Card number
                                                </label>

                                                <input
                                                    disabled

                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    className="cursor-not-allowed w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-vercity"
                                                />

                                            </div>



                                            <div className="grid grid-cols-2 gap-6">

                                                <div>

                                                    <label className="mb-2 block text-sm">
                                                        Expiry
                                                    </label>

                                                    <input
                                                        disabled
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        className="cursor-not-allowed w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-vercity"
                                                    />

                                                </div>


                                                <div>

                                                    <label className="mb-2 block text-sm">
                                                        CVC/CVV
                                                    </label>

                                                    <input
                                                        disabled
                                                        type="text"
                                                        placeholder="CVC"
                                                        className="cursor-not-allowed w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-vercity"
                                                    />

                                                </div>

                                            </div>



                                            <div>

                                                <label className="mb-2 block text-sm">
                                                    Name on card
                                                </label>

                                                <input
                                                    disabled
                                                    type="text"
                                                    placeholder="Name On Card"
                                                    className="cursor-not-allowed w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-vercity"
                                                />

                                            </div>



                                            <label className="flex items-center gap-2 text-sm">

                                                <input
                                                    disabled
                                                    type="checkbox"
                                                    className="accent-vercity"
                                                />

                                                Save card

                                            </label>

                                        </div>

                                    )}



                                    {/* PAYPAL */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPaymentMethod("paypal")
                                        }
                                        className="flex w-full items-center gap-3 border-b border-gray-400 bg-gray-100 px-4 py-4"
                                    >

                                        <span
                                            className={`h-5 w-5 rounded-full border-2 border-vercity ${paymentMethod === "paypal"
                                                ? "bg-vercity"
                                                : "bg-white"
                                                }`}
                                        />

                                        <img
                                            src={paypal}
                                            alt="PayPal"
                                            className="h-7 w-10 object-contain"
                                        />

                                        <span className="text-sm">
                                            Paypal
                                        </span>

                                    </button>



                                    {/* BANK */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPaymentMethod("bank")
                                        }
                                        className="flex w-full items-center gap-3 bg-gray-100 px-4 py-4"
                                    >

                                        <span
                                            className={`h-5 w-5 rounded-full border-2 border-vercity ${paymentMethod === "bank"
                                                ? "bg-vercity"
                                                : "bg-white"
                                                }`}
                                        />

                                        <img
                                            src={bank}
                                            alt="Bank"
                                            className="h-8 w-10 object-contain"
                                        />

                                        <span className="text-sm">
                                            Bank Transfer
                                        </span>

                                    </button>

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* ================= ORDER SUMMARY ================= */}

                    <section className="px-6 py-12 lg:px-12">

                        <div className="mx-auto max-w-xl">


                            {/* COURSE CARD */}

                            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                                <img
                                    src={
                                        course.thumbnail ||
                                        "/placeholder-course.jpg"
                                    }
                                    alt={course.title}
                                    className="h-36 w-52 rounded-2xl object-cover"
                                />


                                <div className="flex flex-col justify-between py-1">

                                    <div>

                                        <h2 className="font-medium">
                                            {course.title}
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-600">
                                            Learn {course.category || "practical skills"} in this course.
                                        </p>

                                    </div>


                                    <p className="text-sm text-gray-500">
                                        Prof. {course.instructorId?.name || "Instructor"}
                                    </p>

                                </div>

                            </div>



                            {/* ORDER SUMMARY */}

                            <h2 className="mt-8 text-3xl font-semibold">
                                Order Summary
                            </h2>


                            <div className="mt-6">

                                <div className="flex justify-between border-b border-gray-400 pb-3">

                                    <span>
                                        Course Price:
                                    </span>

                                    <span>
                                        ₦{price.toLocaleString()}
                                    </span>

                                </div>


                                <div className="flex justify-between py-5 text-lg">

                                    <span>
                                        Total Cost
                                    </span>

                                    <span>
                                        ₦{price.toLocaleString()}
                                    </span>

                                </div>

                            </div>



                            {/* AGREEMENT */}

                            <label className="mt-4 flex gap-2 text-sm">

                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => {
                                        setAgreed(e.target.checked);
                                        setError("");
                                    }}
                                    className="mt-1 accent-vercity"
                                />

                                <span>
                                    By Clicking Proceed, You Agree To Commit To Learning
                                </span>

                            </label>



                            {/* ERROR */}

                            {error && (

                                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </p>

                            )}



                            {/* PROCEED */}

                            <button
                                type="button"
                                onClick={handleProceed}
                                disabled={!agreed || loading}
                                className={`mt-7 w-full rounded-lg py-4 text-2xl font-medium text-white transition ${!agreed || loading
                                    ? "cursor-not-allowed bg-gray-400"
                                    : "bg-vercity hover:opacity-90"
                                    }`}
                            >

                                {loading
                                    ? "Redirecting to Paystack..."
                                    : "Proceed to Payment"}

                            </button>



                            {/* REFUND */}

                            <div className="mt-7">

                                <h3 className="text-lg font-medium">
                                    7days Refund Policy
                                </h3>

                                <p className="mt-2 leading-6">
                                    Not Satisfied? Get A Full Refund Within
                                    7 Days. Straightforward And Simple
                                </p>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};