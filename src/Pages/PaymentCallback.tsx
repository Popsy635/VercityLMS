import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const PaymentCallback = () => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState(
        "Verifying your payment..."
    );

    const [error, setError] = useState("");


    useEffect(() => {

        const verifyPayment = async () => {

            const reference =
                searchParams.get("reference");

            console.log("PAYMENT REFERENCE:", reference);


            if (!reference) {

                setError(
                    "Payment reference was not found."
                );

                return;
            }


            try {

                setStatus("Verifying your payment...");

                const response =
                    await axiosPrivate.post(
                        "/payment/verify",
                        {
                            reference,
                        }
                    );


                console.log(
                    "PAYMENT VERIFICATION:",
                    response.data
                );


                setStatus(
                    "Payment successful! You are now enrolled."
                );


                setTimeout(() => {

                    navigate("/Dashboard");

                }, 2000);


            } catch (err: any) {

                console.error(
                    "PAYMENT VERIFICATION ERROR:",
                    err
                );


                console.log(
                    "STATUS:",
                    err?.response?.status
                );

                console.log(
                    "DATA:",
                    err?.response?.data
                );


                setError(
                    err?.response?.data?.message ||
                    "We could not verify your payment."
                );

            }

        };


        verifyPayment();

    }, [searchParams, axiosPrivate, navigate]);


    if (error) {

        return (

            <div className="min-h-screen flex items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                        <span className="text-3xl text-red-600">
                            ×
                        </span>

                    </div>


                    <h1 className="mt-6 text-3xl font-semibold">
                        Payment Verification Failed
                    </h1>


                    <p className="mt-3 text-gray-500">
                        {error}
                    </p>


                    <button
                        onClick={() => navigate("/Courses")}
                        className="mt-8 rounded-lg bg-vercity px-6 py-3 text-white"
                    >
                        Back to Courses
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen flex items-center justify-center px-6">

            <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                    <span className="text-3xl text-green-600">
                        ✓
                    </span>

                </div>


                <h1 className="mt-6 text-3xl font-semibold">
                    {status}
                </h1>


                <p className="mt-3 text-gray-500">
                    Please wait while we confirm your enrollment.
                </p>

            </div>

        </div>

    );
};