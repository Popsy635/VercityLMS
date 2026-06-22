import { Link } from "react-router-dom"
import logo from "../assets/Union.svg"
import sub from "../assets/Subtract.png"
import { Heading } from "../Components/html/Heading"


export const SignUp = () => {
  return (
    <div><div className='login-wrapper bg-white flex justify-center items-center h-screen'>
      <div className=' flex justify-around items-center  w-[95%] h-190  '>
        <div className='left flex-1 flex justify-center w-xl h-full '>
          <div className=' form-wrapper mx-auto flex flex-col  gap-18'>
            <Link to="/">
              <div><img src={logo} alt="" className='w-30' /></div>
            </Link>
            <div className=' w-85 flex justify-center h-165.5'>
              <div className=' max-w-85 max-h-165.5 flex items-center flex-col gap-10'>
                <div className=''>
                  <Heading style="text-vercity text-[52px] font-semibold" label="create account"/>
                </div>
                <form action="" className='flex flex-col gap-6 w-80 '>
                  <div className=' flex flex-col gap-5 '>
                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                    <input id="email" type="text" name="email" placeholder=" " className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="email" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Enter Name </label>
                    </div>
                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                    <input id="email" type="text" name="email" placeholder=" " className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="Password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Enter Email </label>
                    </div>
                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                    <input id="Password" type="Password" name="Password" placeholder=" " className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="Password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Enter Password </label>
                    </div>
                    <div className='relative flex justify-center items-center border border-gray-300 hover:border-gray-500 rounded-xl  py-5 px-3 text-base focus:border-gray-500  sm:text-sm/6 group'>
                    <input id="Password" type="Password" name="Password" placeholder=" " className="py-2 pr-3 pl-3 rounded-xl absolute w-80 focus:outline-2 focus:outline-offset-2 focus:outline-vercity peer" />
                      <label htmlFor="Password" className='absolute left-3 top-2 transition-all duration-300 pointer-events-none -translate-y-5 scale-85 text-gray-400 bg-white px-2 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:px-2 peer-focus:scale-100   '>Confirm Password </label>
                    </div>
                  </div>
                  
                  <button className='bg-vercity text-white px-2 rounded-xl py-1'>Sign In</button>
                </form>
                

                
              </div>
            </div>
          </div>



        </div>
        <div className='bg-amber-300  h-full w-2xl rounded-2xl flex-1 flex flex-col justify-center items-center '>
          <div className='bg-adva overflow-hidden  rounded-2xl '><img src={sub} alt="" className='  -translate-y-25 ' /></div>
        </div>
      </div>
    </div></div>
  )
}
