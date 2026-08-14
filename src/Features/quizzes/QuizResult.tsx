import { useLocation, useNavigate } from "react-router-dom";

import type {
    Quiz,
    QuizResult as QuizResultType,
} from "./types";

const QuizResult = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {
        quiz,
        result,
    }: {
        quiz?: Quiz;
        result?: QuizResultType;
    } = location.state || {};

    if (!result) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f7fb] p-10">
                <div className="text-center">
                    <p className="text-gray-500">
                        Quiz result not found.
                    </p>

                    <button
                        onClick={() => navigate("/Dashboard")}
                        className="mt-4 rounded-lg bg-vercity px-5 py-2.5 text-sm text-white"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const incorrectAnswers =
        result.totalQuestions - result.correctAnswers;

    return (
        <div className="min-h-screen bg-[#f7f7fb] px-4 py-10">

            <div className="mx-auto max-w-xl">

                <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">

                    {/* ICON */}

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f0efff] text-4xl">
                        {result.passed ? "🎉" : "💪"}
                    </div>


                    {/* TITLE */}

                    <h1 className="mt-6 text-3xl font-semibold">
                        {result.passed
                            ? "Quiz Complete!"
                            : "Keep Going!"}
                    </h1>


                    {/* MESSAGE */}

                    <p className="mt-2 text-gray-500">
                        {result.passed
                            ? "Great job! You've passed this quiz."
                            : "Don't worry. Review the lesson and try again."}
                    </p>


                    {/* SCORE */}

                    <div className="mx-auto mt-8 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-[#ddd9ff]">

                        <span className="text-4xl font-bold text-vercity">
                            {result.score}%
                        </span>

                        <span className="mt-1 text-xs text-gray-400">
                            Score
                        </span>

                    </div>


                    {/* PASSING SCORE */}

                    <p className="mt-4 text-sm text-gray-400">
                        Passing score: {result.passingScore}%
                    </p>


                    {/* STATS */}

                    <div className="mt-10 grid grid-cols-3 gap-3">

                        <div className="rounded-xl bg-[#f7f7fb] p-4">

                            <p className="text-2xl font-semibold">
                                {result.correctAnswers}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Correct
                            </p>

                        </div>


                        <div className="rounded-xl bg-[#f7f7fb] p-4">

                            <p className="text-2xl font-semibold">
                                {incorrectAnswers}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Incorrect
                            </p>

                        </div>


                        <div className="rounded-xl bg-[#f7f7fb] p-4">

                            <p className="text-2xl font-semibold text-vercity">
                                {result.timeTaken}s
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Time Taken
                            </p>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="mt-8 space-y-3">

                        <button
                            onClick={() => {
                                if (quiz) {
                                    navigate(
                                        `/Dashboard/quizzes/${quiz.courseId}`
                                    );
                                } else {
                                    navigate("/Dashboard");
                                }
                            }}
                            className="w-full rounded-lg bg-vercity px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                        >
                            Back to Quizzes
                        </button>


                        <button
                            onClick={() => navigate("/Dashboard")}
                            className="w-full rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Return to Dashboard
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default QuizResult;