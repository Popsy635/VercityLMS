import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import type { Course } from "../Pages/Dash/types/course";

type CourseResponse = {
    success: boolean;
    data: Course[];
};

export const useCourses = () => {

    const axiosPrivate = useAxiosPrivate();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await axiosPrivate.get<CourseResponse>(
                        "/student/courses"
                    );

                console.log(
                    "COURSE CATALOGUE:",
                    response.data
                );

                setCourses(
                    response.data?.data || []
                );

            } catch (err: any) {

                console.error(
                    "COURSE FETCH ERROR:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "Unable to load courses."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchCourses();

    }, [axiosPrivate]);

    return {
        courses,
        loading,
        error,
    };
};