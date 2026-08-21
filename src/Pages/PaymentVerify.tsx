import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const PaymentVerify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyPayment = async () => {
    const reference = searchParams.get("reference");
    localStorage.getItem("paymentReference");

    console.log("PAYMENT REFERENCE:", reference);
    

    if (!reference) {
        setError("Payment reference was not found.");
        setLoading(false);
        return;
    }

    // Get the course the user was paying for
    const pendingCourseId =
        localStorage.getItem("pendingCourseId");

    console.log(
        "PENDING COURSE ID:",
        pendingCourseId
    );

    if (!pendingCourseId) {
        setError(
            "The course associated with this payment could not be found."
        );
        setLoading(false);
        return;
    }

    try {

        // ==========================================
        // STEP 1: VERIFY PAYMENT
        // ==========================================

        const paymentResponse =
            await axiosPrivate.post(
                "/payment/verify",
                {
                    reference,
                }
            );

        console.log(
            "FULL PAYMENT VERIFICATION RESPONSE:",
            JSON.stringify(
                paymentResponse.data,
                null,
                2
            )
        );
        

        const paymentMessage =
            paymentResponse.data?.message;

        const paymentVerified =
            paymentResponse.data?.success ||
            paymentMessage === "Payment already verified";

        if (!paymentVerified) {

            setError(
                paymentMessage ||
                "Payment verification failed."
            );

            return;
        }


        if (paymentVerified) {
    console.log("PAYMENT VERIFIED SUCCESSFULLY");

    localStorage.removeItem("pendingCourseId");

    setSuccess(true);
} else {
    setError(
        paymentMessage ||
        "Payment verification failed."
    );
}


    } catch (err: any) {

        console.error(
            "PAYMENT / ENROLLMENT ERROR:",
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
            "Payment was successful, but we could not enroll you in the course."
        );

    } finally {

        setLoading(false);

    }
};

        verifyPayment();

    }, [searchParams, axiosPrivate]);




    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-vercity" />

                    <p className="mt-5 text-gray-500">
                        Verifying your payment...
                    </p>

                </div>
            </div>
        );
    }


    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <span className="text-4xl text-green-600">
                            ✓
                        </span>
                    </div>

                    <h1 className="mt-6 text-3xl font-semibold text-vercity">
                        Payment Successful!
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Your payment has been confirmed.
                    </p>

                    <button
                        onClick={() => navigate("/Dashboard")}
                        className="mt-6 rounded-lg bg-vercity px-6 py-3 text-white transition hover:opacity-90"
                    >
                        Go to My Learning
                    </button>

                </div>

            </div>
        );
    }


    return (
        <div className="flex min-h-screen items-center justify-center px-6">

            <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <span className="text-4xl text-red-500">
                        ×
                    </span>
                </div>

                <h1 className="mt-6 text-3xl font-semibold text-red-500">
                    Payment Verification Failed
                </h1>

                <p className="mt-3 text-gray-500">
                    {error}
                </p>

                <button
                    onClick={() => navigate("/Courses")}
                    className="mt-6 rounded-lg bg-vercity px-6 py-3 text-white"
                >
                    Back to Courses
                </button>

            </div>

        </div>
    );
};