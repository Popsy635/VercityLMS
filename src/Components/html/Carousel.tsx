import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import image20 from '../../assets/image20.png'
import axios from '../../api/axios'
// import axios from '../../api/axios'
// import { AxiosError } from "axios";
// import image18 from '../../assets/image18.png';
// import image19 from '../../assets/image19.png';



type Course = {
    _id: string
    thumbnail: string | null
    title: string
    description: string
}

const fallback = image20

// const demoCourses: Course[] = [
//   {
//     _id: "1",
//     title: "Web Development",
//     description: "Master HTML, CSS, JavaScript and React.",
//     thumbnail: image20,
//   },
//   {
//     _id: "2",
//     title: "Product Design",
//     description: "Learn UI/UX and build modern interfaces.",
//     thumbnail: image19,
//   },
  
// ];
// const courses: Slide[] = [
//     { id: "da", image: image18, title: 'Data Science', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
//     { id: "pd", image: image19, title: 'Product Design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
//     { id: "wd", image: image20, title: 'Web Development', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
// ]



export const Carousel = () => {
      


    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
    const fetchCourses = async () => {
        try {
            const response = await axios.get("/courses/allcourses");

            console.log("Courses:", response.data);

            setCourses(response.data.data);

        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    fetchCourses();
}, []);
    

    // const normaliseCourses = (payload: unknown): Course[] => {
    //     if (Array.isArray(payload)) {
    //         return payload as Course[];
    //     }

    //     if (
    //         payload &&
    //         typeof payload === "object" &&
    //         "data" in payload &&
    //         Array.isArray((payload as { data: unknown }).data)
    //     ) {
    //         return (payload as { data: Course[] }).data;
    //     }
    //     return [];
    // }


//     useEffect(() => {
        
//         const fetchCourses = async () => {

//             try {
//                 console.log("Fetching courses...")

//                 const response = await axios.get("/student/courses");

//                 console.log("API Response:", response.data);

//                 const parsedCourses = normaliseCourses(response.data);

//                 console.log("Parsed:", parsedCourses);

//                 setCourses(parsedCourses);




//             } catch (error) {
//     if (error instanceof AxiosError) {
//         console.log(error.response?.status);
//     } else {
//         console.log(error);
//     }
// }

//             // setCourses([
//             //     {
//             //         id: "0123",
//             //         title: "Data Analysis Essentials",
//             //         description: "Learn how to turn raw data into insights with analytics and visualization tools.",
//             //     },
//             //     {
//             //         id: '0223',
//             //         title: "Web Development",
//             //         description: " Learn to design websites"
//             //     }
//             // ])
//         }
//         fetchCourses()
//     }, [])



    const navigate = useNavigate();

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(current =>
            current === courses.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setSlide(current =>
            current === 0 ? courses.length - 1 : current - 1)
    };

console.log("Carousel courses:", courses);



    return (
<div className="carousel relative  max-w-xl xl:max-w-2xl">

            {courses.map((course, idx) => {
                return (<div className={slide === idx ? "slide w-full  " : "hidden w-full aspect-4/5"} >
                    <div key={idx} className='relative flex justify-center items-end w-full h-[full] rounded-3xl '>
                        <img src={course.thumbnail ?? fallback} alt={course.title} className=' w-full h-full object-cover rounded-3xl' />
                        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black-80 to-transparent rounded-3xl'></div>
                        <div className=' max-w-sm md:max-w-lg flex flex-col gap-2 absolute ml-10 md:-ml-7 mb-10'>
                            <h1 className='text-white font-semibold text-4xl'>{course.title}</h1>
                            <p className='text-white '>{course.description}</p>
                            <button type='button' onClick={() => navigate(`/course/${course._id}`)} className='bg-white rounded-lg p-2 w-fit px-6'>Learn More</button>
                            <div className='flex justify-center gap-6 '>
                                <div className='flex justify-between items-center w-120 mt-5'>

                                    <div className='flex gap-2'>
                                        {courses.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSlide(idx)} className={
                                                    slide === idx
                                                        ? " bg-white h-2 w-6 rounded-full"
                                                        : "bg-white h-2 w-2 rounded-full "
                                                }>

                                            </button>)
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className='left-arrow cursor-pointer ' onClick={prevSlide}><svg width="88" height="24" viewBox="0 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M79.0003 20.67C78.8103 20.67 78.6203 20.6 78.4703 20.45L71.9503 13.93C70.8903 12.87 70.8903 11.13 71.9503 10.07L78.4703 3.55002C78.7603 3.26002 79.2403 3.26002 79.5303 3.55002C79.8203 3.84002 79.8203 4.32002 79.5303 4.61002L73.0103 11.13C72.5303 11.61 72.5303 12.39 73.0103 12.87L79.5303 19.39C79.8203 19.68 79.8203 20.16 79.5303 20.45C79.3803 20.59 79.1903 20.67 79.0003 20.67Z" fill="#ffffff" />
                                        </svg>
                                        </div>
                                        <div className='right-arrow cursor-pointer' onClick={nextSlide}><svg width="88" height="24" viewBox="0 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z" fill="#ffffff" />
                                        </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            })}



        </div>
    );
}
