import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../../api/axios';


export const Dropdown = () => {

    return (
        <div className="flex justify-center gap-2">

            <FlyoutLink
                FlyoutContent={ExploreContent}
            >
                Explore
            </FlyoutLink>

        </div>
    );
}


type FlyoutLinkProps = {
    children: React.ReactNode;
    FlyoutContent: React.ComponentType;
}


const FlyoutLink = ({
    children,
    FlyoutContent
}: FlyoutLinkProps) => {

    const [open, setOpen] = useState(false);

    const showFlyout =
        open && FlyoutContent;


    return (

        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="group relative h-fit w-fit"
        >

            <button
                type="button"
                className="flex gap-2 text-black"
            >

                {children}

                {open ? (

                    <span>

                        {/* UP ARROW */}

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path
                                d="M19.9195 15.8C19.7295 15.8 19.5395 15.73 19.3895 15.58L12.8695 9.05996C12.3895 8.57996 11.6095 8.57996 11.1295 9.05996L4.60953 15.58C4.31953 15.87 3.83953 15.87 3.54953 15.58C3.25953 15.29 3.25953 14.81 3.54953 14.52L10.0695 7.99996C11.1295 6.93996 12.8595 6.93996 13.9295 7.99996L20.4495 14.52C20.7395 14.81 20.7395 15.29 20.4495 15.58C20.2995 15.72 20.1095 15.8 19.9195 15.8Z"
                                fill="#292D32"
                            />

                        </svg>

                    </span>

                ) : (

                    <span>

                        {/* DOWN ARROW */}

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path
                                d="M11.9995 16.8C11.2995 16.8 10.5995 16.53 10.0695 16L3.54953 9.48001C3.25953 9.19001 3.25953 8.71001 3.54953 8.42001C3.83953 8.13001 4.31953 8.13001 4.60953 8.42001L11.1295 14.94C11.6095 15.42 12.3895 15.42 12.8695 14.94L19.3895 8.42001C19.6795 8.13001 20.1595 8.13001 20.4495 8.42001C20.7395 8.71001 20.7395 9.19001 20.4495 9.48001L13.9295 16C13.3995 16.53 12.6995 16.8 11.9995 16.8Z"
                                fill="#292D32"
                            />

                        </svg>

                    </span>

                )}

                <span
                    style={{
                        transform: showFlyout
                            ? "scaleX(1)"
                            : "scaleX(0)"
                    }}
                    className="absolute -bottom-2 -left-2 -right-2 h-0.5 origin-left rounded-full bg-vercity transition-transform duration-200 ease-out"
                />

            </button>


            {showFlyout && (

                <div className="absolute left-1/2 top-12 -translate-x-1/2">

                    <div className="absolute -translate-y-6 left-0 right-0 h-6 bg-transparent" />

                    <FlyoutContent />

                </div>

            )}

        </div>

    );
}



type Course = {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string | null;
    category?: string;
    level?: string;
    price?: number;
};



const ExploreContent = () => {

    const navigate = useNavigate();

    const [courses, setCourses] =
        useState<Course[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
     * =================================
     * FETCH COURSES
     * =================================
     */

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                setLoading(true);

                const response = await axios.get(
                    "/courses/allcourses"
                );

                console.log(
                    "EXPLORE COURSES:",
                    response.data
                );


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
                    "EXPLORE COURSES ERROR:",
                    error
                );

                setError(
                    "Unable to load courses."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchCourses();

    }, []);


    /*
     * =================================
     * NAVIGATE TO COURSE
     * =================================
     */

    const handleCourseClick = (
        courseId: string
    ) => {

        navigate(`/course/${courseId}`);

    };


    return (

        <div className="w-125 rounded-lg bg-vercity p-6 shadow-xl">

            {loading && (

                <p className="text-sm text-white">
                    Loading courses...
                </p>

            )}


            {error && (

                <p className="text-sm text-white">
                    {error}
                </p>

            )}


            {!loading &&
                !error &&
                courses.length === 0 && (

                    <p className="text-sm text-white">
                        No courses available.
                    </p>

                )}


            {!loading &&
                !error &&
                courses.length > 0 && (

                    <ul className="flex flex-col gap-4">

                        {courses.map((course) => (

                            <li
                                key={course._id}
                                className="cursor-pointer text-white"
                                onClick={() =>
                                    handleCourseClick(
                                        course._id
                                    )
                                }
                            >

                                <p className="font-medium hover:underline">

                                    {course.title}

                                </p>


                                {course.category && (

                                    <p className="mt-1 text-xs text-white/70">

                                        {course.category}

                                    </p>

                                )}

                            </li>

                        ))}

                    </ul>

                )}

        </div>

    );
}