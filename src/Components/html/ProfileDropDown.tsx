import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type PddProps = {
    open: boolean;
    handleClose: () => void;
    logout: () => void;
    drop: boolean;
};

export const ProfileDropDown: React.FC<PddProps> = ({
    open,
    logout,
    handleClose,
}) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const rawName = auth?.user?.split("@")[0] || "user";

    const userName =
        rawName.charAt(0).toUpperCase() +
        rawName.slice(1);

    const goTo = (path: string) => {
        handleClose();
        navigate(path);
    };

    return (
        <div>
            {open && (
                <div className="profile-dropdown absolute right-0 max-w-70 translate-y-16 animate-[fadeIn_180ms_ease-out]">

                    <div className="rounded-2xl bg-white px-6 py-10 shadow-sm">

                        <div className="flex flex-col gap-10">

                            {/* USER INFO */}

                            <div onClick={() =>
                                    goTo("/Dashboard/profile-pic")
                                }
                                 className="flex items-center justify-between gap-4 cursor-pointer">

                                <div 
                                >
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 39 39"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            width="39"
                                            height="39"
                                            rx="19.5"
                                            fill="#1D1073"
                                        />

                                        <path
                                            d="M19.5 20.25C16.33 20.25 13.75 17.67 13.75 14.5C13.75 11.33 16.33 8.75 19.5 8.75C22.67 8.75 25.25 11.33 25.25 14.5C25.25 17.67 22.67 20.25 19.5 20.25ZM19.5 10.25C17.16 10.25 15.25 12.16 15.25 14.5C15.25 16.84 17.16 18.75 19.5 18.75C21.84 18.75 23.75 16.84 23.75 14.5C23.75 12.16 21.84 10.25 19.5 10.25Z"
                                            fill="white"
                                        />

                                        <path
                                            d="M28.0901 30.25C27.6801 30.25 27.3401 29.91 27.3401 29.5C27.3401 26.05 23.8202 23.25 19.5002 23.25C15.1802 23.25 11.6602 26.05 11.6602 29.5C11.6602 29.91 11.3202 30.25 10.9102 30.25C10.5002 30.25 10.1602 29.91 10.1602 29.5C10.1602 25.23 14.3502 21.75 19.5002 21.75C24.6502 21.75 28.8401 25.23 28.8401 29.5C28.8401 29.91 28.5001 30.25 28.0901 30.25Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold">
                                        {userName}
                                    </h1>

                                    <p className="text-sm">
                                        {auth?.user}
                                    </p>
                                </div>

                            </div>


                            {/* DROPDOWN ITEMS */}

                            <div className="flex flex-col">

                                {/* PROFILE */}




                                {/* INSTRUCTOR */}

                                <div className="border-b border-gray-300 py-2 text-gray-600">

                                    <button
                                        onClick={() =>
                                            goTo("/Dashboard/instructor")
                                        }
                                        className="w-full text-left transition-colors hover:text-vercity"
                                    >
                                        Instructor Dashboard
                                    </button>

                                </div>


                                {/* PASSWORD */}

                                <div className="border-b border-gray-300 py-2 text-gray-600">

                                    <button
                                        onClick={() =>
                                            goTo(
                                                "/Dashboard/password-settings"
                                            )
                                        }
                                        className="w-full text-left transition-colors hover:text-vercity"
                                    >
                                        Password Settings
                                    </button>

                                </div>


                                {/* LOGOUT */}

                                <div className="border-b border-gray-300 py-2 text-gray-600">

                                    <button
                                        onClick={logout}
                                        className="w-full text-left transition-colors hover:text-red-500"
                                    >
                                        Logout
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
};