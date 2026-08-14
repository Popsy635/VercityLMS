import robot from "../../../assets/Frame672.png"
import { useNavigate } from "react-router-dom";

type DashboardActionCardProps = {
    title: string;
    description: string;
    action: string;
};

const DashboardActionCard = ({ title, description, action, }: DashboardActionCardProps) => {
    



    return (
        <div className="rounded-xl border border-gray-300 p-5">

            <h2 className="font-medium text-vercity">
                {title}
            </h2>

            <p className="mt-3 text-sm text-gray-600">
                {description}
            </p>

            <button className="mt-6 text-sm font-medium text-vercity">
                {action} →
            </button>

        </div>
    );
};

export const EmptyDashboard = () => {
    const navigate = useNavigate();


    return (
        <section className="min-h-[calc(100vh-64px)] ">

            {/* Hero */}
            <div className="mx-auto max-w-6xl px-6 py-5 lg:px-12">

                <div className="flex flex-col items-center text-center">

                    <img
                        src={robot}
                        alt="Vercity learning assistant"
                        className="w-65 h-57 sm:w-70 sm:h-81 lg:w-65 lg:h-105 object-contain"
                    />

                    <h1 className="mt-3 text-3xl font-semibold text-vercity lg:text-4xl">
                        Welcome To Vercity
                    </h1>

                    <p className="mt-2 max-w-xl text-gray-500">
                        You Haven't Started Any Course Yet. Explore Courses,
                        Build Skills, And Unlock Achievements As You Learn.
                    </p>

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row">

                        <button
                            onClick={() => navigate("/courses")}
                            className="rounded-lg bg-vercity px-6 py-3 text-white"
                        >
                            Explore Courses
                        </button>

                        <button
                            className="rounded-lg border border-vercity px-6 py-3 text-vercity"
                        >
                            Take A Skill Quiz
                        </button>

                    </div>

                </div>

            </div>


            {/* Bottom cards */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 pb-6 md:grid-cols-3">

                <DashboardActionCard
                    title="Find Your Path"
                    description="Discover Personalized Learning Paths Based On Your Goals."
                    action="Explore Path"
                />

                <DashboardActionCard
                    title="Ask Your AI Assistance"
                    description="Get Course Recommendations, Answers And Study Help Anytime."
                    action="Chat Now"
                />

                <DashboardActionCard
                    title="Join A Challenge"
                    description="Participate In Challenges, Earn XP And Climb The Leaderboard."
                    action="View Challenges"
                />

            </div>

        </section>
    );
};


