import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";

import type { Quiz } from "./types";


const QuizPage = () => {

useEffect(() => {
    if (!sessionStorage.getItem("quizStartTime")) {
        sessionStorage.setItem(
            "quizStartTime",
            Date.now().toString()
        );
    }
}, []);


    const { courseId, quizId } = useParams();

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();


    const [quiz, setQuiz] = useState<Quiz | null>(null);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState<(number | null)[]>([]);

    const [loading, setLoading] =
        useState(true);

    // const [startTime] = useState(Date.now());

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/student/courses/${courseId}/quizzes`
                );

                const quizzes = response.data?.data ?? [];

                const selectedQuiz = quizzes.find((item: Quiz) => item._id === quizId);
            
                setQuiz(selectedQuiz ?? null);

                setAnswers(
                    new Array(selectedQuiz.questions.length).fill(null)
                );
            } catch (error) {
                console.error("QUIZ FETCH ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [courseId, axiosPrivate]);


    if (loading) {

        return (
            <div className="flex min-h-100 items-center justify-center">
                <p className="text-gray-500">
                    Loading quiz...
                </p>
            </div>
        );

    }


    if (!quiz) {
        return null;
    }


    const question =
        quiz.questions[currentQuestion];


    const selectedAnswer =
        answers[currentQuestion];


    const selectAnswer = (index: number) => {

        setAnswers(prev => {

            const updated = [...prev];

            updated[currentQuestion] = index;

            return updated;

        });

    };


    const nextQuestion = () => {

        if (
            currentQuestion <
            quiz.questions.length - 1
        ) {

            setCurrentQuestion(
                prev => prev + 1
            );

        } else {

            finishQuiz();

        }

    };


    const previousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(
                prev => prev - 1
            );

        }

    };

   const finishQuiz = async () => {
    try {
        const startTime = sessionStorage.getItem("quizStartTime");

        const timeTaken = startTime
            ? Math.floor(
                (Date.now() - Number(startTime)) / 1000
            )
            : 0;

        const formattedAnswers = answers.map(
            (answer, index) => ({
                questionIndex: index,
                selectedAnswer: answer,
            })
        );

        const response = await axiosPrivate.post(
            `/student/quizzes/${quizId}/submit`,
            {
                timeTaken,
                answers: formattedAnswers,
            }
        );

        console.log("QUIZ SUBMISSION:", response.data);

        const result = response.data?.data;

        navigate(
            `/Dashboard/quizzes/${courseId}/${quizId}/result`,
            {
                state: {
                    quiz,
                    result,
                },
            }
        );

    } catch (error) {

        console.error(
            "QUIZ SUBMISSION ERROR:",
            error
        );

    }
};




    return (

        <div className="mx-auto max-w-4xl">

            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm text-gray-500">
                            Quiz
                        </p>

                        <h1 className="mt-1 text-xl font-semibold">
                            {quiz.title}
                        </h1>

                    </div>

                </div>


                <div className="mt-8">

                    <QuizProgress
                        currentQuestion={currentQuestion}
                        totalQuestions={
                            quiz.questions.length
                        }
                    />

                </div>


                <div className="mt-10">

                    <QuizQuestion
                        question={question.question}
                        options={question.options}
                        selectedAnswer={selectedAnswer}
                        onSelect={selectAnswer}
                    />

                </div>


                <div className="mt-10 flex justify-between">

                    <button
                        onClick={previousQuestion}
                        disabled={currentQuestion === 0}
                        className="rounded-xl border border-gray-200 px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>


                    <button
                        onClick={nextQuestion}
                        disabled={selectedAnswer === null}
                        className="rounded-xl bg-vercity px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {currentQuestion ===
                            quiz.questions.length - 1
                            ? "Finish Quiz"
                            : "Next Question"}
                    </button>

                </div>

            </div>

        </div>

    );
};

export default QuizPage;