export type EnrolledCourse = {
  _id: string;
  studentId: string;

  courseId: {
    _id: string;
    title: string;
    description?: string;
    instructorId: string;
    thumbnail?: string;
    category?: string;
    level?: string;
    price?: number;
  };

  completedLessonsId: string[];
  progress: number;
  isCompleted: boolean;
  paymentRef: string;
  createdAt: string;
  updatedAt: string;
};


export type Lesson = {
  _id: string;
  title: string;
  duration: number;
  order: number;
  videoUrl: string;
  isPreview: boolean;
};


export type MyCoursesResponse = {
  success: boolean;
  data: EnrolledCourse[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type DashboardStats = {
    level: number;
    xp: number;
    xpGoal: number;
    badges: number;
    streak: number;
};

export type LeaderboardUser = {
    rank: number;
    name: string;
    xp: number;
};

export type DashboardEvent = {
    _id: string;
    month: string;
    day: string;
    title: string;
    startTime: string;
    endTime: string;
};

export type DashboardResponse = {
    success: boolean;

    data: {
        stats: DashboardStats;
        courses: EnrolledCourse[];
        leaderboard: LeaderboardUser[];
        events: DashboardEvent[];
    };
};