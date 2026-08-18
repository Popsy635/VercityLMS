import { useNavigate } from "react-router-dom";

export const InstructorDashboard = () => {

    const navigate = useNavigate();

    return (

        <div className="w-full bg-white px-4 py-8 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* HEADER */}

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>

                        <h1 className="text-3xl font-semibold text-gray-900">
                            Instructor Dashboard
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Manage your courses and track your students.
                        </p>

                    </div>


                    <button
                        onClick={() => navigate("/Teach")}
                        className="rounded-lg bg-vercity px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                    >
                        Create Course
                    </button>

                </div>


                {/* STATS */}

                <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl bg-vercity p-6 text-white">

                        <p className="text-sm opacity-80">
                            Total Courses
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold">
                            0
                        </h2>

                    </div>


                    <div className="rounded-2xl bg-[#f0efff] p-6">

                        <p className="text-sm text-gray-500">
                            Total Students
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold text-vercity">
                            0
                        </h2>

                    </div>


                    <div className="rounded-2xl bg-[#f0efff] p-6">

                        <p className="text-sm text-gray-500">
                            Published Courses
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold text-vercity">
                            0
                        </h2>

                    </div>


                    <div className="rounded-2xl bg-[#f0efff] p-6">

                        <p className="text-sm text-gray-500">
                            Total Earnings
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold text-vercity">
                            ₦0
                        </h2>

                    </div>

                </section>


                {/* COURSE MANAGEMENT */}

                <section className="mt-8 rounded-2xl bg-[#f0efff] p-6 md:p-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold">
                                Your Courses
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your courses and lessons.
                            </p>

                        </div>

                    </div>


                    <div className="mt-6 rounded-xl bg-white p-8 text-center">

                        <p className="text-gray-500">
                            You haven't created any courses yet.
                        </p>

                        <button
                            onClick={() => navigate("/Teach")}
                            className="mt-4 rounded-lg bg-vercity px-5 py-2.5 text-sm text-white"
                        >
                            Create Your First Course
                        </button>

                    </div>

                </section>

            </div>

        </div>
    );
};