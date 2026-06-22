
import logo from '../assets/Union.svg'
import { Link } from 'react-router-dom'

export const Nav = () => {
    return (
        <div className='bg-white flex flex-row items-center justify-center shadow-sm  sticky z-10 top-0'>


            <div className=' w-322 mx-auto flex items-center'>
                <nav className='w-full  my-5   flex flex-row items-center justify-between '>
                    <div><Link to="/">
                        <img src={logo} alt="Vercity Logo" className=' h-12 ' />
                    </Link>
                    </div>
                    <div className=''><button className='flex items-center'>Explore <span className="material-symbols-outlined ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9995 16.7999C11.2995 16.7999 10.5995 16.5299 10.0695 15.9999L3.54953 9.47989C3.25953 9.18989 3.25953 8.70989 3.54953 8.41989C3.83953 8.12989 4.31953 8.12989 4.60953 8.41989L11.1295 14.9399C11.6095 15.4199 12.3895 15.4199 12.8695 14.9399L19.3895 8.41989C19.6795 8.12989 20.1595 8.12989 20.4495 8.41989C20.7395 8.70989 20.7395 9.18989 20.4495 9.47989L13.9295 15.9999C13.3995 16.5299 12.6995 16.7999 11.9995 16.7999Z" fill="#1D1073" />
                        </svg>
                    </span></button> </div>
                    <div className='flex items-center '>

                        <div className='relative flex flex-row  items-center border border-black/20 rounded-xl  w-94 pl-2 '><input type="text" placeholder='what skill are you aiming for? ' className=' placeholder:font-light placeholder:text-sm placeholder:text-gray-500 transition-all duration-300 focus:placeholder-opacity-0   outline-none h-10  w-94 mx-2 z-10 ' />
                            {/* <label htmlFor="" className='absolute pl-2 peer-focus:scale-0 placeholder-gray-500 transition-all duration-300 focus:placeholder-opacity-0 outline-none  text-sm  font-light text-gray-500'>what skill are you aiming for?</label> */}
                            <span className="material-symbols-outlined mr-5 cursor-pointer">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.25 20.5C4.6 20.5 0 15.9 0 10.25C0 4.6 4.6 0 10.25 0C15.9 0 20.5 4.6 20.5 10.25C20.5 15.9 15.9 20.5 10.25 20.5ZM10.25 1.5C5.42 1.5 1.5 5.43 1.5 10.25C1.5 15.07 5.42 19 10.25 19C15.08 19 19 15.07 19 10.25C19 5.43 15.08 1.5 10.25 1.5Z" fill="#1D1073" />
                                    <path d="M20.7495 21.4999C20.5595 21.4999 20.3695 21.4299 20.2195 21.2799L18.2195 19.2799C17.9295 18.9899 17.9295 18.5099 18.2195 18.2199C18.5095 17.9299 18.9895 17.9299 19.2795 18.2199L21.2795 20.2199C21.5695 20.5099 21.5695 20.9899 21.2795 21.2799C21.1295 21.4299 20.9395 21.4999 20.7495 21.4999Z" fill="#1D1073" />
                                </svg>
                            </span>
                        </div>

                    </div>
                    <div>
                        <Link to="/Login">
                            <button className=''>Teach With Us</button>
                        </Link>
                    </div>
                    <div className=' flex gap-4'>

                        <Link to="/Login">
                            <button className='text-vercity  border border-vercity rounded-xl px-6 py-2'>Login</button>
                        </Link>
                        <Link to="/SignUp">
                            <button className='bg-vercity  text-white rounded-xl px-6 py-2'>Sign Up</button>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}
