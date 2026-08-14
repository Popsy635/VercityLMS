import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl text-green-600">
                        ✓
                    </span>
                </div>

                <h1 className="mt-6 text-3xl font-semibold">
                    Payment Successful
                </h1>

                <p className="mt-3 text-gray-500">
                    You are now enrolled in this course.
                </p>

                <button
                    onClick={() => navigate("/Dashboard")}
                    className="mt-8 rounded-lg bg-vercity px-6 py-3 text-white"
                >
                    Go to My Learning
                </button>

            </div>

        </div>
    );
};