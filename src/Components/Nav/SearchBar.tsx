import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";


type Course = {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string | null;
    category?: string;
    level?: string;
    price?: number;
};


export const SearchBar = () => {

    const navigate = useNavigate();

    const searchRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState("");

    const [courses, setCourses] = useState<Course[]>([]);

    const [loading, setLoading] = useState(false);

    const [showSuggestions, setShowSuggestions] = useState(false);


    /*
     * ===============================
     * FETCH ALL COURSES
     * ===============================
     */

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                setLoading(true);

                const response = await axios.get(
                    "/courses/allcourses"
                );

                console.log(
                    "ALL COURSES:",
                    response.data
                );


                /*
                 * Your API response is expected
                 * to contain the courses inside data.
                 */

                const courseData =
                    Array.isArray(response.data)
                        ? response.data
                        : response.data?.data;


                if (Array.isArray(courseData)) {

                    setCourses(courseData);

                } else {

                    setCourses([]);

                }


            } catch (error) {

                console.error(
                    "ERROR FETCHING COURSES:",
                    error
                );

                setCourses([]);

            } finally {

                setLoading(false);

            }

        };


        fetchCourses();

    }, []);


    /*
     * ===============================
     * FILTER COURSES
     * ===============================
     */

    const filteredCourses = courses.filter((course) => {

        const searchTerm =
            search.toLowerCase().trim();

        if (!searchTerm) {
            return false;
        }


        const title =
            course.title?.toLowerCase() || "";

        const category =
            course.category?.toLowerCase() || "";

        const description =
            course.description?.toLowerCase() || "";


        return (
            title.includes(searchTerm) ||
            category.includes(searchTerm) ||
            description.includes(searchTerm)
        );

    });


    /*
     * ===============================
     * NAVIGATE TO COURSE
     * ===============================
     */

    const handleCourseClick = (
        courseId: string
    ) => {

        setSearch("");

        setShowSuggestions(false);

        navigate(`/course/${courseId}`);

    };


    /*
     * ===============================
     * ENTER KEY
     * ===============================
     */

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (event.key === "Enter") {

            event.preventDefault();


            if (filteredCourses.length > 0) {

                handleCourseClick(
                    filteredCourses[0]._id
                );

            }

        }


        if (event.key === "Escape") {

            setSearch("");

            setShowSuggestions(false);

        }

    };


    /*
     * ===============================
     * CLOSE WHEN CLICKING OUTSIDE
     * ===============================
     */

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                searchRef.current &&
                !searchRef.current.contains(
                    event.target as Node
                )
            ) {

                setShowSuggestions(false);

            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    return (

        <div
            ref={searchRef}
            className="relative hidden md:flex items-center flex-1 max-w-lg"
        >

            {/* ================= SEARCH INPUT ================= */}

            <div className="relative flex items-center border border-black/20 rounded-xl flex-1 pl-2 bg-white">

                <input
                    type="text"
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value);

                        setShowSuggestions(
                            e.target.value.trim().length > 0
                        );

                    }}
                    onFocus={() => {

                        if (search.trim()) {
                            setShowSuggestions(true);
                        }

                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="What skill are you aiming for?"
                    className="h-10 w-full mx-2 outline-none placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                />


                {/* SEARCH ICON */}

                <button
                    type="button"
                    className="mr-5 cursor-pointer"
                    onClick={() => {

                        if (filteredCourses.length > 0) {

                            handleCourseClick(
                                filteredCourses[0]._id
                            );

                        }

                    }}
                >

                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <path
                            d="M10.25 20.5C4.6 20.5 0 15.9 0 10.25C0 4.6 4.6 0 10.25 0C15.9 0 20.5 4.6 20.5 10.25C20.5 15.9 15.9 20.5 10.25 20.5ZM10.25 1.5C5.42 1.5 1.5 5.43 1.5 10.25C1.5 15.07 5.42 19 10.25 19C15.08 19 19 15.07 19 10.25C19 5.43 15.08 1.5 10.25 1.5Z"
                            fill="#1D1073"
                        />

                        <path
                            d="M20.7495 21.4999C20.5595 21.4999 20.3695 21.4299 20.2195 21.2799L18.2195 19.2799C17.9295 18.9899 17.9295 18.5099 18.2195 18.2199C18.5095 17.9299 18.9895 17.9299 19.2795 18.2199L21.2795 20.2199C21.5695 20.5099 21.5695 20.9899 21.2795 21.2799C21.1295 21.4299 20.9395 21.4999 20.7495 21.4999Z"
                            fill="#1D1073"
                        />

                    </svg>

                </button>

            </div>



            {/* ================= SUGGESTIONS ================= */}

            {showSuggestions && (

                <div className="absolute top-12 left-0 right-0 z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

                    {loading ? (

                        <div className="px-4 py-4 text-sm text-gray-500">

                            Searching courses...

                        </div>

                    ) : filteredCourses.length > 0 ? (

                        <div className="max-h-80 overflow-y-auto">

                            {filteredCourses
                                .slice(0, 6)
                                .map((course) => (

                                    <button
                                        key={course._id}
                                        type="button"
                                        onClick={() =>
                                            handleCourseClick(
                                                course._id
                                            )
                                        }
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
                                    >

                                        {/* COURSE IMAGE */}

                                        <img
                                            src={
                                                course.thumbnail ||
                                                "/placeholder-course.jpg"
                                            }
                                            alt=""
                                            className="h-12 w-16 rounded-lg object-cover"
                                        />


                                        {/* COURSE INFO */}

                                        <div className="min-w-0">

                                            <p className="truncate font-medium text-gray-900">

                                                {course.title}

                                            </p>


                                            <p className="mt-1 text-xs text-gray-500">

                                                {course.category ||
                                                    "Course"}

                                            </p>

                                        </div>

                                    </button>

                                ))}

                        </div>

                    ) : (

                        <div className="px-4 py-4 text-sm text-gray-500">

                            No courses found for "{search}"

                        </div>

                    )}

                </div>

            )}

        </div>

    );

};