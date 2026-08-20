import { useContext, useState } from "react";
import AuthContext from "../Context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const ProfilePicture = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const axiosPrivate = useAxiosPrivate();

    const [preview, setPreview] = useState<string | null>(
        auth.avatar ?? null
    );

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const rawName = auth?.user?.split("@")[0] || "user";

    const userName =
        rawName.charAt(0).toUpperCase() +
        rawName.slice(1);

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        // Check file type
        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image.");
            return;
        }

        // Check file size - 5MB maximum
        if (file.size > 5 * 1024 * 1024) {
            setMessage("Image must be less than 5MB.");
            return;
        }

        // Show image immediately
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        setMessage("");
        setLoading(true);

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await axiosPrivate.patch(
                "/auth/update",
                formData
            );

            const updatedUser = response.data.data;

            // Update AuthContext
            setAuth((prev) => ({
                ...prev,
                avatar: updatedUser.avatar,
            }));

            // Use Cloudinary URL returned from backend
            setPreview(updatedUser.avatar);

            setMessage("Profile picture updated successfully.");

        } catch (error: any) {
            console.log("STATUS:", error?.response?.status);
            console.log("BACKEND ERROR:", error?.response?.data);

            setPreview(auth.avatar ?? null);
            setMessage("Unable to update profile picture.");
        } finally {
            setLoading(false);
            event.target.value = "";
        }
    };

    return (
        <div className="w-full bg-white px-4 py-8 lg:px-8">

            <div className="mx-auto max-w-4xl">

                {/* HEADER */}

                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Profile Picture
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Choose a profile picture that represents you.
                    </p>
                </div>


                {/* PROFILE CARD */}

                <div className="mt-8 rounded-2xl bg-[#f0efff] p-6 md:p-8">

                    <div className="flex flex-col items-center gap-8 sm:flex-row">


                        {/* ================= AVATAR ================= */}

                        <div className="relative shrink-0">

                            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-vercity ring-4 ring-white shadow-md">

                                {preview ? (

                                    <img
                                        src={preview}
                                        alt={userName}
                                        className="h-full w-full object-cover"
                                    />

                                ) : (

                                    <span className="text-6xl font-semibold text-white">
                                        {userName.charAt(0)}
                                    </span>

                                )}

                            </div>


                            {/* CAMERA BUTTON */}

                            <label
                                htmlFor="profile-picture"
                                className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
                            >

                                {loading ? (

                                    <svg
                                        className="h-5 w-5 animate-spin text-vercity"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="opacity-25"
                                        />

                                        <path
                                            d="M21 12a9 9 0 0 1-9 9"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                    </svg>

                                ) : (

                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M4 7H7L9 4H15L17 7H20C21.1 7 22 7.9 22 9V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V9C2 7.9 2.9 7 4 7Z"
                                            stroke="#1D1073"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <circle
                                            cx="12"
                                            cy="14"
                                            r="3.5"
                                            stroke="#1D1073"
                                            strokeWidth="1.8"
                                        />
                                    </svg>

                                )}

                                <input
                                    id="profile-picture"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={loading}
                                />

                            </label>

                        </div>


                        {/* ================= INFORMATION ================= */}

                        <div className="text-center sm:text-left">

                            <h2 className="text-2xl font-semibold text-gray-900">
                                {userName}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                {auth?.user}
                            </p>


                            {/* BUTTON */}

                            <label
                                htmlFor="profile-picture"
                                className={`mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-vercity px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 ${loading
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                    }`}
                            >

                                {loading
                                    ? "Uploading..."
                                    : preview
                                        ? "Change Picture"
                                        : "Choose Picture"
                                }

                                {!loading && (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 16V4M12 4L7 9M12 4L17 9M5 20H19"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={loading}
                                />

                            </label>


                            {/* HELP TEXT */}

                            <p className="mt-3 text-xs text-gray-500">
                                JPG, PNG or WebP. Maximum size 5MB.
                            </p>


                            {/* MESSAGE */}

                            {message && (

                                <p
                                    className={`mt-3 text-sm ${message.includes("successfully")
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {message}
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};