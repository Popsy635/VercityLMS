import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import type { Quiz } from "./types";


const QuizHome = () => {

    const {courseId} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchQuizzes = async () => {

            try {

                if (!courseId) {
                    return null;
                }

                setLoading(true);

                const response = await axiosPrivate.get(
                    `/student/courses/${courseId}/quizzes`
                );

                console.log("QUIZZES:", response.data);

                setQuizzes(response.data?.data ?? []);

            } catch (error) {

                console.error("QUIZZES ERROR:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchQuizzes();

    }, [courseId, axiosPrivate]);


    if (loading) {
        return (
            <div className="flex min-h-75 items-center justify-center">
                <p className="text-gray-500">
                    Loading quizzes...
                </p>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center mt-20">

            <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                    Quizzes
                </h1>

                <p className="mt-2 text-gray-500">
                    Test your understanding and track your progress.
                </p>
            </div>


            {quizzes.length === 0 ? (

                <div className="rounded-2xl bg-gray-50 p-10 text-center">
                    <p className="text-gray-500">
                        No quizzes available for this course yet.
                    </p>
                </div>

            ) : (

                <div className="">

                    {quizzes.map((quiz) => (

                        <div
                            key={quiz._id}
                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        >

                            <h2 className="text-xl font-semibold">
                                {quiz.title}
                            </h2>

                            <div className="mt-5 grid grid-cols-3 gap-3">

                                <div className="rounded-xl bg-[#f0efff] p-3">
                                    <p className="text-xs text-gray-500">
                                        Questions
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-vercity">
                                        {quiz.questions.length}
                                    </p>
                                </div>


                                <div className="rounded-xl bg-[#f0efff] p-3">
                                    <p className="text-xs text-gray-500">
                                        Time
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-vercity">
                                        {quiz.timeLimit} min
                                    </p>
                                </div>


                                <div className="rounded-xl bg-[#f0efff] p-3">
                                    <p className="text-xs text-gray-500">
                                        Pass
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-vercity">
                                        {quiz.passingScore}%
                                    </p>
                                </div>

                            </div>


                            <button
                                onClick={() =>
                                    navigate(
                                        `/Dashboard/quizzes/${courseId}/${quiz._id}`
                                    )
                                }
                                className="mt-6 w-full rounded-xl bg-vercity px-5 py-3 font-medium text-white transition hover:opacity-90"
                            >
                                Start Quiz
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default QuizHome;