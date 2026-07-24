import { useEffect, useState } from 'react'
import axios from 'axios'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'




type Course = {
    _id: string;
    title?: string;
    course?: object;
    data?: [];
    description?: string;
    thumbnail?: string;
};

type DashCarouselProps = {
    enroll: (courseId: string) => void;
    enrolledCourses: string[];
    thumb?: string;
    initialCourseId?: string;

};


const normalizeCourses = (payload: unknown): Course[] => {
    if (
        payload &&
        typeof payload === "object" &&
        "data" in payload &&
        Array.isArray((payload as { data: unknown }).data)
    ) {
        return (payload as { data: Course[] }).data;
    }

    return [];
};

export const DashCarousel = ({ enroll, enrolledCourses, thumb, }: DashCarouselProps) => {

    console.log("DashCarousel rendered")

    const axiosPrivate = useAxiosPrivate();
    const [courses, setCourses] = useState<Course[]>([])




    useEffect(() => {
        const fetchCourses = async () => {

            try {

                const response = await axiosPrivate.get("/student/courses");
                const parsedCourses = normalizeCourses(response.data) as Course[];

                setCourses(parsedCourses);




            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log("Status:", error.response?.status);
                    console.log("Response:", error.response?.data);
                    console.log("Headers:", error.response?.headers);
                } else {
                    console.log(error);
                }

            }

            // setCourses([
            //     {
            //         id: "0123",
            //         title: "Data Analysis Essentials",
            //         description: "Learn how to turn raw data into insights with analytics and visualization tools.",
            //     },
            //     {
            //         id: '0223',
            //         title: "Web Development",
            //         description: " Learn to design websites"
            //     }
            // ])
        }
        fetchCourses()
    }, [axiosPrivate])



    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide((current) =>
            current === courses.length - 1 ? 0 : current + 1
        );
    };

    const prevSlide = () => {
        setSlide((current) =>
            current === 0 ? courses.length - 1 : current - 1
        );
    };

    // const slideData = [
    //     { _id: 1, image: image18, title: 'Data Science', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
    //     { _id: 2, image: image19, title: 'Product Design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
    //     { _id: 3, image: image20, title: 'Web Development', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
    // ]

    const currentCourse = courses[slide];
    const isEnrolled = currentCourse ? enrolledCourses.includes(currentCourse._id) : false

    // const enrollCourse = () => {
    //     useEffect(() => {
    //     const getEnroll = async () => {

    //         try {

    //             const response = await axiosPrivate.post("/student/courses");
    //             const parsedCourses = normalizeCourses(response.data) as Course[];

    //             setCourses(parsedCourses);



    //         } catch (error) {
    //             if (axios.isAxiosError(error)) {
    //                 console.log("Status:", error.response?.status);
    //                 console.log("Response:", error.response?.data);
    //                 console.log("Headers:", error.response?.headers);
    //             } else {
    //                 console.log(error);
    //             }

    //         }

    //         // setCourses([
    //         //     {
    //         //         id: "0123",
    //         //         title: "Data Analysis Essentials",
    //         //         description: "Learn how to turn raw data into insights with analytics and visualization tools.",
    //         //     },
    //         //     {
    //         //         id: '0223',
    //         //         title: "Web Development",
    //         //         description: " Learn to design websites"
    //         //     }
    //         // ])
    //     }
    //     fetchCourses()
    // }, [axiosPrivate])
    // }




    return (
        <div>
            <section className='not-enrolled'>
                <div className=' my-4'>
                    <div className=''>
                        <h1 className='text-[30px]'>Explore Courses</h1>

                        <div>
                            {courses.length === 0 ? (<p>Loading Courses...</p>) : (
                                <div>{/* Carousel Slide */}
                                
                                <div className='flex justify-center items-center gap-6 rounded-lg p-10'>
                                    <div className='pr-8 flex flex-col gap-10'>
                                        <h1 className="font-medium text-6xl text-vercity">
                                            {currentCourse?.title}
                                        </h1>

                                        <p>
                                            {currentCourse?.description}
                                        </p>
                                        <button disabled={isEnrolled} onClick={() => { if (currentCourse) { enroll(currentCourse._id) } }}
                                            className={` py-2 px-4 rounded-lg font-medium tracking-wide transition-all duration-200 transform active:scale-95 ${isEnrolled
                                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 w-22'
                                                : 'bg-vercity text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-200 w-20'
                                                }`}>{isEnrolled ? 'Enrolled' : 'Enroll'}</button>
                                    </div>
                                    <div style={{
                                        backgroundImage: `url(${currentCourse?.thumbnail ?? thumb})`,
                                    }} className="basis-full rounded-r-lg w-200 h-125 bg-cover bg-center bg-no-repeat"></div>
                                </div>
                                {/* Navigation Controls */}
                                <div className="flex justify-between items-center ">
                                    {/* Indicator Dots */}
                                    <div className="flex gap-2">
                                        {courses.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSlide(index)}
                                                className={`mt-6 h-2 w-2 rounded-full transition-all ${index === slide ? 'bg-vercity w-8' : 'bg-gray-300'}`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    {/* Arrow Buttons */}
                                    <div className='flex gap-8 items-center mt-6 '>
                                        <div className='w-10 h-10 shadow-xl inset-shadow-xs flex justify-center items-center rounded-full'>
                                            <button className='left-arrow cursor-pointer hover:opacity-70 transition rounded-full  ' onClick={prevSlide} aria-label="Previous slide">
                                                <svg width="80" height="80" viewBox="32 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M79.0003 20.67C78.8103 20.67 78.6203 20.6 78.4703 20.45L71.9503 13.93C70.8903 12.87 70.8903 11.13 71.9503 10.07L78.4703 3.55002C78.7603 3.26002 79.2403 3.26002 79.5303 3.55002C79.8203 3.84002 79.8203 4.32002 79.5303 4.61002L73.0103 11.13C72.5303 11.61 72.5303 12.39 73.0103 12.87L79.5303 19.39C79.8203 19.68 79.8203 20.16 79.5303 20.45C79.3803 20.59 79.1903 20.67 79.0003 20.67Z" fill="#000000" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className='w-10 h-10 shadow-xl inset-shadow-xs flex justify-center items-center rounded-full'>
                                            <button className='right-arrow cursor-pointer hover:opacity-70 transition rounded-full  ' onClick={nextSlide} aria-label="Next slide">
                                                <svg width="80" height="80" viewBox="-32 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z" fill="#000000" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div></div>)}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

