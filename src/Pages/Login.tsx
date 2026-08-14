import { useRef, useEffect, useState, useContext, type ChangeEvent } from 'react'
import AuthContext from '../Context/AuthProvider'
import { jwtDecode } from "jwt-decode"
import logo from '../assets/Union.svg'


import { Link } from 'react-router-dom'
import { Heading } from '../Components/html/Heading'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import sign from '../assets/sign.png'





const LOGIN_URL = '/auth/login';

export const Login = () => {

  const [user, setUser] = useState<string>('')

  const [userValid, setUserValid] = useState<boolean | undefined>(undefined)

  const [password, setPassword] = useState<string>('')

  const [showPassword, setShowPassword] = useState(false)

  const [passwordValid, setPasswordValid] = useState<boolean | undefined>(undefined)

  const navigate = useNavigate()


  // Validate User
  const validateUser = (value: string): boolean => {

    const isValid = value.trim() === '' ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    setUserValid(isValid)

    return isValid
  }


  // Validate Password
  const validatePassword = (value: string): boolean => {

    const isValid = value.trim() === '' ? true : /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)

    setPasswordValid(isValid)

    return isValid
  }

  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value

    setUser(nextValue)

    validateUser(nextValue)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    setPassword(nextValue)
    validatePassword(nextValue)
  }

  const { setAuth } = useContext(AuthContext) as { setAuth: React.Dispatch<React.SetStateAction<any>> };

  const userRef = useRef<HTMLInputElement>(null);

  const errRef = useRef<HTMLParagraphElement>(null);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    setErrMsg("");
  }, [user, password])

  const [rememberMe, setRememberMe] = useState(() => {
    return JSON.parse(localStorage.getItem("rememberMe") ?? "false");
  });

  const isFormValid =
    user.trim() !== "" &&
    password.trim() !== "" &&
    userValid === true &&
    passwordValid === true;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) { return }

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email: user, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

      // console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))
      const accessToken = response.data.token;

      const decoded = jwtDecode<{
        id: string;
        email: string;
        role: string;
        iat: number;
        exp: number;
      }>(accessToken);

      const authData = {
        accessToken,
        user: decoded.email,
        id: decoded.id,
        role: decoded.role,
      };


      localStorage.setItem("rememberMe", JSON.stringify(rememberMe));

      setAuth(authData);




      // console.log("Saved:", localStorage.getItem("auth"));

      setUser('');
      setPassword('');
      navigate("/");

    } catch (err) {
      const axiosError = err as { response?: { status?: number } };
      if (!axiosError.response) {
        setErrMsg('No Server Response');
      } else if (axiosError.response.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (axiosError.response.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }

      errRef.current?.focus();

    }
  }

  //   const isUserOk = validateUser(user);
  //   const isPasswordOk = validatePassword(password);

  //   if(!isUserOk || !isPasswordOk) {
  //     toast.error("Check Login details and try again");
  //   }else{
  //     toast.success("Login Successful");
  //   }

  //   if (isUserOk || isPasswordOk) {
  //     navigate("/Dashboard");
  //   } else {
  //     alert("Invalid User or Password")
  //   }
  // }








  return (
    <section className="login-wrapper min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="left flex min-h-screen w-full items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">

            <Link to="/">
              <div><img src={logo} alt="" className='w-30' /></div>
            </Link>

            <div className='mt-16 flex w-full flex-col gap-10'>
              <div className="flex flex-col gap-2">
                <Heading
                  style="text-vercity text-4xl sm:text-5xl font-semibold"
                  label="welcome back"
                />

                <p className="text-base sm:text-lg">
                  Don't have an account?{" "}
                  <Link to="/SignUp">
                    <span className="text-vercity">Create Now</span>
                  </Link>
                </p>
              </div>

              <p ref={errRef} className={errMsg ? 'text-red-500' : 'absolute left-2499.75'} aria-live='assertive'>{errMsg}</p>

              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                <div className=' flex flex-col gap-5 '>
                  <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                    <input
                      id="username"
                      type="text"
                      ref={userRef}
                      autoComplete='on'
                      onChange={handleUser}
                      value={user}
                      required
                      className="py-2 pr-3 pl-3 rounded-xl absolute w-full focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                    <label htmlFor="username" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:pb-0 peer-focus:scale-100   '>Enter Email</label>
                  </div>{userValid === false && user?.trim() !== "" && (<span className='error text-xs text-red-400'>Invalid Format</span>)}
                  <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 peer'>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handlePassword}
                      value={password}
                      required 
                      className="py-2 pr-3 pl-3 rounded-xl absolute w-full focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                    <label htmlFor="password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0 peer-focus:scale-100   '>Enter Password </label>

<button
    type="button"
    onClick={() => setShowPassword(prev => !prev)}
    className="absolute right-3 z-10 text-gray-500 hover:text-vercity"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <div><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.21699 14.0275C8.02699 14.0275 7.83699 13.9575 7.68699 13.8075C6.86699 12.9875 6.41699 11.8975 6.41699 10.7475C6.41699 8.35748 8.35699 6.41748 10.747 6.41748C11.897 6.41748 12.987 6.86748 13.807 7.68748C13.947 7.82748 14.027 8.01748 14.027 8.21748C14.027 8.41748 13.947 8.60748 13.807 8.74748L8.74699 13.8075C8.59699 13.9575 8.40699 14.0275 8.21699 14.0275ZM10.747 7.91748C9.18699 7.91748 7.91699 9.18748 7.91699 10.7475C7.91699 11.2475 8.04699 11.7275 8.28699 12.1475L12.147 8.28748C11.727 8.04748 11.247 7.91748 10.747 7.91748Z" fill="#292D32"/>
<path d="M4.34691 17.2575C4.17691 17.2575 3.99691 17.1975 3.85691 17.0775C2.78691 16.1675 1.82691 15.0475 1.00691 13.7475C-0.0530859 12.0975 -0.0530859 9.40754 1.00691 7.74754C3.44691 3.92754 6.99691 1.72754 10.7469 1.72754C12.9469 1.72754 15.1169 2.48754 17.0169 3.91754C17.3469 4.16754 17.4169 4.63754 17.1669 4.96754C16.9169 5.29754 16.4469 5.36754 16.1169 5.11754C14.4769 3.87754 12.6169 3.22754 10.7469 3.22754C7.51691 3.22754 4.42691 5.16754 2.26691 8.55754C1.51691 9.72754 1.51691 11.7675 2.26691 12.9375C3.01691 14.1075 3.87691 15.1175 4.82691 15.9375C5.13691 16.2075 5.17691 16.6775 4.90691 16.9975C4.76691 17.1675 4.55691 17.2575 4.34691 17.2575Z" fill="#292D32"/>
<path d="M10.7466 19.7676C9.41664 19.7676 8.11664 19.4976 6.86664 18.9676C6.48664 18.8076 6.30664 18.3676 6.46664 17.9876C6.62664 17.6076 7.06664 17.4276 7.44664 17.5876C8.50664 18.0376 9.61664 18.2676 10.7366 18.2676C13.9666 18.2676 17.0566 16.3276 19.2166 12.9376C19.9666 11.7676 19.9666 9.72756 19.2166 8.55756C18.9066 8.06756 18.5666 7.59756 18.2066 7.15756C17.9466 6.83756 17.9966 6.36756 18.3166 6.09756C18.6366 5.83756 19.1066 5.87756 19.3766 6.20756C19.7666 6.68756 20.1466 7.20756 20.4866 7.74756C21.5466 9.39756 21.5466 12.0876 20.4866 13.7476C18.0466 17.5676 14.4966 19.7676 10.7466 19.7676Z" fill="#292D32"/>
<path d="M11.4367 15.0177C11.0867 15.0177 10.7667 14.7677 10.6967 14.4077C10.6167 13.9977 10.8867 13.6077 11.2967 13.5377C12.3967 13.3377 13.3167 12.4177 13.5167 11.3177C13.5967 10.9077 13.9867 10.6477 14.3967 10.7177C14.8067 10.7977 15.0767 11.1877 14.9967 11.5977C14.6767 13.3277 13.2967 14.6977 11.5767 15.0177C11.5267 15.0077 11.4867 15.0177 11.4367 15.0177Z" fill="#292D32"/>
<path d="M0.7475 21.4975C0.5575 21.4975 0.3675 21.4275 0.2175 21.2775C-0.0725 20.9875 -0.0725 20.5075 0.2175 20.2175L7.6875 12.7475C7.9775 12.4575 8.4575 12.4575 8.7475 12.7475C9.0375 13.0375 9.0375 13.5175 8.7475 13.8075L1.2775 21.2775C1.1275 21.4275 0.9375 21.4975 0.7475 21.4975Z" fill="#292D32"/>
<path d="M13.2768 8.9675C13.0868 8.9675 12.8968 8.8975 12.7468 8.7475C12.4568 8.4575 12.4568 7.9775 12.7468 7.6875L20.2168 0.2175C20.5068 -0.0725 20.9868 -0.0725 21.2768 0.2175C21.5668 0.5075 21.5668 0.9875 21.2768 1.2775L13.8068 8.7475C13.6568 8.8975 13.4668 8.9675 13.2768 8.9675Z" fill="#292D32"/>
</svg>
</div> : <div><svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5448 13.3499C8.15484 13.3499 6.21484 11.4099 6.21484 9.01994C6.21484 6.62994 8.15484 4.68994 10.5448 4.68994C12.9348 4.68994 14.8748 6.62994 14.8748 9.01994C14.8748 11.4099 12.9348 13.3499 10.5448 13.3499ZM10.5448 6.18994C8.98484 6.18994 7.71484 7.45994 7.71484 9.01994C7.71484 10.5799 8.98484 11.8499 10.5448 11.8499C12.1048 11.8499 13.3748 10.5799 13.3748 9.01994C13.3748 7.45994 12.1048 6.18994 10.5448 6.18994Z" fill="#292D32"/>
<path d="M10.545 18.04C6.785 18.04 3.235 15.84 0.795 12.02C-0.265 10.37 -0.265 7.68 0.795 6.02C3.245 2.2 6.795 0 10.545 0C14.295 0 17.845 2.2 20.285 6.02C21.345 7.67 21.345 10.36 20.285 12.02C17.845 15.84 14.295 18.04 10.545 18.04ZM10.545 1.5C7.315 1.5 4.225 3.44 2.065 6.83C1.315 8 1.315 10.04 2.065 11.21C4.225 14.6 7.315 16.54 10.545 16.54C13.775 16.54 16.865 14.6 19.025 11.21C19.775 10.04 19.775 8 19.025 6.83C16.865 3.44 13.775 1.5 10.545 1.5Z" fill="#292D32"/>
</svg>
</div>}
  </button>

                  </div>{passwordValid === false && password.trim() !== '' && (<span className='error text-xs text-red-400'>Password must be at least 8 characters long and include both letters and numbers</span>)}
                </div>
                <div className='flex justify-between items-center'>
                  <input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" id='save' className='hidden peer' />
                  <label htmlFor="save" className='cursor-pointer relative  select-none transition-colors   pl-8 p-4 duration-300 ease-in
                                        
                                        before:content-[""] before:absolute before:left-1 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                       
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:-left-0.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-vercity
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '> Remember Me</label>
                  <Link to="/ForgotPassword">Forgot Password?</Link>
                </div>

                <button type="submit" disabled={!isFormValid} className={`${!isFormValid ? "bg-gray-400 text-white px-2 rounded-xl py-1 cursor-not-allowed" : "bg-vercity active:bg-vercity/50 text-white px-2 rounded-xl py-1 hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 "}`}>Sign In</button>

              </form>
              {/* <ToastContainer position="top-right" autoClose={3000}/> */}
              <div className="altlogin flex w-full  items-center gap-2">
                <div className='flex-2'><hr className='border-gray-400' /></div>
                <div className='flex-1 '><p className='text-center mx-5  '>or</p></div>
                <div className='flex-2'><hr className='border-gray-400' /></div>
              </div>

              <div className="altlogin flex flex-col gap-4 w-full items-center justify-around">
                <button className='flex gap-2 items-center justify-center border border-vercity hover:border-vercity/50 w-full py-1 rounded-xl cursor-not-allowed'><svg className='w-3 h-3' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>Continue with Google</button>

                <button className='flex gap-2 items-center justify-center border border-vercity hover:border-vercity/50 w-full py-1 rounded-xl cursor-not-allowed'><svg className='w-3 h-3' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple</title><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>Continue with Apple</button>
              </div>
            </div>

          </div>



        </div>
        <div className="hidden min-h-screen w-full items-center justify-center px-6 py-10 lg:flex">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-adva">
            <img
              src={sign}
              alt=""
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
