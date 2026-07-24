import { useMemo, useEffect, } from 'react'
import { Nav } from '../Components/html/Nav'
import { useState, useContext } from 'react'
import { DashCarousel } from '../Components/html/DashCarousel'
// import useAuth from '../hooks/useAuth'
import web from '../assets/image20.png'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider'
import AIButton from '../Components/AI/AIButton'
import AIChat from '../Components/AI/AIChat'


type EnrolledCourse = {
  _id: string;
  title: string;
  thumbnail: string;
  category: string;
};

type ChatMessage = {
  role: "ai" | "user";
  sender: string;
  text: string;
}

type Quiz = {
  question: string;
  answer: string;
  explanation: string;
};

const dataImg = web


export const Dashboard = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  // const { auth } = useAuth();
  

  console.log(auth);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const rawName = auth?.user?.split("@")[0] || "user";
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  // const userName = useMemo(() => {
  //   if (typeof window === 'undefined') return 'User'

  //   const savedUser = localStorage.getItem('vercity_user')
  //   if (!savedUser) return 'User'

  //   try {
  //     const parsedUser = JSON.parse(savedUser)
  //     return parsedUser.name || parsedUser.email || 'User'
  //   } catch {
  //     return 'User'
  //   }
  // }, [])

  const [enrolledCount, setEnrolledCount] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);


  const handleEnrollment = async (courseId: string) => {
    try {
      const response = await axiosPrivate.post("/student/enroll", { courseId, });
      const user = response.data.data;
      console.log(user.enrolledCoursesId);
      console.log("Course ID being sent: ", courseId);
      console.log('response', response.data);
      setEnrolledCourses(user.enrolledCoursesId);
      setEnrolledCount(user.enrolledCoursesId.length);

    } catch (err) {
      console.error(err);
    }



  };

  

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/auth/me");
        const user = response.data.data;

setEnrolledCourses(user.enrolledCoursesId);
        setEnrolledCount(user.enrolledCoursesId.length);
        // setIsEnrolled(user.enrolledCoursesId.length > 0)


      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [axiosPrivate]);

  
  // if (!isEnrolled) {

  // } else {
  //   setEnrolledCount(prev => prev - 1);
  //   setIsEnrolled(false);
  // }

  //  }


  const [openCourseId, setOpenCourseId] = useState<string | null>(null)

  
  

  const [activeTab, setActiveTab] = useState('courses')

  

  const uniqueCourses = enrolledCourses.filter(
    (course, index, self) =>
        index === self.findIndex(c => c._id === course._id)
);

const enrolledCourseIds = useMemo(
    () => uniqueCourses.map(course => course._id), [uniqueCourses]
  );

  

const [open, setOpen] = useState(false);


const [messages, setMessages] = useState<ChatMessage[]>([
  {
    role: "ai",
    sender: "Merry",
    text: `👋 Hi ${userName}!

I'm Merry, your AI learning mentor.

I can help you:
• Explain lessons
• Quiz you
• Summarize topics
• Recommend what to study next

Try asking:
"Explain React"
"Quiz me"
"Summarize this lesson"`
  }
]);

const [message, setMessage] = useState("");

const sendMessage = async () => {
  if (!message.trim()) return;

  const question = message;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      sender: userName,
      text: question,
    },
  ]);

  setMessage("");

  await new Promise((resolve) => setTimeout(resolve, 800));

  const reply = askAI(question);

  setMessages((prev) => [
    ...prev,
    { 
      role: "ai",
      sender: "Merry",
      text: reply,
    },
  ]);
};

