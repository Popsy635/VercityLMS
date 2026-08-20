import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../Context/AuthProvider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


import type { EnrolledCourse } from "../types/dashboard";

import robo from "../../../assets/merry.png";
import fire from "../../../assets/streak.png";


type ActualDashboardProps = {
    courses: EnrolledCourse[];
};


type AvailableCourse = {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    category?: string;
    level?: string;
    price?: number;
};


const robAi = robo;
const streak = fire;


export const ActualDashboard = ({
    courses,
}: ActualDashboardProps) => {

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();
    // const location = useLocation();

    const axiosPrivate = useAxiosPrivate();


    /*
     * =========================
     * AVAILABLE COURSES
     * =========================
     */

    const [availableCourses, setAvailableCourses] =
        useState<AvailableCourse[]>([]);

    const [xp, setXp] = useState(0);
    const [streakDays, setStreakDays] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [activeDates, setActiveDates] = useState<string[]>([]);
    // const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    const [coursesLoading, setCoursesLoading] =
        useState(true);

    const getStudentStats = async () => {
    try {
        setStatsLoading(true);

        const [xpResponse, streakResponse] = await Promise.all([
            axiosPrivate.get("/student/xp"),
            axiosPrivate.get("/student/streak"),
        ]);

        console.log("XP RESPONSE:", xpResponse.data);
        console.log("STREAK RESPONSE:", streakResponse.data);

setXp(xpResponse.data?.data?.totalXP ?? 0);

        const streakData = streakResponse.data?.data;

        setStreakDays(streakData?.currentStreak ?? 0);
        setLongestStreak(streakData?.longestStreak ?? 0);
        setActiveDates(streakData?.days ?? []);
        // setLastActiveDate(streakData?.lastActiveDate ?? null);

    } catch (error) {
        console.error("STUDENT STATS ERROR:", error);
    } finally {
        setStatsLoading(false);
    }
};

useEffect(() => {
    getStudentStats();
}, [axiosPrivate]);

    const weekDays = useMemo(() => {

        const today = new Date();

        const startOfWeek = new Date(today);

        // Sunday = first day of week
        startOfWeek.setDate(
            today.getDate() - today.getDay()
        );

        startOfWeek.setHours(0, 0, 0, 0);

        return Array.from({ length: 7 }, (_, index) => {

            const date = new Date(startOfWeek);

            date.setDate(
                startOfWeek.getDate() + index
            );

            return date;

        });

    }, []);

    const completedThisWeek = useMemo(() => {

        return weekDays.filter((date) => {

            const dateString =
                date.toISOString().split("T")[0];

            return activeDates.includes(dateString);

        }).length;

    }, [weekDays, activeDates]);


    const weeklyProgress =
        completedThisWeek / 7;


    /*
     * =========================
     * USER NAME
     * =========================
     */

    const userName = useMemo(() => {

        const rawName =
            auth?.user?.split("@")[0] || "User";

        return (
            rawName.charAt(0).toUpperCase() +
            rawName.slice(1)
        );

    }, [auth?.user]);


    /*
     * =========================
     * FETCH ALL AVAILABLE COURSES
     * =========================
     */

    useEffect(() => {

        const getAvailableCourses = async () => {

            try {

                setCoursesLoading(true);

                const response = await axiosPrivate.get("/courses/allcourses");

                console.log(
                    "ALL COURSES RESPONSE:",
                    JSON.stringify(response.data, null, 2)
                );

                const responseData = response.data;

                let data: AvailableCourse[] = [];

                if (Array.isArray(responseData)) {

                    data = responseData;

                } else if (Array.isArray(responseData?.data)) {

                    data = responseData.data;

                } else if (Array.isArray(responseData?.courses)) {

                    data = responseData.courses;

                }

                console.log("AVAILABLE COURSES:", data);

                setAvailableCourses(data);

                console.log(
                    "AVAILABLE COURSE IDS:",
                    data.map(course => ({
                        title: course.title,
                        id: course._id,
                        idAsString: String(course._id).trim(),
                    }))
                );

            } catch (error) {

                console.error(
                    "AVAILABLE COURSES ERROR:",
                    error
                );

                setAvailableCourses([]);

            } finally {

                setCoursesLoading(false);

            }

        };

        getAvailableCourses();

    }, [axiosPrivate]);


    /*
     * =========================
     * COURSE STATS
     * =========================
     */

    // const enrolledCount =
    //     courses.length;


    // const completedCourses =
    //     courses.filter(
    //         course => course.isCompleted
    //     ).length;


    // const averageProgress =
    //     courses.length > 0
    //         ? Math.round(
    //             courses.reduce(
    //                 (total, course) =>
    //                     total + course.progress,
    //                 0
    //             ) / courses.length
    //         )
    //         : 0;

    const XP_PER_LEVEL = 1000;

    const currentLevel = Math.floor(xp / XP_PER_LEVEL) + 1;

    const xpIntoCurrentLevel = xp % XP_PER_LEVEL;

    const xpPercentage = Math.min(
        (xpIntoCurrentLevel / XP_PER_LEVEL) * 100,
        100
    );

    // const xpNeededForNextLevel =
    //     XP_PER_LEVEL - xpIntoCurrentLevel;


    /*
     * =========================
     * ENROLLED COURSE IDS
     * =========================
     *
     * We use these IDs to make sure
     * Recommended Courses does NOT
     * contain an enrolled course.
     */

    const enrolledCourseIds = useMemo(() => {

        const ids = courses
            .map((enrollment) => {

                const courseId = enrollment?.courseId;

                if (!courseId?._id) {
                    return null;
                }

                return String(courseId._id).trim();

            })
            .filter((id): id is string => Boolean(id));

        console.log("ENROLLED COURSE IDS:", ids);

        return new Set(ids);

    }, [courses]);

    /*
     * =========================
     * RECOMMENDED COURSES
     * =========================
     *
     * Only courses that the student
     * has NOT enrolled in.
     */

    const recommendedCourses = useMemo(() => {

        console.log("AVAILABLE COURSES:", availableCourses);
        console.log(
            "ENROLLED IDS:",
            [...enrolledCourseIds]
        );

        const recommended = availableCourses.filter((course) => {

            if (!course?._id) {
                return false;
            }

            const availableId =
                String(course._id).trim();

            const enrolled =
                enrolledCourseIds.has(availableId);

            console.log(
                course.title,
                "=>",
                availableId,
                "=> enrolled:",
                enrolled
            );

            return !enrolled;
        });

        console.log(
            "FINAL RECOMMENDED COURSES:",
            recommended
        );

        return recommended.slice(0, 2);

    }, [availableCourses, enrolledCourseIds]);


    /*
     * =========================
     * CURRENT COURSE
     * =========================
     *
     * Course with the highest progress.
     */

    const currentCourse =
        [...courses].sort(
            (a, b) =>
                b.progress - a.progress
        )[0];


    return (

        <div className="w-full bg-white px-4 py-8 lg:px-8 xl:px-10">


            {/* =====================================================
                WELCOME
            ===================================================== */}

            <section>

                <h1 className="text-3xl font-medium text-gray-900 lg:text-4xl">

                    Welcome back, {userName}! 👋

                </h1>

                <p className="mt-3 text-base text-gray-600 lg:text-lg">

                    Keep learning, keep growing, your future is counting on you.

                </p>

            </section>



            {/* =====================================================
                TOP STATS
            ===================================================== */}

            <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">


                {/* LEVEL */}

                <div className="flex min-h-38.75 flex-col justify-between rounded-2xl bg-vercity p-5 text-white">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/30">

                            <svg
                                width="18"
                                height="34"
                                viewBox="0 0 15 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.5 30C1.075 30 0.71875 29.8563 0.43125 29.5688C0.14375 29.2813 0 28.925 0 28.5V4.5C0 4.075 0.14375 3.71875 0.43125 3.43125C0.71875 3.14375 1.075 3 1.5 3H4.5V0H10.5V3H13.5C13.925 3 14.2813 3.14375 14.5688 3.43125C14.8563 3.71875 15 4.075 15 4.5V28.5C15 28.925 14.8563 29.2813 14.5688 29.5688C14.2813 29.8563 13.925 30 13.5 30H1.5ZM3 15H12V6H3V15Z"
                                    fill="#C2EBFF"
                                />
                            </svg>

                        </div>

                        <p className="text-base opacity-90">
                            Your Level
                        </p>

                    </div>


                    <div>

                        <h2 className="text-3xl font-semibold">
                            {statsLoading ? "..." : `Level ${currentLevel}`}
                        </h2>

                        <p className="text-xs opacity-70">
                            awesome learner
                        </p>

                    </div>


                    <div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/20">

                            <div
                                className="h-full rounded-full bg-white"
                                style={{
                                    width: `${xpPercentage}%`
                                }}
                            />

                        </div>

                        <p className="mt-2 text-xs opacity-70">
                            {statsLoading
                                ? "Loading XP..."
                                : `${xpIntoCurrentLevel.toLocaleString()} / ${XP_PER_LEVEL.toLocaleString()} XP`
                            }
                        </p>

                    </div>

                </div>



                {/* XP */}

                <div className="flex min-h-38.75 flex-col justify-between rounded-2xl bg-vercity p-5 text-white">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/30">

                            <svg
                                width="25"
                                height="26"
                                viewBox="0 0 23 24"
                                fill="none"
                            >
                                <path
                                    d="M0 24V15H4.5V24H0ZM9 24V7.5H13.5V24H9ZM18 24V0H22.5V24H18Z"
                                    fill="#C2EBFF"
                                />
                            </svg>

                        </div>

                        <p className="text-base opacity-90">
                            XP Earned
                        </p>

                    </div>


                    <div>

                        <h2 className="text-3xl font-semibold">
                            {statsLoading ? "..." : xp.toLocaleString()}
                        </h2>

                        <p className="text-xs opacity-70">
                            This Week
                        </p>

                    </div>


                    <div className="flex justify-end">

                        <span className="rounded-full border border-white/30 px-3 py-1 text-xs">
                            {statsLoading ? "..." : `${Math.round(xpPercentage)}% to next level`}
                        </span>

                    </div>

                </div>



                {/* BADGES */}

                <div className="flex min-h-38.75 flex-col justify-between rounded-2xl bg-vercity p-5 text-white">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/30">

                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    d="M9 24L15 19.425L21 24L18.75 16.575L24.75 12.3H17.4L15 4.5L12.6 12.3H5.25L11.25 16.575L9 24ZM15 30C12.925 30 10.975 29.6063 9.15 28.8188C7.325 28.0313 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.96875 22.675 1.18125 20.85C0.39375 19.025 0 17.075 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.96875 9.15 1.18125C10.975 0.39375 12.925 0 15 0C17.075 0 19.025 0.39375 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0313 7.325 28.8188 9.15C29.6063 10.975 30 12.925 30 15C30 17.075 29.6063 19.025 28.8188 20.85C28.0313 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0313 20.85 28.8188C19.025 29.6063 17.075 30 15 30ZM15 27C18.35 27 21.1875 25.8375 23.5125 23.5125C25.8375 21.1875 27 18.35 27 15C27 11.65 25.8375 8.8125 23.5125 6.4875C21.1875 4.1625 18.35 3 15 3C11.65 3 8.8125 4.1625 6.4875 6.4875C4.1625 8.8125 3 11.65 3 15C3 18.35 4.1625 21.1875 6.4875 23.5125C8.8125 25.8375 11.65 27 15 27Z"
                                    fill="#C2EBFF"
                                />
                            </svg>

                        </div>

                        <p className="text-base opacity-90">
                            Badges
                        </p>

                    </div>


                    <div>

                        <h2 className="text-3xl font-semibold">
                            0
                        </h2>

                        <p className="text-xs opacity-70">
                            Badges earned
                        </p>

                    </div>


                    <div className="flex justify-end">

                        <button className="rounded-full border border-white/30 px-3 py-1 text-xs">
                            View all
                        </button>

                    </div>

                </div>



                {/* STREAK */}

                {/* STREAK */}

                <div className="min-h-38.75 rounded-2xl bg-[#f0efff] p-5">

                    {/* HEADER */}

                    <div className="flex items-center justify-between">

                        <h2 className="text-base font-semibold">
                            Your Streak
                        </h2>

                        <span className="text-xs text-gray-500">
                            This Week
                        </span>

                    </div>


                    {/* FIRE + STREAK */}

                    <div className="mt-3 flex items-center gap-5">

                        {/* CIRCULAR FIRE */}

                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">

                            <svg
                                className="absolute inset-0 h-full w-full -rotate-90"
                                viewBox="0 0 100 100"
                            >

                                {/* BACKGROUND RING */}

                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="#d9d7e8"
                                    strokeWidth="7"
                                />


                                {/* PROGRESS RING */}

                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="#22d3ee"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 42}
                                    strokeDashoffset={
                                        2 *
                                        Math.PI *
                                        42 *
                                        (1 - weeklyProgress)
                                    }
                                    className="transition-all duration-700 ease-out"
                                />

                            </svg>


                            {/* FIRE */}

                            <img
                                src={streak}
                                alt="streak fire"
                                className="relative z-5 h-11 w-11 object-contain"
                            />

                        </div>


                        {/* STREAK NUMBER */}

                        <div>

                            <p className="text-3xl font-semibold text-gray-900">

                                {statsLoading
                                    ? "..."
                                    : streakDays
                                }

                            </p>

                            <p className="text-xs text-gray-500">

                                {streakDays === 1
                                    ? "Day"
                                    : "Days"
                                }

                            </p>

                            <p className="mt-1 text-[11px] text-gray-400">

                                Best: {longestStreak} days

                            </p>

                        </div>

                    </div>


                    {/* WEEK DAYS */}

                    <div className="mt-4 grid grid-cols-7 gap-1">

                        {weekDays.map((date) => {

                            const dateString =
                                date.toISOString().split("T")[0];

                            const isCompleted =
                                activeDates.includes(dateString);

                            const isToday =
                                date.toDateString() ===
                                new Date().toDateString();

                            const dayLetter =
                                date.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "narrow"
                                    }
                                );

                            return (

                                <div
                                    key={dateString}
                                    className="flex flex-col items-center gap-1"
                                >

                                    {/* DAY LETTER */}

                                    <span
                                        className={`text-[11px] font-medium ${isToday
                                                ? "text-vercity"
                                                : "text-gray-400"
                                            }`}
                                    >
                                        {dayLetter}
                                    </span>


                                    {/* DAY CIRCLE */}

                                    {/* DAY CIRCLE */}

                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${isCompleted
                                                ? "bg-cyan-400 text-white"
                                                : isToday
                                                    ? "bg-cyan-100 text-cyan-500"
                                                    : "bg-gray-200 text-gray-400"
                                            }`}
                                    >
                                        {isCompleted && (
                                            <svg
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>

                                </div>

                            );

                        })}

                    </div>


                    {/* WEEKLY PROGRESS */}

                    <div className="mt-3">

                        <div className="flex items-center justify-between">

                            <span className="text-[10px] text-gray-400">
                                Weekly activity
                            </span>

                            <span className="text-[10px] font-medium text-vercity">
                                {completedThisWeek}/7 days
                            </span>

                        </div>


                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">

                            <div
                                className="h-full rounded-full bg-cyan-400 transition-all duration-700 ease-out"
                                style={{
                                    width: `${weeklyProgress * 100}%`
                                }}
                            />

                        </div>

                    </div>

                </div>

            </section>



            {/* =====================================================
                MAIN DASHBOARD
            ===================================================== */}

            <section className="mt-8 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_330px]">


                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <div className="min-w-0">


                    {/* CONTINUE LEARNING */}

                    <div className="rounded-2xl bg-[#f0efff] p-7">

                        <h2 className="mb-6 text-2xl font-semibold">
                            Continue Learning
                        </h2>


                        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.7fr)_minmax(200px,1fr)]">


                            {/* CURRENT COURSE */}

                            {currentCourse && (

                                <div className="rounded-2xl bg-white p-6">

                                    <div className="flex flex-col md:grid md:grid-cols-[220px_1fr] md:gap-5">

                                        <img
                                            src={currentCourse.courseId.thumbnail}
                                            alt={currentCourse.courseId.title}
                                            className="h-50 w-full rounded-xl object-cover"
                                        />


                                        <div className="flex min-w-0 flex-col">

                                            <p className="text-sm uppercase text-gray-400">
                                                {currentCourse.courseId.category}
                                            </p>

                                            <h3 className="mt-2 text-xl font-semibold">
                                                {currentCourse.courseId.title}
                                            </h3>


                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">

                                                Continue your learning journey and keep building your skills.

                                            </p>


                                            <div className="mt-auto">

                                                <div className="mt-5 flex justify-between text-sm">

                                                    <span className="text-gray-500">
                                                        lessons completed
                                                        ({currentCourse.completedLessonsId.length}
                                                        {" "})

                                                    </span>

                                                    <span className="font-medium text-vercity">
                                                        {currentCourse.progress}%
                                                    </span>

                                                </div>


                                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">

                                                    <div
                                                        className="h-full rounded-full bg-vercity"
                                                        style={{
                                                            width: `${currentCourse.progress}%`,
                                                        }}
                                                    />

                                                </div>


                                                <div className="flex flex-col gap-2 sm:flex-col md:flex-row">
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/Rooms/${currentCourse.courseId._id}`
                                                            )
                                                        }
                                                        className="mt-4 rounded-lg bg-vercity px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                                                    >
                                                        Continue Learning
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/Dashboard/quizzes/${currentCourse.courseId._id}`
                                                            )
                                                        }
                                                        className="mt-4 rounded-lg border border-vercity px-5 py-2.5 text-sm font-medium text-vercity"
                                                    >
                                                        Take Quiz
                                                    </button>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}



                            {/* UP NEXT */}

                            <div className="min-h-50 rounded-2xl bg-white p-6">

                                <h3 className="text-xl font-semibold">
                                    Up Next
                                </h3>


                                <div className="mt-6 flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f0efff]">

                                        <svg
                                            width="38"
                                            height="40"
                                            viewBox="0 0 42 44"
                                            fill="none"
                                        >
                                            <path
                                                d="M0 44V27.5H8.25V44H0ZM16.5 44V13.75H24.75V44H16.5ZM33 44V0H41.25V44H33Z"
                                                fill="#1D1073"
                                            />
                                        </svg>

                                    </div>


                                    <div>

                                        <p className="text-base font-medium">
                                            Branding
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Start your next lesson
                                        </p>

                                    </div>

                                </div>


                                <button className="mt-7 rounded-lg border border-gray-200 px-4 py-2 text-sm">
                                    Start Learning
                                </button>

                            </div>

                        </div>

                    </div>



                    {/* AI ASSISTANT */}

                    <div className="mt-7 min-h-45 overflow-hidden rounded-2xl bg-linear-to-r from-[#211477] via-[#4321aa] to-[#6728d9] p-8 text-white">

                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">


                            <div className="flex items-center gap-5">

                                <div className="hidden h-28 w-28 items-center justify-center rounded-full bg-white/10 sm:flex">

                                    <img
                                        src={robAi}
                                        alt="robotAI"
                                        className="h-24 w-24 object-contain"
                                    />

                                </div>


                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        Merry (AI Learning Assistant)
                                    </h2>

                                    <p className="mt-3 max-w-lg text-base leading-6 text-white/80">

                                        Hi, {userName}! I can help you plan your learning,
                                        recommend courses, or prepare you for interviews.

                                    </p>

                                </div>

                            </div>


                            <div className="flex flex-wrap gap-2">

                                <button
                                    onClick={() => navigate("/Dashboard/ai?mode=recommend")}
                                    className="rounded-full bg-white/10 px-4 py-2.5 text-sm hover:bg-white/20"
                                >
                                    Recommend Courses
                                </button>

                                <button
                                    onClick={() => navigate("/Dashboard/ai?mode=quiz")}
                                    className="rounded-full bg-white/10 px-4 py-2.5 text-sm hover:bg-white/20"
                                >
                                    Quiz Me
                                </button>

                                <button
                                    onClick={() => navigate("/Dashboard/ai?mode=career")}
                                    className="rounded-full bg-white/10 px-4 py-2.5 text-sm hover:bg-white/20"
                                >
                                    Career Guidance
                                </button>

                            </div>

                        </div>

                    </div>



                    {/* =================================================
                        RECOMMENDED COURSES
                    ================================================= */}

                    <div className="mt-7 rounded-2xl bg-[#e9e8ee] p-7">

                        <div className="mb-5 flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-semibold">
                                    Recommended Courses
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Courses you haven't enrolled in yet.
                                </p>

                            </div>


                            <button
                                onClick={() => navigate("/courses")}
                                className="text-sm text-vercity hover:underline"
                            >
                                View All →
                            </button>

                        </div>


                        {coursesLoading ? (

                            <p className="py-10 text-center text-sm text-gray-500">
                                Finding courses for you...
                            </p>

                        ) : recommendedCourses.length === 0 ? (

                            <div className="rounded-xl bg-white p-8 text-center">

                                <p className="text-base text-gray-500">
                                    You've enrolled in all available courses.
                                </p>

                                <button
                                    onClick={() => navigate("/courses")}
                                    className="mt-4 rounded-lg bg-vercity px-5 py-2.5 text-sm text-white"
                                >
                                    Explore Courses
                                </button>

                            </div>

                        ) : (

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                {recommendedCourses.map((course) => (

                                    <div
                                        key={course._id}
                                        className="overflow-hidden rounded-2xl bg-white shadow-sm"
                                    >

                                        {course.thumbnail && (

                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="h-48 w-full object-cover"
                                            />

                                        )}


                                        <div className="p-5">

                                            {course.category && (

                                                <p className="text-xs uppercase text-gray-400">
                                                    {course.category}
                                                </p>

                                            )}


                                            <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
                                                {course.title}
                                            </h3>


                                            {course.level && (

                                                <p className="mt-2 text-sm text-gray-500">
                                                    {course.level}
                                                </p>

                                            )}


                                            {course.price !== undefined && (

                                                <p className="mt-3 text-base font-semibold text-vercity">
                                                    ₦{course.price.toLocaleString()}
                                                </p>

                                            )}


                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/Course/${course._id}`
                                                    )
                                                }
                                                className="mt-4 rounded-lg bg-vercity px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                                            >
                                                View Course
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>



                {/* =================================================
                    RIGHT COLUMN
                ================================================= */}

                <aside className="space-y-6">


                    {/* LEADERBOARD */}

                    <div className="min-h-90 rounded-2xl bg-[#f0efff] p-7">

                        <div className="flex items-center justify-between">

                            <h2 className="text-lg font-semibold">
                                Leaderboard
                            </h2>

                            <span className="text-xs text-gray-500">
                                This Week
                            </span>

                        </div>


                        <div className="mt-7 space-y-6">

                            {[
                                ["🥇", "Bliss. J", "5000 XP"],
                                ["🥈", "Bliss. J", "3000 XP"],
                                ["🥉", `${userName} (You)`, "1200 XP"],
                                ["4", "Bliss. J", "500 XP"],
                                ["5", "Bliss. J", "400 XP"],
                            ].map(
                                ([rank, name, xp], index) => (

                                    <div
                                        key={index}
                                        className="flex items-center justify-between text-sm"
                                    >

                                        <div className="flex items-center gap-3">

                                            <span className="w-6">
                                                {rank}
                                            </span>

                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                                👤
                                            </div>

                                            <span>
                                                {name}
                                            </span>

                                        </div>


                                        <span className="text-gray-500">
                                            {xp}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>


                        <button className="mt-6 w-full rounded-lg bg-[#ddd9ff] py-3 text-sm text-vercity">
                            View Full Leaderboard
                        </button>

                    </div>



                    {/* UPCOMING EVENTS */}

                    <div className="min-h-97.5 rounded-2xl bg-[#f0efff] p-7">

                        <div className="flex items-center justify-between">

                            <h2 className="text-lg font-semibold">
                                Upcoming Events
                            </h2>

                            <button className="text-sm text-vercity">
                                View All
                            </button>

                        </div>


                        <div className="mt-7 space-y-6">

                            {[
                                ["Aug", "28", "Responsive Design"],
                                ["Aug", "31", "Design System"],
                                ["Sep", "03", "Branding"],
                                ["Sep", "09", "User Personal"],
                                ["Sep", "13", "Website Design"],
                            ].map(
                                ([month, day, title]) => (

                                    <div
                                        key={`${month}-${day}`}
                                        className="flex items-center gap-3"
                                    >

                                        <div className="w-9 overflow-hidden rounded-md bg-white text-center">

                                            <div className="bg-vercity py-1 text-xs text-white">
                                                {month}
                                            </div>

                                            <div className="py-1 text-sm font-semibold">
                                                {day}
                                            </div>

                                        </div>


                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-sm font-medium">
                                                {title}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                7:00 PM - 9:00 PM
                                            </p>

                                        </div>


                                        <button className="rounded-md bg-[#ddd9ff] px-3 py-1.5 text-xs text-vercity">
                                            Join
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </aside>

            </section>

        </div>

    );
};