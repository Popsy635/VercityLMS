export type QuizQuestion = {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
};

export type Quiz = {
    _id: string;
    title: string;
    courseId: string;
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit: number;
};

export type QuizResult = {
    score: number;
    passed: boolean;
    correctAnswers: number;
    totalQuestions: number;
    passingScore: number;
    timeTaken: number;
};