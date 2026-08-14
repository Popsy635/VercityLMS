import { useNavigate } from "react-router-dom";

export const Cart = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* HEADER */}

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">
                            My Cart
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Courses you've added to your cart.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-vercity hover:underline"
                    >
                        Continue Learning
                    </button>

                </div>


                {/* EMPTY CART */}

                <div className="mt-10 flex min-h-100 items-center justify-center rounded-2xl bg-white border border-gray-200">

                    <div className="text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-vercity/10">

                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M18.19 17.75H7.54C6.55 17.75 5.6 17.33 4.93 16.6C4.26 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.75 3.33 4.54 3.1C4.33 2.87 4.04 2.75 3.73 2.75H2"
                                    stroke="#1D1073"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />

                                <path
                                    d="M6.28 4.62H18.72C19.73 4.62 20.66 5.02 21.34 5.74C22.01 6.47 22.35 7.42 22.27 8.43L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75H7.54"
                                    stroke="#1D1073"
                                    strokeWidth="1.5"
                                />

                                <circle
                                    cx="8.25"
                                    cy="20.75"
                                    r="1.5"
                                    stroke="#1D1073"
                                    strokeWidth="1.5"
                                />

                                <circle
                                    cx="16.25"
                                    cy="20.75"
                                    r="1.5"
                                    stroke="#1D1073"
                                    strokeWidth="1.5"
                                />

                            </svg>

                        </div>


                        <h2 className="mt-5 text-xl font-semibold">
                            Your cart is empty
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Explore our courses and add one to your cart.
                        </p>


                        <button
                            onClick={() => navigate("/Courses")}
                            className="mt-6 rounded-lg bg-vercity px-6 py-3 text-white hover:opacity-90"
                        >
                            Explore Courses
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};