const quizzes: Record<"mvp" |"react"| "agile", Quiz> = {
  mvp: {
    question: `🎯 Product Management Quiz

What does MVP stand for?

A. Most Valuable Product
B. Minimum Viable Product
C. Minimum Verified Plan
D. Managed Value Process`,
    answer: "b",
    explanation:
      "✅ Correct!\n\nMinimum Viable Product (MVP) is the simplest version of a product that delivers value and helps you validate assumptions with real users.",
  },

  agile: {
    question: `Which methodology emphasizes iterative development?

A. Waterfall
B. Agile
C. Spiral
D. Lean`,
    answer: "b",
    explanation:
      "✅ Correct! Agile focuses on iterative development and continuous feedback.",
  },

  react: {
  question: `⚛️ React Quiz

Which hook is used to manage component state?

A. useEffect
B. useState
C. useMemo
D. useContext`,
  answer: "b",
  explanation:
    "✅ Correct!\n\nuseState is the React hook used to create and update state inside functional components.",
},
};

const [currentQuiz, setCurrentQuiz] = useState<keyof typeof quizzes | null>(null);

const responses: Record<string, string> = {
  react:
    "React is a JavaScript library for building fast and interactive user interfaces using reusable components.",

  hooks:
    "Hooks let functional components use state and lifecycle features without writing classes.",

  javascript:
    "JavaScript powers interactive websites and web applications.",

  css:
    "CSS controls layout, spacing, colors and animations.",

  html:
    "HTML provides the structure of every webpage.",


  summary:
    "This lesson introduces the core concepts and prepares you for the next topic.",

useeffect:
  "useEffect lets you perform side effects such as fetching data, updating the document title, or subscribing to events.",

usememo:
  "useMemo memoizes expensive calculations so they only run when dependencies change.",

usecontext:
  "useContext lets you access values from a React Context without passing props manually.",

props:
  "Props are inputs passed from a parent component to a child component.",

state:
  "State is data managed inside a component that can change over time.",

  next:
    "Based on your progress, I recommend completing this lesson before moving to the next module.",

  default:
    "I'm Merry 😊. I can explain lessons, summarize topics, create quizzes, and answer questions about your course.",

    // Product Management
  product:
    "Product Management is the practice of identifying customer problems and working with design, engineering, and business teams to build solutions that deliver value.",

  "product manager":
    "A Product Manager defines the product vision, prioritizes features, collaborates with stakeholders, and ensures the product solves real customer problems.",

  roadmap:
    "A product roadmap is a strategic plan that outlines the vision, priorities, and timeline for delivering product features and improvements.",

  mvp:
    "An MVP (Minimum Viable Product) is the simplest version of a product that provides value to users while allowing you to validate assumptions quickly.",

  sprint:
    "A sprint is a fixed period, usually one or two weeks, during which a development team completes a set of planned work.",

  agile:
    "Agile is a product development approach that emphasizes collaboration, continuous feedback, and iterative delivery.",

  scrum:
    "Scrum is an Agile framework that organizes work into sprints with defined roles such as Product Owner, Scrum Master, and Developers.",

  backlog:
    "A product backlog is a prioritized list of features, improvements, and bug fixes that the team plans to work on.",

  stakeholder:
    "Stakeholders are individuals or groups with an interest in the product, including customers, executives, investors, designers, and engineers.",

  prioritization:
    "Product Managers prioritize features using frameworks like RICE, MoSCoW, and Value vs. Effort.",

  userstory:
    "A user story describes a feature from the user's perspective, for example: 'As a student, I want to bookmark lessons so I can revisit them later.'",

  persona:
    "A user persona is a fictional representation of your ideal customer based on research and real user behavior.",

  kpi:
    "KPIs (Key Performance Indicators) measure how well a product is performing. Examples include retention rate, daily active users, and conversion rate.",

  metric:
    "Product metrics help teams understand user engagement, satisfaction, growth, and business performance.",

  

};



