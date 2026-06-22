import React, {useState, type ChangeEvent} from 'react'
import logo from '../assets/Union.svg'
import sub from '../assets/Subtract.png'
import { Radio } from '../Components/html/Radio'
import { Link } from 'react-router-dom'
import { Heading } from '../Components/html/Heading'

import { useNavigate } from 'react-router-dom'






export const Login = () => {
  
 const [username, setUsername] = useState<string|null>(null)
 const [password, setPassword] = useState<string|null>(null)
 const navigate = useNavigate()

 const handleUsername = (e : ChangeEvent <HTMLInputElement>) => {
    return setUsername (e.target.value) 
 }

  const handlePassword = (e : ChangeEvent <HTMLInputElement>) => {
    return setPassword (e.target.value) 
 }

 const handleSubmit = () => {
    const user = {
        username,
        password
    }
        localStorage.setItem("user", JSON.stringify(user))

    

    navigate("/")
 }


  
  return (
    <div className='login-wrapper bg-white flex justify-center items-center h-screen'>
      <div className=' flex justify-around items-center  w-[95%] h-190  '>
        <div className='left flex-1 flex justify-center w-xl h-full '>
          <div className=' form-wrapper mx-auto flex flex-col  gap-18'>
            <Link to="/">
              <div><img src={logo} alt="" className='w-30' /></div>
            </Link>
            <div className=' w-85 flex justify-center h-165.5'>
              <div className=' max-w-85 max-h-165.5 flex items-center flex-col gap-15'>
                <div className=''>
                <Heading style='text-vercity text-[52px] font-semibold' label='welcome back'/>
                  <p className='text-[18px] -mt-5' >Don't have an account? <Link to="/SignUp"><span className='text-[18px] text-vercity'><a href="#SignUp">Create Now</a></span></Link></p>
                </div>
                <form action="" className='flex flex-col gap-6 w-80 '>
                  <div className=' flex flex-col gap-5 '>
                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                    <input id="email" type="text" name="email" placeholder=" " value={username||""} onChange={handleUsername} className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="email" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-80 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:pb-0 peer-focus:scale-100   '>Enter Email </label>
                    </div>
                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 peer'>
                    <input id="Password" type="Password" name="Password" placeholder=" " value={password||""} onChange={handlePassword} className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="Password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0 peer-focus:scale-100   '>Enter Password </label>
                    </div>
                  </div>
                  <div className='flex gap-7'>
                    <Radio label='Save Password' name='radio' value='Yes' id='Yes' />
                    <a href="">Forgot Password?</a>
                  </div>
                  <button onClick={handleSubmit} className='bg-vercity text-white px-2 rounded-xl py-1'>Sign In</button>
                </form>
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
        <div className='bg-amber-300  h-full w-2xl rounded-2xl flex-1 flex flex-col justify-center items-center '>
          <div className='bg-adva overflow-hidden  rounded-2xl '><img src={sub} alt="" className='  -translate-y-25 ' /></div>
        </div>
      </div>
    </div>
  )
}
