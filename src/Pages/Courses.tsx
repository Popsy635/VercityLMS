import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../Components/html/Nav";
import axios from "../api/axios";


type Course = {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    category?: string;
    level?: string;
    price?: number;
    instructorId?: {
        name?: string;
    };
};

export const Courses = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category?.toLowerCase().includes(search.toLowerCase())
    );


    useEffect(() => {
        const getCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get("/courses/allcourses");

                console.log("Catalogue courses:", response.data);

                setCourses(response.data.data || []);

            } catch (err) {
                console.error(err);
                setError("Unable to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        getCourses();
    }, []);

    return (
        <div className="min-h-screen bg-white">

            {/* Header */}
            <header className="border-b border-gray-100">
                <Nav />
            </header>


            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-12">

                <div className="max-w-2xl">

                    <p className="text-sm font-medium uppercase tracking-wide text-vercity">
                        Explore
                    </p>

                    <h1 className="mt-2 text-4xl font-semibold text-gray-900 lg:text-5xl">
                        Explore Courses
                    </h1>

                    <p className="mt-4 text-lg text-gray-500">
                        Discover courses designed to help you build practical skills,
                        grow your knowledge, and move closer to your goals.
                    </p>

                </div>


                {/* Search */}
                <div className="mt-8 max-w-xl">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-vercity focus:ring-2 focus:ring-vercity/20"
                    />
                </div>

            </section>


            {/* Courses */}
            <section className="mx-auto max-w-7xl px-6 pb-16">

                {loading && (
                    <div className="py-16 text-center">
                        <p className="text-gray-500">
                            Loading courses...
                        </p>
                    </div>
                )}


                {!loading && error && (
                    <div className="rounded-xl bg-red-50 p-6 text-center">
                        <p className="text-red-600">
                            {error}
                        </p>
                    </div>
                )}


                {!loading && !error && courses.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 p-12 text-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            No courses available yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Check back soon for new learning opportunities.
                        </p>
                    </div>
                )}


                {!loading && !error && courses.length > 0 && (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Available Courses
                            </h2>

                            <p className="text-sm text-gray-500">
                                {courses.length} courses
                            </p>
                        </div>


                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredCourses.map((course) => (
                                <article
                                    key={course._id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                >

                                    {/* Thumbnail */}
                                    <div className="h-52 w-full overflow-hidden bg-gray-100">

                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-gray-100">
                                                <span className="text-sm text-gray-400">
                                                    No image available
                                                </span>
                                            </div>
                                        )}

                                    </div>


                                    {/* Content */}
                                    <div className="p-6">

                                        <div className="flex items-center justify-between gap-3">

                                            {course.category && (
                                                <span className="rounded-full bg-vercity/10 px-3 py-1 text-xs font-medium text-vercity">
                                                    {course.category}
                                                </span>
                                            )}

                                            {course.level && (
                                                <span className="text-xs text-gray-400">
                                                    {course.level}
                                                </span>
                                            )}

                                        </div>


                                        <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                            {course.title}
                                        </h3>


                                        {course.description && (
                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                                                {course.description}
                                            </p>
                                        )}


                                        <div className="mt-6 flex items-center justify-between">

                                            {course.price !== undefined && (
                                                <span className="font-semibold text-gray-900">
                                                    {course.price === 0
                                                        ? "Free"
                                                        : `₦${course.price.toLocaleString()}`}
                                                </span>
                                            )}


                                            <button
                                                onClick={() =>
                                                    navigate(`/Course/${course._id}`, {
                                                        state: {
                                                            course,
                                                        },
                                                    })
                                                }
                                                className="rounded-lg bg-vercity px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                                            >
                                                View Course
                                            </button>

                                        </div>

                                    </div>

                                </article>
                            ))}

                        </div>
                    </>
                )}

            </section>

        </div>
    );
};