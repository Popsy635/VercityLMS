import { Nav } from '../Components/html/Nav'
import IMG2 from '../assets/IMG2.png'
import IMG1 from '../assets/IMG1.png'
import IMG3 from '../assets/IMG3.png'
import IMG4 from '../assets/IMG4.png'
import { Footer } from '../Components/html/Footer'
import cert from '../assets/cert.svg'
import explore from '../assets/explore.svg'
import path from '../assets/path.svg'
import girlie from '../assets/girlie.png'

import { Carousel } from '../Components/html/Carousel';
import bot1 from '../assets/bot1.png'
import bot2 from '../assets/bot2.png'
import bot3 from '../assets/bot3.png'
import bot4 from '../assets/bot4.png'
import top1 from '../assets/top1.png'
import top2 from '../assets/top2.png'
import top3 from '../assets/top3.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Context/AuthProvider'






const icons = { explore, path, cert }

const heroImages = { IMG1, IMG2, IMG3, IMG4 }

const topImages = [top1, top2, top3];
const bottomImages = [bot1, bot2, bot3];


export function Home() {



    const { auth } = useContext(AuthContext);
    const isLoggedIn = !!auth.accessToken;



    return (
        <div  >

            <Nav />
            <div className="mx-auto max-w-screen-2xl px-4  sm:px-6 lg:px-8">
                <section className="mt-8 lg:mt-0 min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex-1 max-w-2xl">
                        <h1 className='font-bold text-4xl md:text-5xl lg:text-7xl leading-tight mb-4'>Master Skills <span className='font-normal text-gray-500'>For Professional</span> <span className='text-vercity'>Growth</span></h1>
                        <p className='text-base md:text-lg leading-8 mb-7'>Discover Career Accelerators, where industry-relevant skills and hands-on experience prepare you for career success.</p>
                        {isLoggedIn ? (<Link to="/Dashboard">
                            <button className='text-white text-3xl font-semibold bg-vercity/0 p-px rounded-lg h-16 w-56 md:w-64 hover:bg-linear-to-r from-green-500 via-blue-500 to-red-500 transition ease-in-out duration-400 group '><div className='text-white text-3xl font-semibold h-full w-full rounded-lg flex items-center justify-center bg-adva group-hover:bg-linear-to-bl group-hover:from-vercity group-hover:to-advbut  group-hover:transition group-hover:ease-in-out group-hover:duration-300'>
                                My Learning</div></button>
                        </Link>) : (<Link to="/Login">
                            <button className='text-white text-3xl font-semibold bg-vercity/0 p-px rounded-lg h-16 w-56 md:w-64 hover:bg-linear-to-r from-green-500 via-blue-500 to-red-500 transition ease-in-out duration-400 group '><div className='text-white text-3xl font-semibold h-full w-full rounded-lg flex items-center justify-center bg-adva group-hover:bg-linear-to-bl group-hover:from-vercity group-hover:to-advbut  group-hover:transition group-hover:ease-in-out group-hover:duration-300'>
                                Get Started</div></button>
                        </Link>)}
                    </div>

                    <div className='flex-1 flex justify-end'>
                        <div className="heroimg ">

                            <div className='grid grid-cols-2 gap-3 md:gap-5'>
                                <img src={heroImages.IMG1} alt="" className="w-full max-w-70 rounded-xl object-cover" />
                                <img src={heroImages.IMG2} alt="" className="w-full max-w-70 rounded-xl object-cover" />
                                <img src={heroImages.IMG3} alt="" className="w-full max-w-70 rounded-xl object-cover" />
                                <img src={heroImages.IMG4} alt="" className="w-full max-w-70 rounded-xl object-cover" />


                            </div>

                        </div>
                    </div>

                </section>

            </div>
            <div>
                <section className='bg-vercity/8 flex flex-col justify-center gap-10 py-20 '>

                    <div className="max-w-screen-2xl mx-auto px-6">
                        <h2 className=' font-semibold text-4xl mb-6 '>Transform your career</h2>
                        <div className="explore max-w-7xl mx-auto px-4 sm:px-6 ">
                            <div className="section-container mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
                                <div className='flex flex-col gap-2'>
                                    <div><img src={icons.explore} alt="explore icon" className='w-10 h-10' /></div>
                                    <h2 className=' font-semibold text-3xl'>Explore Skills</h2>
                                    <p className=' capitalise text-xl'>Explore thousands of courses designed to help you grow your skills in AI, Business, technology, and more.</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div><img src={icons.path} alt="path icon" className='w-10 h-10' /></div>
                                    <h2 className=' font-semibold text-3xl'>Career Path Guide</h2>
                                    <p className='capitalise text-xl '>Explore thousands of courses designed to help you grow your skills in AI, Business, technology, and more.</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div><img src={icons.cert} alt="cert icon" className='w-10 h-10' /></div>
                                    <h2 className='font-semibold text-3xl'>Get Certified</h2>
                                    <p className='capitalise text-xl'>Explore thousands of courses designed to help you grow your skills in AI, Business, technology, and more.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
            </div>
            <div>
                <section className='bg-gray-100 py-20 '>
                    <h1 className='capitalize text-5xl text-center'>Real skills for real careers</h1>
                    <div className="max-w-screen-2xl mx-auto mt-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
                        <img src={girlie} alt="girl background" className='w-full max-w-3xl' />
                        <div className="w-full flex justify-center items-center">
                            <Carousel/>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <aside className="py-20">
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:my-10">
                        <div className="rounded-3xl overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-4 bg-aside/60">
                                <div className='w-full lg:max-w-xl flex py-12  justify-center'>
                                    <div className="py-12 md:py-0 max-w-lg  md:text-sm flex flex-col items-center justify-center px-8 gap-4">
                                        <h2 className=' font-medium text-4xl'>Crafted for all</h2>
                                        <p className='leading-snug text-2xl text-center lg:text-lg'>From students and professionals to entrepreneurs and lifelong learners, discover courses designed to help you learn, grow, and succeed—wherever your journey begins.</p>
                                    </div>
                                </div>
                                {topImages.map((image) => (
                                    <img
                                        key={image}
                                        src={image}
                                        className="w-full h-64 lg:h-full object-cover"
                                        alt=""
                                    />
                                ))}

                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-5">
                                {bottomImages.map((image) => (
                                    <img
                                        key={image}
                                        src={image}
                                        className="w-full h-64 lg:h-full object-cover"
                                        alt=""
                                    />
                                ))}
                                <div className="flex flex-col md:text-sm items-center justify-center bg-asidetwo p-8 text-center">
                                    <p className='capitalize '>We train students of all</p>
                                    <h2 className=' font-medium text-4xl'>Career paths</h2>
                                </div>
                                <img src={bot4} className="w-full h-64 lg:h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            <div>
                <div className='flex justify-center py-20 bg-vercity/5'>
                    <div className='flex flex-col gap-10 justify-center items-center'>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-medium text-3xl md:text-5xl text-vercity'>Become An Instructor With Us</h1>
                            <p className='text-lg text-center'>Join Our Online Teaching Community. Change thousands of lives</p>

                        </div>
                        <div><button className='text-white text-3xl font-semibold bg-vercity/0 p-px rounded-lg h-20 w-56 hover:bg-linear-to-r from-green-500 via-blue-500 to-red-500 transition ease-in-out duration-400 group '><div className='text-white text-3xl font-semibold h-full w-full rounded-lg flex items-center justify-center bg-adva group-hover:bg-linear-to-bl group-hover:from-vercity group-hover:to-advbut  group-hover:transition group-hover:ease-in-out group-hover:duration-300'>
                            Get Started</div></button>
                        </div>




                    </div>
                </div>
            </div>
            <div className="advance h-125 bg-adva flex flex-col justify-center ">
                <h1 className='text-white mt-8 max-w-7xl mx-auto px-6 font-bold text-3xl'>Explore More Skills</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20  w-7/8 m-auto'>
                    <div className='flex flex-col items-center text-white'><h1>Product Design</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Digital Marketing</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Data Analysis</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Product Management</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Web Development</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Mobile Development</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Game Development</h1></div>
                    <div className='flex flex-col items-center text-white'><h1>Entrepreneurship</h1></div>
                </div>
            </div>

            <Footer />



        </div>

    )
}
