import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Nav } from "../Components/html/Nav";
import { Footer } from "../Components/html/Footer";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import thum from "../assets/image20.png";
import vids from "../assets/vidthumb.png";


type Lesson = {
  _id: string;
  title: string;
  duration: number;
  order: number;
  videoUrl: string;
  isPreview: boolean;
};


type CourseType = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string;
  level: string;
  price: number;

  instructorId?: {
    _id: string;
    name: string;
  };
};


export const Course = () => {

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { courseId } = useParams();

const [course, setCourse] = useState<CourseType | null>(null);
const [loadingCourse, setLoadingCourse] = useState(true);
const [courseError, setCourseError] = useState("");


  /*
   * The catalogue already fetched the course.
   * We receive that course through React Router state.
   */



  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [lessonError, setLessonError] = useState("");


  useEffect(() => {

  if (!courseId) {
    setCourseError("Course ID was not provided.");
    setLoadingCourse(false);
    return;
  }

  const fetchCourse = async () => {

    try {

      setLoadingCourse(true);
      setCourseError("");

      const response = await axios.get(
        `/courses/${courseId}`
      );

      console.log("COURSE DETAILS:", response.data);

      setCourse(response.data?.data);

    } catch (error: any) {

      console.error("COURSE ERROR:", error);

      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);

      setCourseError(
        error?.response?.data?.message ||
        "Unable to load course."
      );

    } finally {

      setLoadingCourse(false);

    }

  };

  fetchCourse();

}, [courseId]);


  /*
   * Fetch lessons for this course
   */
  useEffect(() => {

    if (!courseId) {
      setLoadingLessons(false);
      return;
    }


    const fetchLessons = async () => {

      try {

        setLoadingLessons(true);
        setLessonError("");

        const response = await axios.get(
          `/courses/${courseId}/lessons`
        );


        console.log("LESSONS RESPONSE:", response.data);


        setLessons(response.data?.data || []);

      } catch (error: any) {
        console.error("LESSON ERROR:", error);

        console.log("STATUS:", error?.response?.status);
        console.log("DATA:", error?.response?.data);
        console.log("URL:", error?.config?.url);
        console.log("BASE URL:", error?.config?.baseURL);
        console.log("HEADERS:", error?.config?.headers);

        setLessonError(
          `Unable to load lessons (${error?.response?.status || "network error"})`
        );
      } finally {

        setLoadingLessons(false);

      }

    };


    fetchLessons();

  }, [courseId]);

  
  /*
  * Course doesn't exist in navigation state
  */
 if (loadingCourse) {
   
   return (
     <div className="flex min-h-screen items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-vercity" />

        <p className="mt-5 text-gray-500">
          Loading course...
        </p>

      </div>

    </div>
  );
  
}

if (courseError || !course) {
  
  return (
    <div className="min-h-screen flex flex-col">

      <Nav />

      <main className="flex flex-1 items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-semibold text-vercity">
            Course not found
          </h1>

          <p className="mt-3 text-gray-500">
            {courseError || "We couldn't find this course."}
          </p>

          <button
            onClick={() => navigate("/Courses")}
            className="mt-6 rounded-lg bg-vercity px-6 py-3 text-white"
            >
            Back to Courses
          </button>

        </div>

      </main>

      <Footer />

    </div>
  );
  
}

