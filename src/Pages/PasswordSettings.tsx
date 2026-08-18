import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const PasswordSettings = () => {

    const axiosPrivate = useAxiosPrivate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        setMessage("");

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            await axiosPrivate.patch(
                "/student/change-password",
                {
                    currentPassword,
                    newPassword,
                }
            );

            setMessage("Password changed successfully.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to change password. Please check your current password."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="w-full bg-white px-4 py-8 lg:px-8">

            <div className="mx-auto max-w-3xl">

                <h1 className="text-3xl font-semibold text-gray-900">
                    Password Settings
                </h1>

                <p className="mt-2 text-gray-500">
                    Change your account password.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="mt-8 rounded-2xl bg-[#f0efff] p-6 md:p-8"
                >

                    <div className="space-y-5">

                        {/* CURRENT PASSWORD */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-vercity"
                                placeholder="Enter current password"
                                required
                            />

                        </div>


                        {/* NEW PASSWORD */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-vercity"
                                placeholder="Enter new password"
                                required
                            />

                        </div>


                        {/* CONFIRM */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-vercity"
                                placeholder="Confirm new password"
                                required
                            />

                        </div>


                        {/* MESSAGE */}

                        {message && (

                            <p className="rounded-lg bg-white p-3 text-sm text-gray-600">
                                {message}
                            </p>

                        )}


                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-vercity px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                        >
                            {loading
                                ? "Updating..."
                                : "Update Password"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};