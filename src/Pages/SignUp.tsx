import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/Union.svg"

import { Heading } from "../Components/html/Heading"
import { useRef, useState, useEffect } from "react"
import axios from "../api/axios"
import sub from '../assets/Subtract.png'

const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,24}$/;
const REGISTER_ENDPOINTS = ["/auth/register"];

const getErrorStatus = (error: unknown): number | undefined => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { status?: number } }).response;
    return response?.status;
  }

  return undefined;
};

export const SignUp = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);

  }, [pwd, matchPwd])


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const v1 = USER_REGEX.test(user);
  const v2 = PWD_REGEX.test(pwd);

  if (!v1 || !v2) {
    setErrMsg("Invalid Entry");
    return;
  }

  if (pwd !== matchPwd) {
    setErrMsg("Passwords do not match");
    return;
  }

  const payload = {
    email: user,
    password: pwd,
    name: username,
   
  };

  let lastError: unknown = null;

  for (const endpoint of REGISTER_ENDPOINTS) {
    try {
      await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const displayName = user.split("@")[0];
      localStorage.setItem(
        "vercity_user",
        JSON.stringify({ email: user, name: displayName, isAuthenticated: true })
      );

      setSuccess(true);
      setErrMsg("");
      navigate("/Dashboard");
      console.log("Register Successful")
      return;
    } catch (error) {
      lastError = error;

      const status = getErrorStatus(error);
      if (status === 409) {
        setErrMsg("Username Taken");
        return;
      }
    }
  }

  const lastStatus = getErrorStatus(lastError);
  if (lastStatus === 502) {
    setErrMsg("Signup service is currently unavailable. Please try again shortly.");
  } else if (!lastStatus) {
    setErrMsg("No Server Response");
  } else {
    setErrMsg("Registration Failed");
  }

  errRef.current?.focus();
}




  return (
    <>
    {success ? null : (
    
    <section><div className='login-wrapper bg-white flex justify-center items-center h-screen'>
      <div className=' flex justify-around items-center  w-[95%] h-190  '>
        <div className='left flex-1 flex justify-center w-xl h-full '>
          <div className=' form-wrapper mx-auto flex flex-col  gap-18'>
            <Link to="/">
              <div><img src={logo} alt="" className='w-30' /></div>
            </Link>
            <div className=' w-85 flex justify-center '>
              <div className=' max-w-85  flex items-center flex-col gap-10'>



                <div className=''>
                  <Heading style="text-vercity text-[52px] font-semibold" label="create account" />
                </div>


                <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-80 relative'>

                  <div className=' flex flex-col gap-5 '>

                    <p ref={errRef} className={errMsg ? "text-red-500 text-sm mt-1" : "absolute left-2499.75"} role="alert" aria-live="assertive">{errMsg}</p>

                    {/* Username */}

                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder=" "
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="username" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:pb-0 peer-focus:scale-100   '>Username </label>
                    </div>



                    {/* Email */}
                    <div>
                      <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                        <input
                          id="email"
                          type="text"
                          name="email"
                          placeholder=" "
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                          className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                        <label htmlFor="email" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white  origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-90 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Enter Email  <span className={validName ? "absolute translate-x-0.5 peer-focus:-translate-y-6 bg-white  " : "hidden "}><svg width="20" height="20" viewBox="4 10 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z" fill="#3bb143" />
                        </svg>
                        </span>

                          <span className={validName || !user ? "hidden" : "absolute translate-x-0 bg-white peer-focus:-translate-y-12  "}>
                            <svg width="20" height="20" viewBox="4 10 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.0005 16.91C13.8105 16.91 13.6205 16.84 13.4705 16.69L9.51047 12.73C9.22047 12.44 9.22047 11.96 9.51047 11.67C9.80047 11.38 10.2805 11.38 10.5705 11.67L14.5305 15.63C14.8205 15.92 14.8205 16.4 14.5305 16.69C14.3805 16.83 14.1905 16.91 14.0005 16.91Z" fill="#ff8a89" />
                              <path d="M10.0004 16.95C9.81043 16.95 9.62043 16.88 9.47043 16.73C9.18043 16.44 9.18043 15.96 9.47043 15.67L13.4304 11.71C13.7204 11.42 14.2004 11.42 14.4904 11.71C14.7804 12 14.7804 12.48 14.4904 12.77L10.5304 16.73C10.3804 16.88 10.1904 16.95 10.0004 16.95Z" fill="#ff8a89" />


                            </svg>
                          </span>

                        </label>
                      </div><span className="relative"><p id="uidnote" className={userFocus && user && !validName ? "text-xs rounded-lg bg-black text-white p-1 relative bottom-0 mt-4" : "absolute right-249.75"}><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#ffffff" />
                        <path d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z" fill="#ffffff" />
                        <path d="M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z" fill="#ffffff" />
                      </svg>
                        <br />
                        6 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p></span>

                    </div>


                    {/* Password */}
                    <div>
                      <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                        <input
                          id="password"
                          type="password"
                          name="password"                  
                          onChange={(e) => setPwd(e.target.value)}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                          className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                        <label htmlFor="password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white  origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-90 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Enter Password  <span className={validPwd ? "absolute translate-x-0.5 peer-focus:-translate-y-6 bg-white  " : "hidden "}><svg width="20" height="20" viewBox="4 10 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z" fill="#3bb143" />
                        </svg>
                        </span>

                          <span className={validPwd || !pwd ? "hidden" : "absolute translate-x-0 bg-white peer-focus:-translate-y-12  "}>
                            <svg width="20" height="20" viewBox="4 10 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.0005 16.91C13.8105 16.91 13.6205 16.84 13.4705 16.69L9.51047 12.73C9.22047 12.44 9.22047 11.96 9.51047 11.67C9.80047 11.38 10.2805 11.38 10.5705 11.67L14.5305 15.63C14.8205 15.92 14.8205 16.4 14.5305 16.69C14.3805 16.83 14.1905 16.91 14.0005 16.91Z" fill="#ff8a89" />
                              <path d="M10.0004 16.95C9.81043 16.95 9.62043 16.88 9.47043 16.73C9.18043 16.44 9.18043 15.96 9.47043 15.67L13.4304 11.71C13.7204 11.42 14.2004 11.42 14.4904 11.71C14.7804 12 14.7804 12.48 14.4904 12.77L10.5304 16.73C10.3804 16.88 10.1904 16.95 10.0004 16.95Z" fill="#ff8a89" />


                            </svg>
                          </span>

                        </label>
                      </div><span className="relative"><p id="pwdnote" className={pwdFocus &&  !validPwd ? "text-xs rounded-lg bg-black text-white p-1 relative bottom-0 mt-4" : "absolute right-249.75"}><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#ffffff" />
                        <path d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z" fill="#ffffff" />
                        <path d="M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z" fill="#ffffff" />
                      </svg>
                        <br />
                        6 to 24 characters. <br />
                        Must include uppercase and lower case letters, a number and a special character. <br />
                        Allowed special characters: 
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                      </p></span>

                    </div>




                    {/* Confirm Password */}
                    <div className='  relative flex justify-center items-center border border-gray-200  rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                      <input
                        id="confirm_pwd"
                        type="Password"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer " />
                      <label htmlFor="confirm_pwd" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white  origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-90 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6  peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Confirm Password

                        <span className={validMatch && matchPwd ? "absolute  peer-focus:-translate-x-5 peer-focus:-translate-y-6 bg-white  " : "hidden "}><svg width="20" height="20" viewBox="4 12 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z" fill="#3bb143" />
                        </svg>
                        </span>

                        <span className={validMatch || !matchPwd ? "hidden" : "absolute  bg-white peer-focus:-translate-y-2 translate-y-0.5 peer-focus:-translate-x-10   "}>
                          <svg width="20" height="20" viewBox="7 12 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0005 16.91C13.8105 16.91 13.6205 16.84 13.4705 16.69L9.51047 12.73C9.22047 12.44 9.22047 11.96 9.51047 11.67C9.80047 11.38 10.2805 11.38 10.5705 11.67L14.5305 15.63C14.8205 15.92 14.8205 16.4 14.5305 16.69C14.3805 16.83 14.1905 16.91 14.0005 16.91Z" fill="#ff8a89" />
                            <path d="M10.0004 16.95C9.81043 16.95 9.62043 16.88 9.47043 16.73C9.18043 16.44 9.18043 15.96 9.47043 15.67L13.4304 11.71C13.7204 11.42 14.2004 11.42 14.4904 11.71C14.7804 12 14.7804 12.48 14.4904 12.77L10.5304 16.73C10.3804 16.88 10.1904 16.95 10.0004 16.95Z" fill="#ff8a89" />


                          </svg>
                        </span>

                      </label>






                    </div>
                    <span className="relative"><p id="confirmnote" className={matchFocus && !validMatch ? "text-xs rounded-lg bg-black text-white p-1 relative bottom-0 mt-4" : "absolute right-249.75"}><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#ffffff" />
                      <path d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z" fill="#ffffff" />
                      <path d="M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z" fill="#ffffff" />
                    </svg> Must match the first password input field.
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p></span>

                  </div>

                  <button type="submit" className=' bg-vercity text-white px-2 rounded-xl py-1 active:bg-vercity/90'>Sign Up</button>
                </form>

                <p className="text-center">Already registered? <br />
                <span><Link to="/Login">
                <button  className="underline decoration-1 text-vercity">Sign in</button>
                </Link></span></p>



              </div>
            </div>
          </div>



        </div>
        <div className=' hidden h-full w-2xl rounded-2xl flex-1 lg:flex flex-col justify-center items-center '>
          <div className=' overflow-hidden  rounded-2xl mx-w-xl'><img src={sub} alt="" className=' w-2xl -translate-y-25 ' /></div>
        </div>
      </div>
    </div></section>
    )}
    </>
  )
}