const handleEnroll = async () => {

  if (course.price === 0) {

    try {

      await axiosPrivate.post("/student/enroll", {
        courseId: course._id,
      });

      navigate(`/Rooms/${course._id}`);

    } catch (error: any) {

      console.error("ENROLLMENT ERROR:", error);

      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);

    }

    return;
  }

  // Paid course
  navigate(`/Checkout/${course._id}`, {
    state: {
      course,
    },
  });
};


  return (

    <div className="min-h-screen">

      <Nav />


      {/* ================= HERO ================= */}

      <section className="py-10">

        <div className="mx-auto w-full max-w-7xl px-6">

          <div className="flex overflow-hidden rounded-2xl shadow-xl">

            {/* TEXT */}

            <div className="flex flex-1 flex-col justify-center gap-8 p-12">

              <h1 className="text-5xl font-medium text-vercity lg:text-6xl">
                {course.title}
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                {course.description}
              </p>

            </div>


            {/* IMAGE */}

            <div
              style={{
                backgroundImage: `url(${course.thumbnail || thum})`,
              }}
              className="hidden h-120 w-120 shrink-0 bg-cover bg-center bg-no-repeat lg:block"
            />

          </div>

        </div>

      </section>



      {/* ================= COURSE ESSENTIALS ================= */}

      <section className="py-12">

        <div className="mx-auto w-full max-w-7xl px-6">

          <div className="flex flex-col gap-8">


            <h2 className="text-4xl font-medium lg:text-5xl">
              Course Essentials
            </h2>


            {/* COURSE LEVEL */}

            <div>

              <span className="rounded-lg border bg-vercity px-4 py-2 text-white capitalize">
                {course.level}
              </span>

            </div>



            {/* ================= COURSE CONTENT ================= */}

            <div className="overflow-hidden rounded-2xl shadow-xl">


              <div className="flex flex-col lg:flex-row">


                {/* ================= COURSE INFO ================= */}

                <div className="w-full shrink-0 p-8 lg:w-96">

                  <div className="flex flex-col gap-6">


                    {/* COURSE CARD */}

                    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm">


                      <div
                        style={{
                          backgroundImage: `url(${course.thumbnail || vids
                            })`,
                        }}
                        className="h-40 w-full rounded-xl bg-cover bg-center"
                      />


                      <h3 className="mt-4 text-lg font-semibold">
                        {course.title}
                      </h3>


                      <p className="mt-2 text-sm text-gray-500">
                        Learn {course.category} in this course.
                      </p>


                      <p className="mt-3 text-sm text-gray-400">
                        Prof. {course.instructorId?.name || "Instructor"}
                      </p>

                    </div>



                    {/* ENROLL */}

                    <div className="flex items-center justify-between">

                      <button
                        type="button"
                        onClick={handleEnroll}
                        className="rounded-lg bg-vercity px-5 py-2.5 text-white transition hover:opacity-90"
                      >
                        Enroll Now
                      </button>


                      <p className="font-bold text-vercity">

                        {course.price === 0
                          ? "Free"
                          : `₦${course.price.toLocaleString()}`}

                      </p>

                    </div>

                  </div>

                </div>



                {/* ================= LESSONS ================= */}

                <div className="min-w-0 flex-1 p-8">


                  {loadingLessons && (

                    <div className="flex h-full min-h-60 items-center justify-center">

                      <p className="text-gray-400">
                        Loading lessons...
                      </p>

                    </div>

                  )}


                  {!loadingLessons && lessonError && (

                    <div className="flex h-full min-h-60 items-center justify-center">

                      <div className="text-center">

                        <p className="text-lg font-medium text-gray-700">
                          Course preview
                        </p>

                        <p className="mt-2 text-sm text-gray-400">
                          Enroll in this course to access the lessons.
                        </p>

                      </div>

                    </div>

                  )}


                  {!loadingLessons &&
                    !lessonError &&
                    lessons.length === 0 && (

                      <div className="flex h-full min-h-60 items-center justify-center">

                        <p className="text-gray-400">
                          No lessons available for this course yet.
                        </p>

                      </div>

                    )}


                  {!loadingLessons &&
                    !lessonError &&
                    lessons.length > 0 && (

                      <div className="flex gap-8 overflow-x-auto pb-4">

                        {lessons.map((lesson, index) => (

                          <div
                            key={lesson._id}
                            className="w-65 shrink-0"
                          >

                            {/* VIDEO THUMBNAIL */}

                            <div
                              style={{
                                backgroundImage: `url(${vids})`,
                              }}
                              className="h-40 w-65 rounded-xl bg-cover bg-center"
                            />


                            {/* LESSON TITLE */}

                            <h3 className="mt-4 text-lg font-semibold">
                              {lesson.title}
                            </h3>


                            {/* LESSON NUMBER */}

                            <p className="mt-2 text-sm text-gray-400">

                              {index + 1} of {lessons.length} Lessons

                            </p>

                          </div>

                        ))}

                      </div>

                    )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= EXPLORE MORE ================= */}

      <section className="py-16">

        <div className="mx-auto w-full max-w-7xl px-6">

          <h2 className="mb-10 text-2xl font-bold text-vercity">
            Explore More Skills
          </h2>


          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

            {[
              "Product Design",
              "Digital Marketing",
              "Data Analysis",
              "Product Management",
              "Web Development",
              "Mobile Development",
              "Game Development",
              "Entrepreneurship",
            ].map((skill) => (

              <div
                key={skill}
                className="text-vercity"
              >
                {skill}
              </div>

            ))}

          </div>

        </div>

      </section>



      <Footer />

    </div>

  );

};