const askAI = (question: string) => {
  
  const text = question.toLowerCase();


  //Quiz answers
if (currentQuiz) {
    const quiz = quizzes[currentQuiz];

    setCurrentQuiz(null);

    const answer = text.trim().toLowerCase();

    if (
        answer === quiz.answer ||
        answer === `${quiz.answer}.`
    ) {
        return quiz.explanation;
    }

    return `❌ Incorrect.

The correct answer is ${quiz.answer.toUpperCase()}.`;
}

if (text.includes("mvp quiz")) {
    setCurrentQuiz("mvp");
    return quizzes.mvp.question;
}

if (text.includes("agile quiz")) {
    setCurrentQuiz("agile");
    return quizzes.agile.question;
}

if (text.includes("react quiz")) {
    setCurrentQuiz("react");
    return quizzes.react.question;
}

if (text.includes("product quiz")) {
    setCurrentQuiz("mvp");
    return quizzes.mvp.question;
}

if (text.includes("quiz")) {
    setCurrentQuiz("react");
    return quizzes.react.question;
}


//Normal explanations

  
if (text.includes("useeffect")) return responses.useeffect;
if (text.includes("usememo")) return responses.usememo;
if (text.includes("usecontext")) return responses.usecontext;
if (text.includes("props")) return responses.props;
if (text.includes("state")) return responses.state;
  if (text.includes("react")) return responses.react;
  if (text.includes("hook")) return responses.hooks;
  if (text.includes("javascript")) return responses.javascript;
  if (text.includes("css")) return responses.css;
  if (text.includes("html")) return responses.html;
  
  if (text.includes("summary")) return responses.summary;
  if (text.includes("next")) return responses.next;


  if (text.includes("product manager")) return responses["product manager"];
  if (text.includes("product management")) return responses.product;
  if (text.includes("roadmap")) return responses.roadmap;
  if (text.includes("mvp")) return responses.mvp;
  if (text.includes("agile")) return responses.agile;
  if (text.includes("scrum")) return responses.scrum;
  if (text.includes("sprint")) return responses.sprint;
  if (text.includes("backlog")) return responses.backlog;
  if (text.includes("stakeholder")) return responses.stakeholder;
  if (text.includes("priorit")) return responses.prioritization;
  if (text.includes("user story")) return responses.userstory;
  if (text.includes("persona")) return responses.persona;
  if (text.includes("kpi")) return responses.kpi;
  if (text.includes("metric")) return responses.metric;


if (text.includes("interview"))
  return "Here are three common Product Manager interview questions:\n\n1. Tell me about a product you admire.\n2. How would you prioritize competing features?\n3. How do you measure product success?";

if (text.includes("career"))
  return "To become a Product Manager, learn customer discovery, Agile, roadmapping, prioritization frameworks, analytics, and communication. Building products is the fastest way to gain experience.";

if (text.includes("rice"))
  return "RICE stands for Reach, Impact, Confidence, and Effort. It helps Product Managers prioritize features objectively.";

if (text.includes("moscow"))
  return "MoSCoW prioritization categorizes features into Must Have, Should Have, Could Have, and Won't Have.";




  return responses.default;
};



  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
        <div>
          {enrolledCount === 0 ? (
            <DashCarousel enroll={handleEnrollment} enrolledCourses={enrolledCourseIds} thumb={dataImg} />) 
            : (
             <> 
            {uniqueCourses.map(course => (<section className='course-tracker' key={course._id}>
              <div className='mb-10 progress-wrapper'>
                <div className='course-wrapper'>
                  <div  onClick={() => setOpenCourseId(openCourseId === course._id ? null : course._id)} className='flex justify-between p-4 my-4 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer items-center' id="course1">
                    <h1>{course.title}</h1>
                    {openCourseId === course._id ? (<div><svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5875 8.595C16.3975 8.595 16.2075 8.525 16.0575 8.375L9.5375 1.855C9.0575 1.375 8.2775 1.375 7.7975 1.855L1.2775 8.375C0.9875 8.665 0.5075 8.665 0.2175 8.375C-0.0725 8.085 -0.0725 7.605 0.2175 7.315L6.7375 0.795C7.7975 -0.265 9.5275 -0.265 10.5975 0.795L17.1175 7.315C17.4075 7.605 17.4075 8.085 17.1175 8.375C16.9675 8.515 16.7775 8.595 16.5875 8.595Z" fill="#292D32" />
                        </svg>
                    </div>) :
                      (<div><svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.6675 8.5975C7.9675 8.5975 7.2675 8.3275 6.7375 7.7975L0.2175 1.2775C-0.0725 0.987499 -0.0725 0.5075 0.2175 0.2175C0.5075 -0.0725 0.9875 -0.0725 1.2775 0.2175L7.7975 6.7375C8.2775 7.2175 9.0575 7.2175 9.5375 6.7375L16.0575 0.2175C16.3475 -0.0725 16.8275 -0.0725 17.1175 0.2175C17.4075 0.5075 17.4075 0.987499 17.1175 1.2775L10.5975 7.7975C10.0675 8.3275 9.3675 8.5975 8.6675 8.5975Z" fill="#292D32" />
                            </svg>
                      </div>)}
                  </div>


                  {openCourseId === course._id && (<div className={openCourseId ? 'relative p-4 border rounded-lg flex flex-col gap-6' : 'hidden'}>
                    <h1 className='font-medium text-lg'>{course.title}</h1>
                    <p className='-mt-4 text-gray-400'>1 of 6 Courses. 50% complete </p>
                    <div className='w-12/12 '><hr className='border-8 border-gray-100  rounded-lg' />
                      <hr className='absolute -translate-y-4 w-1/15 border-8 border-vercity  rounded-lg' /></div>
                    <div> 
                    <button onClick={() => navigate(`/Rooms/${course._id}`)} className='bg-vercity text-white px-4 py-2 float-end rounded-lg'>Resume</button></div>
                  </div>
                  )}
                </div>
              </div> 
              
            </section> ))}
            <DashCarousel enroll={handleEnrollment} enrolledCourses={enrolledCourseIds} thumb={dataImg} />
        </>
        )}
        </div>
        );


      case 'certificates':
        return (<div><ul>Certificates</ul></div>)

      default: return null;
    }
  };
 


  return (
    <div>
      <Nav />
      <section className='w-full max-w-screen-2xl p-6 lg:p-6 lg:mx-auto' >
        <div className="section-wrapper max-w-md lg:max-w-7xl   m-auto">
          <div>
            <h1 className='text-[32px] py-4 '>{greeting}, {userName} !</h1>
          </div>

          <div className='flex gap-6 lg:gap-102 px-4 lg:justify-evenly pt-6 pb-4 border-b'>
            <div onClick={() => { setActiveTab('courses') }} className={activeTab === "courses" ? ' bg-vercity text-white cursor-pointer active:bg-gray-100 rounded-xl py-2 w-full' : 'bg-vercity/40 cursor-pointer active:bg-gray-100 rounded-xl py-2 w-full'}>
              <div className='  flex flex-col items-center'>
                <h2 className='text[20px]'>Enrolled</h2>
                <p className='text-[36px]'>{enrolledCount}</p>

              </div>
            </div>

            <div onClick={() => { setActiveTab('certificates') }} className={activeTab === "certificates" ? ' bg-green-700 text-white cursor-pointer active:bg-gray-100 rounded-xl py-2 w-full' : ' bg-green-100 cursor-pointer active:bg-gray-100 rounded-xl py-2 w-full'}>
              <div className='  flex flex-col items-center'>
                <h2 className='text[20px]'>Certificates</h2>
                <p className='text-[36px]'>0</p>

              </div>
            </div>
          </div>

          <div>
            {renderContent()}
          </div>

        </div>


      </section>

{auth.accessToken && (
  <>
    <AIButton onClick={() => setOpen(true)} />

    {open && (
      <AIChat onClose={() => setOpen(false)}
      messages = {messages}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage} />
    )}
  </>
)}
    </div>
  )
}
