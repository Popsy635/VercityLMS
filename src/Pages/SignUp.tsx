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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success ] = useState(false);

  const [loading, setLoading] = useState(false);
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
    // console.log(result);
    // console.log(pwd);
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

    setLoading(true);
    setErrMsg("");

    let lastError: unknown = null;

    try {
      for (const endpoint of REGISTER_ENDPOINTS) {
        try {
          await axios.post(endpoint, payload, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          console.log("Registration successful. OTP sent.");

          navigate("/VerifySignUpOTP", {
            state: {
              email: user,
            },
          });

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
        setErrMsg(
          "Signup service is currently unavailable. Please try again shortly."
        );
      } else if (!lastStatus) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }

      errRef.current?.focus();

    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      {success ? null : (

        <section className="login-wrapper bg-white flex justify-center items-center min-h-screen">
          <div className="mx-auto flex w-full max-w-7xl min-h-screen items-center px-6 lg:px-12">

            <div className="left w-full lg:w-1/2 min-h-screen flex justify-center items-center">
              <div className="form-wrapper w-full max-w-lg flex flex-col gap-16">
                <Link to="/">
                  <div><img src={logo} alt="" className='w-30 ml-8' /></div>
                </Link>

                <div className="w-full flex justify-center">
                  <div className="w-full max-w-md flex flex-col gap-10">



                    <div className=''>
                      <Heading style="text-vercity text-[52px] font-semibold" label="create account" />
                      <p className="text-[18px]">
                        Already registered?{" "}
                        <Link to="/Login">
                          <span className="text-[18px] text-vercity">
                            Sign In </span>
                        </Link>
                      </p>
                    </div>


                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-80 relative'>

                      <div className=' flex flex-col gap-5 '>

                        <p ref={errRef} className={errMsg ? "text-red-500 text-sm mt-1" : "sr-only"} role="alert" aria-live="assertive">{errMsg}</p>

                        {/* Username */}

                        <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                          <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder=" "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="py-2 pr-3 pl-3 rounded-xl absolute w-full h-full focus:outline-2 focus:outline-offset-2 focus:outline-vercity bg-transparent peer" />
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
                          </div><span className="relative"><p id="uidnote" className={userFocus && user && !validName ? "text-xs rounded-lg bg-black text-white p-1 relative bottom-0 mt-4" : "sr-only"}><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
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
                              type={showPassword ? "text" : "password"}
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
                            <button
                              type="button"
                              onClick={() => setShowPassword(prev => !prev)}
                              className="absolute right-3 z-10 text-gray-500 hover:text-vercity"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <div><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.21699 14.0275C8.02699 14.0275 7.83699 13.9575 7.68699 13.8075C6.86699 12.9875 6.41699 11.8975 6.41699 10.7475C6.41699 8.35748 8.35699 6.41748 10.747 6.41748C11.897 6.41748 12.987 6.86748 13.807 7.68748C13.947 7.82748 14.027 8.01748 14.027 8.21748C14.027 8.41748 13.947 8.60748 13.807 8.74748L8.74699 13.8075C8.59699 13.9575 8.40699 14.0275 8.21699 14.0275ZM10.747 7.91748C9.18699 7.91748 7.91699 9.18748 7.91699 10.7475C7.91699 11.2475 8.04699 11.7275 8.28699 12.1475L12.147 8.28748C11.727 8.04748 11.247 7.91748 10.747 7.91748Z" fill="#292D32" />
                                <path d="M4.34691 17.2575C4.17691 17.2575 3.99691 17.1975 3.85691 17.0775C2.78691 16.1675 1.82691 15.0475 1.00691 13.7475C-0.0530859 12.0975 -0.0530859 9.40754 1.00691 7.74754C3.44691 3.92754 6.99691 1.72754 10.7469 1.72754C12.9469 1.72754 15.1169 2.48754 17.0169 3.91754C17.3469 4.16754 17.4169 4.63754 17.1669 4.96754C16.9169 5.29754 16.4469 5.36754 16.1169 5.11754C14.4769 3.87754 12.6169 3.22754 10.7469 3.22754C7.51691 3.22754 4.42691 5.16754 2.26691 8.55754C1.51691 9.72754 1.51691 11.7675 2.26691 12.9375C3.01691 14.1075 3.87691 15.1175 4.82691 15.9375C5.13691 16.2075 5.17691 16.6775 4.90691 16.9975C4.76691 17.1675 4.55691 17.2575 4.34691 17.2575Z" fill="#292D32" />
                                <path d="M10.7466 19.7676C9.41664 19.7676 8.11664 19.4976 6.86664 18.9676C6.48664 18.8076 6.30664 18.3676 6.46664 17.9876C6.62664 17.6076 7.06664 17.4276 7.44664 17.5876C8.50664 18.0376 9.61664 18.2676 10.7366 18.2676C13.9666 18.2676 17.0566 16.3276 19.2166 12.9376C19.9666 11.7676 19.9666 9.72756 19.2166 8.55756C18.9066 8.06756 18.5666 7.59756 18.2066 7.15756C17.9466 6.83756 17.9966 6.36756 18.3166 6.09756C18.6366 5.83756 19.1066 5.87756 19.3766 6.20756C19.7666 6.68756 20.1466 7.20756 20.4866 7.74756C21.5466 9.39756 21.5466 12.0876 20.4866 13.7476C18.0466 17.5676 14.4966 19.7676 10.7466 19.7676Z" fill="#292D32" />
                                <path d="M11.4367 15.0177C11.0867 15.0177 10.7667 14.7677 10.6967 14.4077C10.6167 13.9977 10.8867 13.6077 11.2967 13.5377C12.3967 13.3377 13.3167 12.4177 13.5167 11.3177C13.5967 10.9077 13.9867 10.6477 14.3967 10.7177C14.8067 10.7977 15.0767 11.1877 14.9967 11.5977C14.6767 13.3277 13.2967 14.6977 11.5767 15.0177C11.5267 15.0077 11.4867 15.0177 11.4367 15.0177Z" fill="#292D32" />
                                <path d="M0.7475 21.4975C0.5575 21.4975 0.3675 21.4275 0.2175 21.2775C-0.0725 20.9875 -0.0725 20.5075 0.2175 20.2175L7.6875 12.7475C7.9775 12.4575 8.4575 12.4575 8.7475 12.7475C9.0375 13.0375 9.0375 13.5175 8.7475 13.8075L1.2775 21.2775C1.1275 21.4275 0.9375 21.4975 0.7475 21.4975Z" fill="#292D32" />
                                <path d="M13.2768 8.9675C13.0868 8.9675 12.8968 8.8975 12.7468 8.7475C12.4568 8.4575 12.4568 7.9775 12.7468 7.6875L20.2168 0.2175C20.5068 -0.0725 20.9868 -0.0725 21.2768 0.2175C21.5668 0.5075 21.5668 0.9875 21.2768 1.2775L13.8068 8.7475C13.6568 8.8975 13.4668 8.9675 13.2768 8.9675Z" fill="#292D32" />
                              </svg>
                              </div> : <div><svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5448 13.3499C8.15484 13.3499 6.21484 11.4099 6.21484 9.01994C6.21484 6.62994 8.15484 4.68994 10.5448 4.68994C12.9348 4.68994 14.8748 6.62994 14.8748 9.01994C14.8748 11.4099 12.9348 13.3499 10.5448 13.3499ZM10.5448 6.18994C8.98484 6.18994 7.71484 7.45994 7.71484 9.01994C7.71484 10.5799 8.98484 11.8499 10.5448 11.8499C12.1048 11.8499 13.3748 10.5799 13.3748 9.01994C13.3748 7.45994 12.1048 6.18994 10.5448 6.18994Z" fill="#292D32" />
                                <path d="M10.545 18.04C6.785 18.04 3.235 15.84 0.795 12.02C-0.265 10.37 -0.265 7.68 0.795 6.02C3.245 2.2 6.795 0 10.545 0C14.295 0 17.845 2.2 20.285 6.02C21.345 7.67 21.345 10.36 20.285 12.02C17.845 15.84 14.295 18.04 10.545 18.04ZM10.545 1.5C7.315 1.5 4.225 3.44 2.065 6.83C1.315 8 1.315 10.04 2.065 11.21C4.225 14.6 7.315 16.54 10.545 16.54C13.775 16.54 16.865 14.6 19.025 11.21C19.775 10.04 19.775 8 19.025 6.83C16.865 3.44 13.775 1.5 10.545 1.5Z" fill="#292D32" />
                              </svg>
                              </div>}
                            </button>
                          </div><span className="relative"><p id="pwdnote" className={pwdFocus && !validPwd ? "text-xs rounded-lg bg-black text-white p-1 relative bottom-0 mt-4" : "sr-only"}><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
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
                            type={showConfirm ? "text" : "password"}
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
                          <button
                            type="button"
                            onClick={() => setShowConfirm(prev => !prev)}
                            className="absolute right-3 z-10 text-gray-500 hover:text-vercity"
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                          >
                            {showConfirm ? <div><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.21699 14.0275C8.02699 14.0275 7.83699 13.9575 7.68699 13.8075C6.86699 12.9875 6.41699 11.8975 6.41699 10.7475C6.41699 8.35748 8.35699 6.41748 10.747 6.41748C11.897 6.41748 12.987 6.86748 13.807 7.68748C13.947 7.82748 14.027 8.01748 14.027 8.21748C14.027 8.41748 13.947 8.60748 13.807 8.74748L8.74699 13.8075C8.59699 13.9575 8.40699 14.0275 8.21699 14.0275ZM10.747 7.91748C9.18699 7.91748 7.91699 9.18748 7.91699 10.7475C7.91699 11.2475 8.04699 11.7275 8.28699 12.1475L12.147 8.28748C11.727 8.04748 11.247 7.91748 10.747 7.91748Z" fill="#292D32" />
                              <path d="M4.34691 17.2575C4.17691 17.2575 3.99691 17.1975 3.85691 17.0775C2.78691 16.1675 1.82691 15.0475 1.00691 13.7475C-0.0530859 12.0975 -0.0530859 9.40754 1.00691 7.74754C3.44691 3.92754 6.99691 1.72754 10.7469 1.72754C12.9469 1.72754 15.1169 2.48754 17.0169 3.91754C17.3469 4.16754 17.4169 4.63754 17.1669 4.96754C16.9169 5.29754 16.4469 5.36754 16.1169 5.11754C14.4769 3.87754 12.6169 3.22754 10.7469 3.22754C7.51691 3.22754 4.42691 5.16754 2.26691 8.55754C1.51691 9.72754 1.51691 11.7675 2.26691 12.9375C3.01691 14.1075 3.87691 15.1175 4.82691 15.9375C5.13691 16.2075 5.17691 16.6775 4.90691 16.9975C4.76691 17.1675 4.55691 17.2575 4.34691 17.2575Z" fill="#292D32" />
                              <path d="M10.7466 19.7676C9.41664 19.7676 8.11664 19.4976 6.86664 18.9676C6.48664 18.8076 6.30664 18.3676 6.46664 17.9876C6.62664 17.6076 7.06664 17.4276 7.44664 17.5876C8.50664 18.0376 9.61664 18.2676 10.7366 18.2676C13.9666 18.2676 17.0566 16.3276 19.2166 12.9376C19.9666 11.7676 19.9666 9.72756 19.2166 8.55756C18.9066 8.06756 18.5666 7.59756 18.2066 7.15756C17.9466 6.83756 17.9966 6.36756 18.3166 6.09756C18.6366 5.83756 19.1066 5.87756 19.3766 6.20756C19.7666 6.68756 20.1466 7.20756 20.4866 7.74756C21.5466 9.39756 21.5466 12.0876 20.4866 13.7476C18.0466 17.5676 14.4966 19.7676 10.7466 19.7676Z" fill="#292D32" />
                              <path d="M11.4367 15.0177C11.0867 15.0177 10.7667 14.7677 10.6967 14.4077C10.6167 13.9977 10.8867 13.6077 11.2967 13.5377C12.3967 13.3377 13.3167 12.4177 13.5167 11.3177C13.5967 10.9077 13.9867 10.6477 14.3967 10.7177C14.8067 10.7977 15.0767 11.1877 14.9967 11.5977C14.6767 13.3277 13.2967 14.6977 11.5767 15.0177C11.5267 15.0077 11.4867 15.0177 11.4367 15.0177Z" fill="#292D32" />
                              <path d="M0.7475 21.4975C0.5575 21.4975 0.3675 21.4275 0.2175 21.2775C-0.0725 20.9875 -0.0725 20.5075 0.2175 20.2175L7.6875 12.7475C7.9775 12.4575 8.4575 12.4575 8.7475 12.7475C9.0375 13.0375 9.0375 13.5175 8.7475 13.8075L1.2775 21.2775C1.1275 21.4275 0.9375 21.4975 0.7475 21.4975Z" fill="#292D32" />
                              <path d="M13.2768 8.9675C13.0868 8.9675 12.8968 8.8975 12.7468 8.7475C12.4568 8.4575 12.4568 7.9775 12.7468 7.6875L20.2168 0.2175C20.5068 -0.0725 20.9868 -0.0725 21.2768 0.2175C21.5668 0.5075 21.5668 0.9875 21.2768 1.2775L13.8068 8.7475C13.6568 8.8975 13.4668 8.9675 13.2768 8.9675Z" fill="#292D32" />
                            </svg>
                            </div> : <div><svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.5448 13.3499C8.15484 13.3499 6.21484 11.4099 6.21484 9.01994C6.21484 6.62994 8.15484 4.68994 10.5448 4.68994C12.9348 4.68994 14.8748 6.62994 14.8748 9.01994C14.8748 11.4099 12.9348 13.3499 10.5448 13.3499ZM10.5448 6.18994C8.98484 6.18994 7.71484 7.45994 7.71484 9.01994C7.71484 10.5799 8.98484 11.8499 10.5448 11.8499C12.1048 11.8499 13.3748 10.5799 13.3748 9.01994C13.3748 7.45994 12.1048 6.18994 10.5448 6.18994Z" fill="#292D32" />
                              <path d="M10.545 18.04C6.785 18.04 3.235 15.84 0.795 12.02C-0.265 10.37 -0.265 7.68 0.795 6.02C3.245 2.2 6.795 0 10.545 0C14.295 0 17.845 2.2 20.285 6.02C21.345 7.67 21.345 10.36 20.285 12.02C17.845 15.84 14.295 18.04 10.545 18.04ZM10.545 1.5C7.315 1.5 4.225 3.44 2.065 6.83C1.315 8 1.315 10.04 2.065 11.21C4.225 14.6 7.315 16.54 10.545 16.54C13.775 16.54 16.865 14.6 19.025 11.21C19.775 10.04 19.775 8 19.025 6.83C16.865 3.44 13.775 1.5 10.545 1.5Z" fill="#292D32" />
                            </svg>
                            </div>}
                          </button>





                        </div>
                        <span className="relative"><p id="confirmnote" className={matchFocus && !validMatch ? "text-xs rounded-lg bg-black text-white p-1 relative bottom-0 mt-4" : "sr-only"}><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#ffffff" />
                          <path d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z" fill="#ffffff" />
                          <path d="M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z" fill="#ffffff" />
                        </svg> Must match the first password input field.
                          <span aria-label="exclamation mark">!</span>
                          <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p></span>

                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-vercity text-white px-4 py-2 rounded-xl active:bg-vercity/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                    </form>

                    {/* <p className="text-center">Already registered? <br />
                <span><Link to="/Login">
                <button  className="underline decoration-1 text-vercity">Sign in</button>
                </Link></span></p> */}



                  </div>
                </div>
              </div>



            </div>

            <div className="hidden lg:flex lg:w-1/2 min-h-screen justify-center items-center"> <div className="bg-adva overflow-hidden w-full max-w-2xl rounded-2xl">
              <img src={sub} alt="" className=' w-full object-cover ' /></div>
            </div>

          </div>
        </section>
      )}
    </>
  )
}
