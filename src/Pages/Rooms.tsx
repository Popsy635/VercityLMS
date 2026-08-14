import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Nav } from '../Components/html/Nav';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FloatingAI from '../Features/quizzes/ai/FloatingAI';



type Lesson = {
    _id: string;
    title: string;
    courseId: string;
    videoUrl: string;
    duration: number;
    resources: Resource[];
    order: number;
    isPreview: boolean;
    isCompleted: boolean;
};

type Resource = {
    _id: string;
    title: string;
    fileUrl: string;
    fileType: string;
}

export const Rooms = () => {



    const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const axiosPrivate = useAxiosPrivate();
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();



    useEffect(() => {

        const getLessons = async () => {
            try {
                const response = await axiosPrivate.get(`/student/courses/${courseId}/lessons`);
                const lessons: Lesson[] = response.data.data;

                setCourseLessons(lessons);

                // Automatically play the first lesson
                if (lessons.length > 0) {
                    if (lessonId) {
                        const lesson = lessons.find(
                            (lesson) => lesson._id === lessonId
                        );

                        if (lesson) {
                            setSelectedLesson(lesson);
                            return;
                        }
                    }

                    setSelectedLesson(lessons[0]);
                }

                console.log(lessons);
                console.log(courseId)

                // setcourseLessons(lessons.data.);
                // setEnrolledCount(user.enrolledCoursesId.length);
                //         // setIsEnrolled(user.enrolledCoursesId.length > 0)


            } catch (err) {
                console.error(err);
            }
        };
        getLessons();


    }, [axiosPrivate, courseId, lessonId]);

    const markLessonComplete = async (lessonId: string) => {
        try {
            await axiosPrivate.post("/student/lessons/complete", {
                lessonId,
            });

            // Update the UI immediately
            setCourseLessons((prev) =>
                prev.map((lesson) =>
                    lesson._id === lessonId
                        ? { ...lesson, isCompleted: true }
                        : lesson
                )
            );

            // Update the selected lesson too
            setSelectedLesson((prev) =>
                prev && prev._id === lessonId
                    ? { ...prev, isCompleted: true }
                    : prev
            );

        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.status);
                console.log(err.response?.data);
            } else {
                console.error(err);

            }
        }
    };



    const [openCourseLessons, setOpenCourseLessons] = useState<boolean | null>(null)
    const open = () => {
        setOpenCourseLessons(current => !current)
    }

    const sortedLessons = [...courseLessons].sort(
        (a, b) => a.order - b.order
    );

    const currentIndex = sortedLessons.findIndex(
        lesson => lesson._id === selectedLesson?._id
    );

    const nextLesson = () => {
        if (currentIndex < sortedLessons.length - 1) {
            const lesson = sortedLessons[currentIndex + 1];

            setSelectedLesson(lesson);

            navigate(`/Rooms/${courseId}/${lesson._id}`);
        }
    };

    const previousLesson = () => {
    if (currentIndex > 0) {
        const lesson = sortedLessons[currentIndex - 1];

        setSelectedLesson(lesson);
        navigate(`/Rooms/${courseId}/${lesson._id}`);
    }
};

    const completedLessons = courseLessons.filter(
        lesson => lesson.isCompleted
    ).length;

    const totalLessons = courseLessons.length;

    const progress =
        totalLessons === 0
            ? 0
            : Math.round((completedLessons / totalLessons) * 100);

    return (

        <section >
            <Nav />
            <div className='flex flex-col-reverse lg:w-321.25 m-auto lg:flex lg:flex-row gap-12 mt-10 '>

                <div className='lessons-list max-w-[90%] mx-auto bg-gray-200 rounded-lg -mt-8 lg:mt-0 max-h-max'>

                    <div className='header h-20 border-b flex items-center justify-center mb-4 p-4'><p className='text-lg font-semibold'>{selectedLesson?.title ?? "Course Lessons"}</p></div>
                    {sortedLessons.map((lesson) => (

                        <div key={lesson._id} onClick={() => {
                            setSelectedLesson(lesson);
                            navigate(`/Rooms/${courseId}/${lesson._id}`);
                        }} className={`lessons  p-3 flex gap-4 w-11/12 mx-auto ${selectedLesson?._id === lesson._id ? "bg-vercity text-white" : "hover:bg-gray-300"}`}>
                            <input type="checkbox" checked={lesson.isCompleted} readOnly />
                            <div>
                                <h1>{lesson.order}. {selectedLesson?.title}</h1>
                                <p className='text-sm text-gray-400'>{lesson.duration} min. video</p>
                            </div>
                        </div>
                    ))}


                </div>

                <div className=' w-[90%] mx-auto'>{selectedLesson ?
                    (

                        <div>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <p className="font-medium">Course Progress</p>

                                    <p>{progress}%</p>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-vercity h-3 rounded-full transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <p className="mt-2 text-gray-500">
                                    {completedLessons} of {totalLessons} lessons completed
                                </p>
                            </div>

                            <video
                                key={selectedLesson._id}
                                controls
                                onEnded={() => markLessonComplete(selectedLesson._id)}
                                className='w-[90%] lg:w-full h-full rounded-lg mx-auto'>
                                <source src={selectedLesson.videoUrl} type='video/mp4' />
                                Your browser does not support video playback.
                            </video>
                        </div>
                    )
                    :

                    (
                        <div className='video-pane  bg-gray-200 rounded-lg h-100 flex justify-center'>
                            <div className=' h-full w-2/4'>Video</div>
                        </div>
                    )}

                    <div className='flex gap-8 justify-between items-center'>
                        <div>
                            <h1 className="text-3xl font-semibold mt-6">
                                {selectedLesson?.title}
                            </h1>

                            <p className="text-gray-500">
                                {selectedLesson?.duration} minutes
                            </p>
                        </div>

                        <div className='navigation-buttons flex gap-8'>
                            <div className='w-10 h-10 shadow-xl inset-shadow-xs flex justify-center items-center rounded-full'>
                                <button className='left-arrow cursor-pointer hover:opacity-70 transition rounded-full  ' onClick={previousLesson} aria-label="Previous slide">
                                    <svg width="80" height="80" viewBox="32 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M79.0003 20.67C78.8103 20.67 78.6203 20.6 78.4703 20.45L71.9503 13.93C70.8903 12.87 70.8903 11.13 71.9503 10.07L78.4703 3.55002C78.7603 3.26002 79.2403 3.26002 79.5303 3.55002C79.8203 3.84002 79.8203 4.32002 79.5303 4.61002L73.0103 11.13C72.5303 11.61 72.5303 12.39 73.0103 12.87L79.5303 19.39C79.8203 19.68 79.8203 20.16 79.5303 20.45C79.3803 20.59 79.1903 20.67 79.0003 20.67Z" fill="#000000" />
                                    </svg>
                                </button>
                            </div>
                            <div className='w-10 h-10 shadow-xl inset-shadow-xs flex justify-center items-center rounded-full'>
                                <button className='right-arrow cursor-pointer hover:opacity-70 transition rounded-full  ' disabled={currentIndex === sortedLessons.length - 1}
                                    onClick={nextLesson} aria-label="Next slide">
                                    <svg width="80" height="80" viewBox="-32 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z" fill="#000000" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                    </div>



                    <div onClick={open} className='w-100 bg-gray-200 rounded-lg h-8 mt-2 flex justify-between items-center p-4 hover:bg-gray-300'>
                        <p>
                            Files ({selectedLesson?.resources.length ?? 0})
                        </p> <span>{openCourseLessons ? <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5875 8.595C16.3975 8.595 16.2075 8.525 16.0575 8.375L9.5375 1.855C9.0575 1.375 8.2775 1.375 7.7975 1.855L1.2775 8.375C0.9875 8.665 0.5075 8.665 0.2175 8.375C-0.0725 8.085 -0.0725 7.605 0.2175 7.315L6.7375 0.795C7.7975 -0.265 9.5275 -0.265 10.5975 0.795L17.1175 7.315C17.4075 7.605 17.4075 8.085 17.1175 8.375C16.9675 8.515 16.7775 8.595 16.5875 8.595Z" fill="#292D32" />
                        </svg>
                            : <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.6675 8.5975C7.9675 8.5975 7.2675 8.3275 6.7375 7.7975L0.2175 1.2775C-0.0725 0.987499 -0.0725 0.5075 0.2175 0.2175C0.5075 -0.0725 0.9875 -0.0725 1.2775 0.2175L7.7975 6.7375C8.2775 7.2175 9.0575 7.2175 9.5375 6.7375L16.0575 0.2175C16.3475 -0.0725 16.8275 -0.0725 17.1175 0.2175C17.4075 0.5075 17.4075 0.987499 17.1175 1.2775L10.5975 7.7975C10.0675 8.3275 9.3675 8.5975 8.6675 8.5975Z" fill="#292D32" />
                            </svg>}
                        </span>



                    </div>

                    {openCourseLessons ?
                        <div className='translate-y-1.5 w-100 '>
                            <div className='lessons'>

                                {selectedLesson?.resources.length ? (
                                    selectedLesson.resources.map((resource) => (
                                        <div key={resource._id}
                                            className="   hover:bg-gray-100 rounded-sm p-3  " >

                                            <div className='flex justify-between items-center'>
                                                <div>
                                                    <h1 className="font-medium">
                                                        {resource.title}
                                                    </h1>
                                                    <p className="text-sm text-gray-400 uppercase">
                                                        {resource.fileType}
                                                    </p>
                                                </div>

                                                <div>

                                                    <a
                                                        href={resource.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-vercity hover:underline"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z" fill="#1D1073" />
                                                        </svg>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>
                                    ))
                                ) : (
                                    <p className="p-3 text-gray-500">
                                        No resources available for this lesson.
                                    </p>
                                )}

                            </div>
                        </div> : null}

                </div>
            </div>
            <FloatingAI
    
    lessonTitle={selectedLesson?.title ?? ""}
/>
        </section>
    )
}
