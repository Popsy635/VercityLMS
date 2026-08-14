import { useState } from "react";
import { useNavigate } from "react-router-dom";

import robo from "../../../assets/merry.png"


type FloatingAIProps = {
    courseTitle?: string;
    lessonTitle?: string;
};

const FloatingAI = ({courseTitle, lessonTitle}: FloatingAIProps) => {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            {/* CHAT WINDOW */}

            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-32px)] max-w-90 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">

                    {/* HEADER */}

                    <div className="flex items-center justify-between bg-vercity px-4 py-3 text-white">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">

                                <img
                                    src={robo}
                                    alt="Merry"
                                    className="h-7 w-7 object-contain"
                                />

                            </div>

                            <div>

                                <p className="text-sm font-semibold">
                                    Merry
                                </p>

                                <p className="text-xs text-white/70">
                                    AI Learning Assistant
                                </p>

                            </div>

                        </div>


                        <button
                            onClick={() => setOpen(false)}
                            className="text-xl text-white/70 hover:text-white"
                            aria-label="Close AI assistant"
                        >
                            ×
                        </button>

                    </div>


                    {/* MESSAGE */}

                    <div className="px-5 py-6">

                        <div className="flex items-start gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0efff]">

                                <img
                                    src={robo}
                                    alt="Merry"
                                    className="h-6 w-6 object-contain"
                                />

                            </div>

                            <div className="rounded-2xl rounded-tl-sm bg-[#f7f7fb] px-4 py-3">

                               <p className="text-sm leading-6 text-gray-700">
    {lessonTitle
        ? `Need help with ${lessonTitle}? 👋`
        : "Need help with this lesson? 👋"}
</p>

<p className="mt-1 text-sm leading-6 text-gray-500">
    {courseTitle
        ? `You're learning ${courseTitle}. I can explain the lesson, summarize it, or quiz you on what you've learned.`
        : "I can explain the lesson, summarize it, or quiz you on what you've learned."}
</p>

                            </div>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="border-t border-gray-100 p-4">

                        <div className="grid grid-cols-2 gap-2">

                            <button
                                onClick={() =>
                                    navigate("/Dashboard/ai?mode=explain")
                                }
                                className="rounded-xl bg-[#f0efff] px-3 py-2.5 text-xs font-medium text-vercity hover:bg-[#e5e2ff]"
                            >
                                Explain Lesson
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/Dashboard/ai?mode=summary")
                                }
                                className="rounded-xl bg-[#f0efff] px-3 py-2.5 text-xs font-medium text-vercity hover:bg-[#e5e2ff]"
                            >
                                Summarize
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/Dashboard/ai?mode=quiz")
                                }
                                className="rounded-xl bg-[#f0efff] px-3 py-2.5 text-xs font-medium text-vercity hover:bg-[#e5e2ff]"
                            >
                                Quiz Me
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/Dashboard/ai")
                                }
                                className="rounded-xl bg-vercity px-3 py-2.5 text-xs font-medium text-white hover:opacity-90"
                            >
                                Open Merry
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* FLOATING BUTTON */}

            <button
                onClick={() => setOpen(prev => !prev)}
                className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-vercity shadow-xl ring-4 ring-white transition hover:scale-105 hover:shadow-2xl"
                aria-label="Open AI Learning Assistant"
            >

                <img
                    src={robo}
                    alt="Merry"
                    className="h-12 w-12 object-contain"
                />

            </button>

        </>
    );
};

export default FloatingAI;