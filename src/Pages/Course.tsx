
import { Nav } from '../Components/html/Nav'
import useAuth from '../hooks/useAuth'
import { Footer } from '../Components/html/Footer'
import img43 from '../assets/image43.png'
import img44 from '../assets/image44.png'
import img47 from '../assets/image47.png'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
import axios from 'axios'
import thum from '../assets/image20.png'
import { useParams } from "react-router-dom";
import vids from '../assets/vidthumb.png'

export const Course = () => {

  const { courseId } = useParams();
  const thumb = thum;



  type Lesson = {
    _id: string;
    title: string;
    duration: number;
    order: number;
    videoUrl: string;
    isPreview: boolean;
  };

  type Course = {
    _id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    category: string;
    level: string;
    price: number;

    instructorId: {
      _id: string;
      name: string;
    };

    details?: {
      duration: string;
      lessons: Lesson[];
      instructor: string;
      level: string;
    }
  };


  const normalizeCourses = (payload: unknown): Course[] => {
    if (Array.isArray(payload)) {
      return payload as Course[];
    } if (
      payload && typeof payload === 'object' &&
      'data' in payload &&
      Array.isArray((payload as { data: unknown }).data)
    ) {
      return (payload as { data: Course[] }).data;
    }

    return [];
  };

  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState<Course[]>([])

  const { auth } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {

      try {

        const response = await axiosPrivate.get("/student/courses");

        const parsedCourses = normalizeCourses(response.data);

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

      
    }
    fetchCourses()
  }, [axiosPrivate])

  useEffect(() => {
    setSlide(0);
  }, [courseId]);



  const [slide, setSlide] = useState(0);

  const [selectedLevel] = useState("All");

  useEffect(() => {
  console.log("Selected Level:", selectedLevel);
}, [selectedLevel]);


  const nextSlide = () => {
    if (!orderedCourses.length) return;


    setSlide((current) =>
      current === orderedCourses.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    if (!orderedCourses.length) return;

    setSlide((current) =>
      current === 0 ? orderedCourses.length - 1 : current - 1
    );
  };

  const isLoggedIn = !!auth.accessToken;

  const displayCourses = isLoggedIn
    ? courses
    : [
      {
        _id: "wd",
        title: "Web Development",
        description: "...",
        thumbnail: thum,
        category: "Development",
        level: "Intermediate",
        price: 20000,
        instructorId: {
          _id: "1",
          name: "John Doe",
        },

        details: {
          instructor: "Prof Adam",
          duration: "90 Days",
          level: "Intermediate",
          lessons: [
            {
              id: 1,
              thumbnail: img43,
              title: "HTML Fundamentals",
              order: "1 of 8 Lessons",
            },

            {
              id: 2,
              thumbnail: img44,
              title: "CSS Fundamentals",
              order: "2 of 8 Lessons",
            },
            {
              id: 3,
              thumbnail: img47,
              title: "JavaScript Basics",
              order: "3 of 8 Lessons",
            },

          ]
        }
      }
    ];


displayCourses.forEach((course, index) => {
  console.log(index, course);
})

 const filteredCourses =
  selectedLevel === "All"
    ? displayCourses
    : displayCourses.filter((course) => {
        const match =
          course.level.trim().toLowerCase() ===
          selectedLevel.trim().toLowerCase();

        console.log({
          title: course.title,
          level: course.level,
          selectedLevel,
          match,
        });

        return match;
      });

      console.log("Selected Level:", selectedLevel);

displayCourses.forEach(course => {
  console.log(
    "Course:",
    course.title,
    "| Level:",
    course.level,
    "| Match:",
    course.level.toLowerCase() === selectedLevel.toLowerCase()
  );
});

console.log("Filtered:", filteredCourses);

console.log("Filtered Courses:", filteredCourses);

  const orderedCourses = [
    ...filteredCourses.filter(course => course._id === courseId),
    ...filteredCourses.filter(course => course._id !== courseId),
  ];

  console.log("Ordered Courses:", orderedCourses);

  const [lessons, setLessons] = useState<Lesson[]>([]);



  const currentCourse = orderedCourses[slide];


  useEffect(() => {
    if (!currentCourse?._id) return;

    const fetchLessons = async () => {
      try {
        const response = await axiosPrivate.get(
          `/student/courses/${currentCourse._id}/lessons`
        );

        console.log("LESSONS:", response.data.data);

        setLessons(response.data.data);
      } catch (err) {
        console.error(err);

      }
    };

    fetchLessons();
  }, [currentCourse, axiosPrivate]);

  useEffect(() => {
  setSlide(0);
}, [courseId, selectedLevel]);



  return (
    <div>
       <Nav />
      <div className=' py-10 flex flex-col items-center'>
        <div className=' rounded-lg flex justify-between items-center gap-20 w-7xl m-auto shadow-xl inset-shadow-2xs  overflow-clip'>
          <div className='px-10 flex flex-col gap-10 basis-2xl -mt-20 '>
            <h1 className='font-medium text-6xl text-vercity'> {currentCourse?.title ?? "Loading..."}</h1>
            <p>{currentCourse?.description ?? "Loading course..."} </p>
          </div>
          <div style={{ backgroundImage: `url(${currentCourse?.thumbnail ?? thumb})` }} className=" w-120 h-120 bg-cover bg-center bg-no-repeat "
          ></div>
        </div>
        <div className='flex gap-8 items-center mt-6 '>
          <div className=' shadow-xl inset-shadow-xs flex justify-center items-center rounded-full'>
            <button className='left-arrow cursor-pointer hover:opacity-70 transition rounded-full  ' onClick={prevSlide} aria-label="Previous slide">
              <svg width="40" height="40" viewBox="32 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M79.0003 20.67C78.8103 20.67 78.6203 20.6 78.4703 20.45L71.9503 13.93C70.8903 12.87 70.8903 11.13 71.9503 10.07L78.4703 3.55002C78.7603 3.26002 79.2403 3.26002 79.5303 3.55002C79.8203 3.84002 79.8203 4.32002 79.5303 4.61002L73.0103 11.13C72.5303 11.61 72.5303 12.39 73.0103 12.87L79.5303 19.39C79.8203 19.68 79.8203 20.16 79.5303 20.45C79.3803 20.59 79.1903 20.67 79.0003 20.67Z" fill="#000000" />
              </svg>
            </button>
          </div>
          <div className=' shadow-xl inset-shadow-xs flex justify-center items-center rounded-full'>
            <button className='right-arrow cursor-pointer hover:opacity-70 transition rounded-full  ' onClick={nextSlide} aria-label="Next slide">
              <svg width="40" height="40" viewBox="-32 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z" fill="#000000" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className='essentials'>
        <div className='w-7xl  mx-auto flex flex-col gap-10 justify-center'>
          <div className='flex flex-col gap-6'>
            <h1 className='text-5xl'>
              Course Essentials
            </h1>
            
            <div className='flex gap-4 '>
              <div className="flex gap-4">
  <span className="px-3 py-2 border rounded-lg bg-vercity text-white">
    {currentCourse?.level?.charAt(0).toUpperCase() +
      currentCourse?.level?.slice(1)}
  </span>
</div>
              {/* <button
              onClick={() => setSelectedLevel("All")}
              className="px-2 py-2 border rounded-lg"
            >
              All
            </button>
              <button
                onClick={() => setSelectedLevel("Beginner")}
                className="px-2 py-2 border rounded-lg"
              >
                Beginner
              </button>

              <button
                onClick={() => setSelectedLevel("Intermediate")}
                className="px-2 py-2 border rounded-lg"
              >
                Intermediate
              </button>

              <button
                onClick={() => setSelectedLevel("Advanced")}
                className="px-2 py-2 border rounded-lg"
              >
                Advanced
              </button> */}

            </div>
          </div>

          <div className='courses '>
            <div className='  shadow-xl inset-shadow-2xs flex rounded-lg overflow-clip'>
              <div className='flex  p-10 w-sm shadow-[5px_0_10px_-3px_rgba(0,0,0,0.1)] '>
                <div className='flex flex-col gap-6 justify-center items-center'>
                  <div className="description p-5 w-75 shadow-lg inset-shadow-2xs rounded-lg flex flex-col gap-2 ">
                    <div style={{ backgroundImage: `url(${vids})` }} className='w-65 h-40 bg-no-repeat bg-size-[300px] bg-center rounded-lg'></div>
                    <h1 className='text-lg font-semibold'>{currentCourse?.title}</h1>
                    <p className='capitalize'> {currentCourse?.level}</p>
                    <p className='font-light text-slate-400'>{currentCourse?.instructorId?.name}</p>
                  </div>
                  <div className="button flex w-75 justify-between items-center">
                    <button className='bg-vercity px-4 py-2 text-white rounded-lg'>Enroll Now</button>
                    <p className='font-bold text-vercity'>₦{currentCourse?.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className='flex w-full pl-12 gap-10 overflow-auto justify-start'>
                {lessons.map((lesson) => (
                  <div key={lesson._id} className='flex flex-col justify-center '>
                    <div style={{ backgroundImage: `url(${vids})` }} className='w-65 h-40 bg-no-repeat bg-size-[300px] bg-center rounded-lg'></div>
                    <div className=''>
                      <h1 className='text-lg font-semibold'>{lesson.title}</h1>
                      <p className='text-slate-400 font-light'>{lesson.order} of {lessons.length} Courses</p>
                    </div>
                  </div>
                ))}




              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="advance h-105 flex justify-center py-10 ">
          <div className='flex flex-col gap-10 w-7/8 m-auto '>
            <div>
              <h1 className='text-2xl text-vercity font-bold'>Explore More Skills</h1>
            </div>
            <div className='grid grid-cols-4 gap-20  '>
              <div className='flex flex-col items-center text-vercity'><h1>Product Design</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Digital Marketing</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Data Analysis</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Product Management</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Web Development</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Mobile Development</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Game Development</h1></div>
              <div className='flex flex-col items-center text-vercity'><h1>Entrepreneurship</h1></div>
            </div>
          </div>
        </div>
        
      </div>

      <Footer />



    </div>

  )


}

