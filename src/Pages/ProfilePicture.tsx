import { useContext, useState } from "react";
import AuthContext from "../Context/AuthProvider";

export const ProfilePicture = () => {
    const { auth } = useContext(AuthContext);

    const [preview, setPreview] = useState<string | null>(null);

    const rawName = auth?.user?.split("@")[0] || "user";

    const userName =
        rawName.charAt(0).toUpperCase() +
        rawName.slice(1);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);
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
                        Update your profile picture.
                    </p>
                </div>


                {/* PROFILE CARD */}

                <div className="mt-8 rounded-2xl bg-[#f0efff] p-6 md:p-8">

                    <div className="flex flex-col items-center gap-6 sm:flex-row">

                        {/* IMAGE */}

                        <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-vercity">

                            {preview ? (
                                <img
                                    src={preview}
                                    alt={userName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-5xl font-semibold text-white">
                                    {userName.charAt(0)}
                                </span>
                            )}

                        </div>


                        {/* INFORMATION */}

                        <div>

                            <h2 className="text-2xl font-semibold">
                                {userName}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                {auth?.user}
                            </p>

                            <label className="mt-5 inline-block cursor-pointer rounded-lg bg-vercity px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">

                                Choose Picture

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                            </label>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};