import { useEffect, useState } from "react";

import { EmptyDashboard } from "./components/EmptyDashboard";
import { ActualDashboard } from "./components/ActualDashboard";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import type { EnrolledCourse } from "./types/dashboard";


export const Dashboard = () => {

    const axiosPrivate = useAxiosPrivate();

    const [courses, setCourses] = useState<EnrolledCourse[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const getMyCourses = async () => {

            try {

                setLoading(true);
                setError("");

                console.log("FETCHING MY COURSES...");

                const response = await axiosPrivate.get(
                    "/student/mycourses"
                );

                console.log(
                    "MY COURSES RESPONSE:",
                    response.data
                );


                const enrolledCourses =
                    response.data?.data || [];


                console.log(
                    "ENROLLED COURSES:",
                    enrolledCourses
                );


                setCourses(enrolledCourses);

            } catch (err) {

                console.error(
                    "MY COURSES ERROR:",
                    err
                );

                setError(
                    "Unable to load your courses."
                );

            } finally {

                setLoading(false);

            }

        };


        getMyCourses();

    }, [axiosPrivate]);


    console.log("DASHBOARD STATE:", {
        loading,
        error,
        courses
    });


    return (

        <>

            {/* LOADING */}

            {loading && (

                <div className="flex min-h-125 items-center justify-center">

                    <p className="text-lg text-gray-500">
                        Loading your dashboard...
                    </p>

                </div>

            )}


            {/* ERROR */}

            {!loading && error && (

                <div className="flex min-h-125 items-center justify-center">

                    <div className="text-center">

                        <p className="text-lg text-red-500">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* EMPTY */}

            {!loading &&
                !error &&
                courses.length === 0 && (

                    <EmptyDashboard />

                )}


            {/* ACTUAL DASHBOARD */}

            {!loading &&
                !error &&
                courses.length > 0 && (

                    <ActualDashboard
                        courses={courses}
                    />

                )}

        </>

    );

};