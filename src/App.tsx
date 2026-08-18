import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import { SignUp } from './Pages/SignUp'
import { Home } from './Pages/Home'
import { Course } from './Pages/Course'
import { Teach } from './Pages/Teach'
import { OnboardOne } from './Pages/OnboardOne'
import { Rooms } from './Pages/Rooms'
import { ScrollToTop } from './Components/ScrollToTop'
import RequireAuth from './Components/RequireAuth'
import { ForgotPassword } from './Pages/ForgotPassword'
import { VerifyOTP } from './Pages/VerifyOTP'
import { DashboardLayout } from './Pages/Dash/components/DashboardLayout'
import { MyCourses } from './Pages/MyCourses'
import { Certifications } from './Pages/Certifications'
import { Assignments } from './Pages/Assignments'
import { Courses } from './Pages/Courses'
import { ResetPassword } from './Pages/ResetPassword'
import { Checkout } from './Pages/Checkout'
import { PaymentCallback } from './Pages/PaymentCallback'
import { PaymentVerify } from "./Pages/PaymentVerify";
import { Cart } from './Pages/Cart'
import { Dashboard } from './Pages/Dash/Dashboard'
import QuizHome from './Features/quizzes/QuizHome'
import QuizPage from './Features/quizzes/QuizPage'
import QuizResult from './Features/quizzes/QuizResult'
import AILearningAssistant from './Features/quizzes/ai/AI_Learning_Assistant'
import { VerifySignUpOTP } from './Pages/VerifySignUpOTP'
import { ProfilePicture } from './Pages/ProfilePicture'
import { InstructorDashboard } from './Pages/InstructorDashboard'
import { PasswordSettings } from './Pages/PasswordSettings'




function App() {




  return (

    <Router>
      <ScrollToTop />
      <Routes>

        {/*Public Pages*/}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/VerifyOTP' element={<VerifyOTP />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path="/VerifySignUpOTP" element={<VerifySignUpOTP />} />



        {/*Course browsing */}
        <Route path='/courses' element={<Courses />} />
        <Route path='/Course/:courseId' element={<Course />} />


        <Route path="/Checkout/:courseId" element={<Checkout />} />

        <Route path="/payment/callback" element={<PaymentCallback />} />
        <Route path="/payment/verify" element={<PaymentVerify />} />




        {/*Protected Pages*/}


        <Route element={<RequireAuth />}>
          <Route path='/Cart' element={<Cart />} />


          <Route path="/Dashboard" element={<DashboardLayout />}>

            <Route
              path="/Dashboard/ai"
              element={<AILearningAssistant />}
            />

            <Route index element={<Dashboard />} />

            <Route
              path="courses"
              element={<MyCourses />}
            />

            <Route
              path="certifications"
              element={<Certifications />}
            />

            <Route
              path="assignments"
              element={<Assignments />}
            />


          </Route>

          <Route
    path="/Dashboard/profile-pic"
    element={<ProfilePicture />}
/>

<Route
    path="/Dashboard/instructor"
    element={<InstructorDashboard />}
/>

<Route
    path="/Dashboard/password-settings"
    element={<PasswordSettings />}
/>




          <Route path="/Dashboard/quizzes/:courseId" element={<QuizHome />} />

          <Route
            path="/Dashboard/quizzes/:courseId/:quizId"
            element={<QuizPage />}
          />

          <Route
            path="/Dashboard/quizzes/:courseId/:quizId/result"
            element={<QuizResult />}
          />

      

          <Route path='/Teach' element={<Teach />} />
          <Route path='/onboardOne' element={<OnboardOne />} />
          <Route path="/Rooms/:courseId" element={<Rooms />} />

          <Route path="/Rooms/:courseId/:lessonId" element={<Rooms />} />
        </Route>

      </Routes>

    </Router>





  )
}

export default App
