type QuizProgressProps = {
    currentQuestion: number;
    totalQuestions: number;
};

const QuizProgress = ({
    currentQuestion,
    totalQuestions,
}: QuizProgressProps) => {

    const progress =
        ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="space-y-3">

            <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                    Question {currentQuestion + 1} of {totalQuestions}
                </span>

                <span className="text-gray-500">
                    {Math.round(progress)}%
                </span>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-vercity transition-all"
                    style={{
                        width: `${progress}%`
                    }}
                />
            </div>

        </div>
    );
};

export default QuizProgress;