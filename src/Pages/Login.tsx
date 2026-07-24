import { useRef, useEffect, useState, useContext, type ChangeEvent } from 'react'
import AuthContext from '../Context/AuthProvider'
import {jwtDecode} from "jwt-decode"
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

const [rememberMe, setRememberMe] = useState(false);

const isFormValid =
  user.trim() !== "" &&
  password.trim() !== "" &&
  userValid === true &&
  passwordValid === true;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {return}
    
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email: user, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

      console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))
      const accessToken = response.data.token;

      const decoded = jwtDecode<{
        id: string;
        email:string;
        role:string;
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





      console.log("Saved:", localStorage.getItem("auth"));

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
    <section className='login-wrapper bg-white flex justify-center items-center h-screen'>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className='left flex-1 flex justify-center max-w-xl h-full '>
          <div className=' form-wrapper mx-auto flex flex-col  gap-18'>
            <Link to="/">
              <div><img src={logo} alt="" className='w-30' /></div>
            </Link>
            <div className=' w-full max-w-3xl flex justify-center h-165.5'>
              <div className=' max-w-85 max-h-165.5 flex items-center flex-col gap-15'>
                <div className='flex flex-col gap-2'>
                  <Heading style='text-vercity text-[52px] font-semibold' label='welcome back' />
                  <p className='text-[18px] -mt-5' >Don't have an account? <Link to="/SignUp"><span className='text-[18px] text-vercity'>Create Now</span></Link></p>
                </div>

                <p ref={errRef} className={errMsg ? 'text-red-500' : 'absolute left-2499.75'} aria-live='assertive'>{errMsg}</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
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
                        type="password"
                        onChange={handlePassword}
                        value={password}
                        required className="py-2 pr-3 pl-3 rounded-xl absolute w-full focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0 peer-focus:scale-100   '>Enter Password </label>
                    </div>{passwordValid === false && password.trim() !== '' && (<span className='error text-xs text-red-400'>Password must be at least 8 characters long and include both letters and numbers</span>)}
                  </div>
                  <div className='flex justify-between items-center'>
                    <input checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)} type="checkbox" id='save'  className='hidden peer' />
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
                    <a href="">Forgot Password?</a>
                  </div>
                  <button type="submit" disabled={!isFormValid} className={`${!isFormValid ? "bg-gray-400 text-white px-2 rounded-xl py-1 cursor-not-allowed" : "bg-vercity active:bg-vercity/50 text-white px-2 rounded-xl py-1 hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 "}`}>Sign In</button>
                   
                </form>
                {/* <ToastContainer position="top-right" autoClose={3000}/> */}
                <div className='altLogin flex justify-around items-center -my-6 w-80'>
                  <div className='flex-2'><hr className='border-gray-400' /></div>
                  <div className='flex-1 '><p className='text-center mx-5  '>or</p></div>
                  <div className='flex-2'><hr className='border-gray-400' /></div>
                </div>

                <div className='altLogin flex flex-col justify-around items-center gap-2 w-80'>
                  <button className='flex gap-2 items-center justify-center border border-vercity hover:border-vercity/50 w-full py-1 rounded-xl'><svg className='w-3 h-3' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>Continue with Google</button>

                  <button className='flex gap-2 items-center justify-center border border-vercity hover:border-vercity/50 w-full py-1 rounded-xl'><svg className='w-3 h-3' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple</title><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>Continue with Apple</button>
                </div>
              </div>
            </div>
          </div>



        </div>
        <div className='hidden h-full w-2xl rounded-2xl flex-1 lg:flex flex-col justify-center items-center '>
          <div className='bg-adva overflow-hidden mx-w-xl rounded-2xl '><img src={sign} alt="" className=' w-xl max-w-2xl object-cover ' /></div>
        </div>
      </div>
    </section>
  )
}
