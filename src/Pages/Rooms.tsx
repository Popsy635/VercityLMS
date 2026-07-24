import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Nav } from '../Components/html/Nav';
import { useParams } from 'react-router-dom';



type Lesson = {
    _id: string;
    title: string;
    courseId: string;
    videoUrl: string;
    duration: number;
    resources: string[];
    order: number;
    isPreview: boolean;
    isCompleted: boolean;
};

export const Rooms = () => {



    const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const axiosPrivate = useAxiosPrivate();
    const { courseId } = useParams();

    useEffect(() => {

        const getLessons = async () => {
            try {
                const response = await axiosPrivate.get(`/student/courses/${courseId}/lessons`);
                const lessons = response.data.data;

                setCourseLessons(lessons);

                // Automatically play the first lesson
                if (lessons.length > 0) {
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
    }, [axiosPrivate]);



    const [openCourseLessons, setOpenCourseLessons] = useState<boolean | null>(null)
    const open = () => {
        setOpenCourseLessons(current => !current)
    }


    return (

        <section >
            <Nav />
            <div className='flex flex-col-reverse lg:w-321.25 m-auto lg:flex lg:flex-row gap-12 mt-10 '>
                
                <div className='lessons-list max-w-[90%] mx-auto bg-gray-200 rounded-lg -mt-8 lg:-mt-0'>

                    <div className='header h-20 border-b flex items-center justify-center mb-4'><p className='text-lg font-semibold'>{selectedLesson?.title ?? "Course Lessons"}</p></div>
                    {courseLessons.sort((a, b) => a.order - b.order)
                        .map((lesson) => (

                            <div key={lesson._id} onClick={() => setSelectedLesson(lesson)} className={`lessons  p-3 flex gap-4 w-11/12 mx-auto ${selectedLesson?._id === lesson._id ? "bg-vercity text-white" : "hover:bg-gray-300"}`}>
                                <input type="checkbox" checked={lesson.isCompleted} readOnly />
                                <div>
                                    <h1>{lesson.order}. {lesson.title}</h1>
                                    <p className='text-sm text-gray-400'>{lesson.duration} min. video</p>
                                </div>
                            </div>
                        ))}


                </div>
                <div className='w-[90%] mx-auto'>{selectedLesson ? (<div>
                    <video key={selectedLesson._id} controls className='w-[90%] lg:w-4xl h-full rounded-lg mx-auto'> <source src={selectedLesson.videoUrl} type='video/mp4' /> Your browser does not support video playback. </video>
                    </div>) :
                    (<div className='video-pane  bg-gray-200 rounded-lg h-100 flex justify-center'>
                        <div className=' h-full w-2/4'>Video</div>
                    </div>)}
                    <div onClick={open} className='w-100 bg-gray-200 rounded-lg h-8 mt-2 flex justify-between items-center p-4 hover:bg-gray-300'>
                        <p>Files</p> <span>{openCourseLessons ? <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5875 8.595C16.3975 8.595 16.2075 8.525 16.0575 8.375L9.5375 1.855C9.0575 1.375 8.2775 1.375 7.7975 1.855L1.2775 8.375C0.9875 8.665 0.5075 8.665 0.2175 8.375C-0.0725 8.085 -0.0725 7.605 0.2175 7.315L6.7375 0.795C7.7975 -0.265 9.5275 -0.265 10.5975 0.795L17.1175 7.315C17.4075 7.605 17.4075 8.085 17.1175 8.375C16.9675 8.515 16.7775 8.595 16.5875 8.595Z" fill="#292D32" />
                        </svg>
                            : <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.6675 8.5975C7.9675 8.5975 7.2675 8.3275 6.7375 7.7975L0.2175 1.2775C-0.0725 0.987499 -0.0725 0.5075 0.2175 0.2175C0.5075 -0.0725 0.9875 -0.0725 1.2775 0.2175L7.7975 6.7375C8.2775 7.2175 9.0575 7.2175 9.5375 6.7375L16.0575 0.2175C16.3475 -0.0725 16.8275 -0.0725 17.1175 0.2175C17.4075 0.5075 17.4075 0.987499 17.1175 1.2775L10.5975 7.7975C10.0675 8.3275 9.3675 8.5975 8.6675 8.5975Z" fill="#292D32" />
                            </svg>}
                        </span>



                    </div>

                    {openCourseLessons ? <div className='translate-y-1.5 w-100 '>
                        <div className='lessons hover:bg-gray-200  p-3 flex gap-4 w-11/12 mx-auto justify-between items-center'>

                            <div>
                                <h1>{}</h1>
                                <p className='text-sm text-gray-400'>3 min. video</p>
                            </div>
                            <div className='cursor-pointer'><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z" fill="#1D1073" />
                            </svg>
                            </div>
                        </div>
                    </div> : null}

                </div>
            </div>
        </section>
    )
}
