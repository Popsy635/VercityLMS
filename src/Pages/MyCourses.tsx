import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type Course = {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  level?: string;
};

type Enrollment = {
  _id: string;
  studentId: string;
  courseId: Course;
  completedLessonsId: string[];
  progress: number;
};

export const MyCourses = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

const [courses, setCourses] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosPrivate.get("/student/mycourses");

       const enrollments = response.data.data;

console.log("Enrollments:", enrollments);

setCourses(enrollments || []);

      } catch (err) {
        console.error(err);
        setError("Unable to load your courses.");
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [axiosPrivate]);

const uniqueCourses = useMemo(() => {
  return courses.filter(
    (enrollment, index, self) =>
      index ===
      self.findIndex(
        (item) => item.courseId._id === enrollment.courseId._id
      )
  );
}, [courses]);

  // Loading state
  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-vercity">
          My Courses
        </h1>

        <p className="mt-4 text-gray-500">
          Loading your courses...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-vercity">
          My Courses
        </h1>

        <p className="mt-4 text-red-500">
          {error}
        </p>
      </section>
    );
  }

  return (
  <section className="mx-auto max-w-7xl px-6 py-10">

    {/* Page heading */}
    <div className="mb-10">
      <h1 className="text-3xl font-semibold text-vercity">
        My Courses
      </h1>

      <p className="mt-2 text-gray-500">
        Continue learning and keep building your skills.
      </p>

      {/* Number of courses */}
      <p className="mt-4 text-sm font-medium text-gray-400">
        {uniqueCourses.length}{" "}
        {uniqueCourses.length === 1 ? "course" : "courses"} enrolled
      </p>
    </div>


    {/* Empty state */}
    {uniqueCourses.length === 0 ? (

      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

        <h2 className="text-xl font-semibold text-gray-800">
          You haven't enrolled in any courses yet.
        </h2>

        <p className="mt-2 text-gray-500">
          Explore our courses and start learning today.
        </p>

        <button
          onClick={() => navigate("/courses")}
          className="
            mt-6
            rounded-lg
            bg-vercity
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          Explore Courses
        </button>

      </div>

    ) : (

      /* Courses */
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">

  {uniqueCourses.map((enrollment) => {

    const course = enrollment.courseId;
    const progress = enrollment.progress ?? 0;

    return (
      <article
        key={enrollment._id}
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
        "
      >

        {/* Thumbnail */}
        <div className="relative h-52 overflow-hidden bg-gray-100">

          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="
              flex
              h-full
              items-center
              justify-center
              bg-vercity/10
              text-vercity
            ">
              <span className="text-sm font-medium">
                Course Image
              </span>
            </div>
          )}

          {/* Category */}
          {course.category && (
            <div className="absolute left-4 top-4">
              <span className="
                rounded-full
                bg-white/95
                px-3
                py-1
                text-xs
                font-semibold
                text-vercity
                shadow-sm
              ">
                {course.category}
              </span>
            </div>
          )}

        </div>


        {/* Course information */}
        <div className="flex min-h-64 flex-col p-5">

          {/* Level */}
          {course.level && (
            <p className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-gray-400
            ">
              {course.level}
            </p>
          )}


          {/* Title */}
          <h2 className="
            mt-2
            line-clamp-2
            text-xl
            font-semibold
            leading-7
            text-gray-900
          ">
            {course.title}
          </h2>


          {/* Description */}
          {course.description && (
            <p className="
              mt-3
              line-clamp-2
              text-sm
              leading-6
              text-gray-500
            ">
              {course.description}
            </p>
          )}


          {/* Progress */}
          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-sm text-gray-500">
                Your progress
              </span>

              <span className="text-sm font-semibold text-vercity">
                {progress}%
              </span>

            </div>


            <div className="h-2 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-vercity transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>


          {/* Button */}
          <div className="mt-auto pt-6">

            <button
              onClick={() =>
                navigate(`/Rooms/${course._id}`)
              }
              className="
                w-full
                rounded-lg
                bg-vercity
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                transition
                duration-200
                hover:bg-vercity/90
              "
            >
              {progress > 0
                ? "Continue Learning"
                : "Start Learning"}
            </button>

          </div>

        </div>

      </article>
    );
  })}

</div>

    )}

  </section>
);
};