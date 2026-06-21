import React from 'react'
import logo from '../assets/Union.svg'
import sub from '../assets/Subtract.png'





export const Login = () => {
  return (
    <div className='login-wrapper bg-white flex justify-center items-center h-screen'>
      <div className='bg-pink-500 flex justify-around  w-7xl h-200 overflow-hidden rounded-2xl'>
        <div className='left flex flex-col  '>
          <div className='form-wrapper mx-auto flex flex-col gap-15'>
            <div><img src={logo} alt="" className='w-40' /></div>
            <div className='bg-amber-300 flex flex-col gap-10 h-150'>
              <p>Don't have an account? <span><a href="#SignUp">Create Now</a></span></p>
              <form action="" className='flex flex-col'>
                <input type="text" name="email" id="" placeholder='Email' />
                <input type="password" name="email" id="" placeholder='Password' />
                <a href="">Forgot Password?</a>
                <button className='bg-vercity text-white'>Sign In</button>
              </form>
            </div>
          </div>
        </div>
        <div className='right h-full '><img src={sub} alt="" className=' w-2xl -translate-y-30 translate-x-25' /></div>
      </div>
    </div>
  )
}
