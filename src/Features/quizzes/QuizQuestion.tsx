type QuizQuestionProps = {
    question: string;
    options: string[];
    selectedAnswer: number | null;
    onSelect: (index: number) => void;
};

const QuizQuestion = ({
    question,
    options,
    selectedAnswer,
    onSelect,
}: QuizQuestionProps) => {

    return (
        <div>

            <h2 className="text-2xl font-semibold leading-relaxed text-gray-900">
                {question}
            </h2>


            <div className="mt-8 space-y-4">

                {options.map((option, index) => {

                    const selected =
                        selectedAnswer === index;

                    return (
                        <button
                            key={index}
                            onClick={() => onSelect(index)}
                            className={`
                                flex w-full items-center gap-4
                                rounded-xl border p-4
                                text-left transition
                                ${
                                    selected
                                        ? "border-vercity bg-[#f0efff]"
                                        : "border-gray-200 bg-white hover:border-vercity/40"
                                }
                            `}
                        >

                            <span
                                className={`
                                    flex h-8 w-8 shrink-0
                                    items-center justify-center
                                    rounded-full border
                                    text-sm font-medium
                                    ${
                                        selected
                                            ? "border-vercity bg-vercity text-white"
                                            : "border-gray-300 text-gray-600"
                                    }
                                `}
                            >
                                {String.fromCharCode(65 + index)}
                            </span>


                            <span className="text-base text-gray-700">
                                {option}
                            </span>

                        </button>
                    );

                })}

            </div>

        </div>
    );
};

export default QuizQuestion;