export type Course = {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string | null;
    category?: string;
    level?: string;
    price?: number;
    instructorId?: {
        _id?: string;
        name?: string;
    };
};

// type Enrollment = {
//   _id: string;
//   studentId: string;
//   courseId: Course;
//   completedLessonsId: string[];
//   progress: number;
// };