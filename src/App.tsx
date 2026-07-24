import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import { SignUp } from './Pages/SignUp'
import { Home } from './Pages/Home'
import { Dashboard } from './Pages/Dashboard'
import { Course } from './Pages/Course'
import { Teach } from './Pages/Teach'
import { OnboardOne } from './Pages/OnboardOne'
import { Rooms } from './Pages/Rooms'
import { ScrollToTop } from './Components/ScrollToTop'
import RequireAuth from './Components/RequireAuth'

function App() {




  return (

    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path='/Course/:courseId' element={<Course />} />

        <Route element={<RequireAuth />}>
          
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path='/Teach' element={<Teach />} />
          <Route path='/onboardOne' element={<OnboardOne />} />
          <Route path='/Rooms/:courseId' element={<Rooms />} />

        </Route>

      </Routes>

    </Router>





  )
}

export default App
