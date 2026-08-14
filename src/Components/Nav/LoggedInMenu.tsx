import { ProfileDropDown } from "../html/ProfileDropDown";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type MenuProps = {
    logout: () => void;
};

type Panel = "cart" | "notification" | null;

export const LoggedInMenu = ({ logout }: MenuProps) => {

    const navigate = useNavigate();

    const profileMenuRef = useRef<HTMLDivElement>(null);
    const profileButtonRef = useRef<HTMLButtonElement>(null);

    const [isDrop, setIsDrop] = useState(false);
    const [activePanel, setActivePanel] = useState<Panel>(null);


    const handleDrop = () => {
        setIsDrop(true);
        setActivePanel(null);
    };


    const handleClose = () => {
        setIsDrop(false);
    };


    /*
     * Toggle cart / notification panels
     */
    const togglePanel = (panel: Panel) => {

        setActivePanel(current =>
            current === panel ? null : panel
        );

        // Close profile dropdown if opening another panel
        setIsDrop(false);
    };


    /*
     * Close everything when clicking outside
     */
    useEffect(() => {

        if (!isDrop && !activePanel) return;

        const handleClickOutside = (event: MouseEvent) => {

            const target = event.target as Node;

            const clickedInsideProfile =
                profileMenuRef.current?.contains(target);

            const clickedProfileButton =
                profileButtonRef.current?.contains(target);


            if (
                !clickedInsideProfile &&
                !clickedProfileButton
            ) {

                setIsDrop(false);
                setActivePanel(null);

            }
        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, [isDrop, activePanel]);


    return (

        <div>

            <div
                ref={profileMenuRef}
                className="relative flex items-center gap-3 lg:gap-6"
            >

                {/* ================= PROFILE ================= */}

                <div className="-mt-13">

                    <ProfileDropDown
                        drop={isDrop}
                        open={isDrop}
                        handleClose={handleClose}
                        logout={logout}
                    />

                </div>


                {/* ================= CART ================= */}

                <div className="relative">

                    <button
                        type="button"
                        className="cart"
                        onClick={() => navigate("/Cart")}
                        aria-label="Shopping cart"
                    >

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path
                                d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z"
                                fill="#1D1073"
                            />

                            <path
                                d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z"
                                fill="#1D1073"
                            />

                            <path
                                d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z"
                                fill="#1D1073"
                            />

                            <path
                                d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z"
                                fill="#1D1073"
                            />

                        </svg>

                    </button>


                    {/* CART PANEL */}

                    {activePanel === "cart" && (

                        <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">

                            <div className="flex items-center justify-between">

                                <h2 className="text-lg font-semibold">
                                    Your Cart
                                </h2>

                                <button
                                    onClick={() => setActivePanel(null)}
                                    className="text-gray-400 hover:text-gray-700"
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="py-10 text-center">

                                <div className="text-4xl">
                                    🛒
                                </div>

                                <p className="mt-3 font-medium">
                                    Your cart is empty
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Courses you add to your cart will appear here.
                                </p>

                            </div>


                            <button
                                type="button"
                                className="w-full rounded-lg bg-vercity py-3 text-sm font-medium text-white hover:opacity-90"
                                onClick={() => {
                                    setActivePanel(null);
                                }}
                            >
                                Explore Courses
                            </button>

                        </div>

                    )}

                </div>


                {/* ================= NOTIFICATION ================= */}

                <div className="relative">

                    <button
                        type="button"
                        className="notification relative"
                        onClick={() => togglePanel("notification")}
                        aria-label="Notifications"
                    >

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path
                                d="M12.02 20.5299C9.68999 20.5299 7.35999 20.1599 5.14999 19.4199C4.30999 19.1299 3.66999 18.5399 3.38999 17.7699C3.09999 16.9999 3.19999 16.1499 3.65999 15.3899L4.80999 13.4799C5.04999 13.0799 5.26999 12.2799 5.26999 11.8099V8.91992C5.26999 5.19992 8.29999 2.16992 12.02 2.16992C15.74 2.16992 18.77 5.19992 18.77 8.91992V11.8099C18.77 12.2699 18.99 13.0799 19.23 13.4899L20.37 15.3899C20.8 16.1099 20.88 16.9799 20.59 17.7699C20.3 18.5599 19.67 19.1599 18.88 19.4199C16.68 20.1599 14.35 20.5299 12.02 20.5299ZM12.02 3.66992C9.12999 3.66992 6.76999 6.01992 6.76999 8.91992V11.8099C6.76999 12.5399 6.46999 13.6199 6.09999 14.2499L4.94999 16.1599C4.72999 16.5299 4.66999 16.9199 4.79999 17.2499C4.91999 17.5899 5.21999 17.8499 5.62999 17.9899C9.80999 19.3899 14.24 19.3899 18.42 17.9899C18.78 17.8699 19.06 17.5999 19.19 17.2399C19.32 16.8799 19.29 16.4899 19.09 16.1599L17.94 14.2499C17.56 13.5999 17.27 12.5299 17.27 11.7999V8.91992C17.27 6.01992 14.92 3.66992 12.02 3.66992Z"
                                fill="#1D1073"
                            />

                            <path
                                d="M13.88 3.93993C13.81 3.93993 13.74 3.92993 13.67 3.90993C13.38 3.82993 13.1 3.76993 12.83 3.72993C11.98 3.61993 11.16 3.67993 10.39 3.90993C10.11 3.99993 9.80999 3.90993 9.61999 3.69993C9.42999 3.48993 9.36999 3.18993 9.47999 2.91993C9.88999 1.86993 10.89 1.17993 12.03 1.17993C13.17 1.17993 14.17 1.85993 14.58 2.91993C14.68 3.18993 14.63 3.48993 14.44 3.69993C14.29 3.85993 14.08 3.93993 13.88 3.93993Z"
                                fill="#1D1073"
                            />

                            <path
                                d="M12.02 22.8101C11.03 22.8101 10.07 22.4101 9.37002 21.7101C8.67002 21.0101 8.27002 20.0501 8.27002 19.0601H9.77002C9.77002 19.6501 10.01 20.2301 10.43 20.6501C10.85 21.0701 11.43 21.3101 12.02 21.3101C13.26 21.3101 14.27 20.3001 14.27 19.0601H15.77C15.77 21.1301 14.09 22.8101 12.02 22.8101Z"
                                fill="#1D1073"
                            />

                        </svg>


                        {/* Notification badge */}

                        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                            2
                        </span>

                    </button>


                    {/* NOTIFICATION PANEL */}

                    {activePanel === "notification" && (

                        <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden ">

                            <div className="flex items-center justify-between border-b border-gray-100 p-4">

                                <h2 className="font-semibold">
                                    Notifications
                                </h2>

                                <button
                                    onClick={() => setActivePanel(null)}
                                    className="text-gray-400 hover:text-gray-700"
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="divide-y divide-gray-100">

                                <div className="p-4 hover:bg-gray-50">

                                    <p className="text-sm font-medium">
                                        Welcome to Vercity 🎉
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Your learning journey starts here.
                                    </p>

                                    <p className="mt-2 text-[10px] text-gray-400">
                                        Just now
                                    </p>

                                </div>


                                <div className="p-4  hover:bg-gray-50">

                                    <p className="text-sm font-medium">
                                        New courses available
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Explore the latest courses on Vercity.
                                    </p>

                                    <p className="mt-2 text-[10px] text-gray-400">
                                        1 hour ago
                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={() => setActivePanel(null)}
                                className="w-full border-t border-gray-100 p-3 text-sm text-vercity hover:bg-gray-50"
                            >
                                Mark all as read
                            </button>

                        </div>

                    )}

                </div>


                {/* ================= PROFILE BUTTON ================= */}

                <button
                    ref={profileButtonRef}
                    onClick={
                        isDrop
                            ? handleClose
                            : handleDrop
                    }
                    className="profile-button"
                >

                    <svg
                        width="39"
                        height="39"
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

                </button>

            </div>

        </div>
    );
};