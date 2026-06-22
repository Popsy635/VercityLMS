import { Nav } from '../Components/Nav'

import IMG2 from '../assets/IMG2.png'
import IMG1 from '../assets/IMG1.png'
import IMG3 from '../assets/IMG3.png'
import IMG4 from '../assets/IMG4.png'

import cert from '../assets/cert.svg'
import explore from '../assets/explore.svg'
import path from '../assets/path.svg'
import girlie from '../assets/girlie.png'

import {Carousel} from '../Components/html/Carousel';
import bot1 from '../assets/bot1.png'
import bot2 from '../assets/bot2.png'
import bot3 from '../assets/bot3.png'
import bot4 from '../assets/bot4.png'
import top1 from '../assets/top1.png'
import top2 from '../assets/top2.png'
import top3 from '../assets/top3.png'
import { Link } from 'react-router-dom'






const icons = { explore, path, cert }

const heroImages = { IMG1, IMG2, IMG3, IMG4 }



export function Home() {

  return (
    <>

     <Nav />
      <div className='flex flex-row items-center  justify-around mx-auto px-20 -mt-10 h-screen'>
            <div className="Master basis-3xl ">
                <h1 className='font-bold text-6xl leading-20 mb-4'>Master Skills <span className='font-normal text-gray-500'>For Professional</span> <span className='text-vercity'>Growth</span></h1>
                <p className='text-xl leading-8 mb-7'>Discover Career Accelerators, where industry-relevant <br />skills and hands-on experience prepare you for career success.</p>
                <Link to= "/Login">
                    <button className='text-white text-3xl font-semibold bg-vercity/0 p-px rounded-lg h-23 w-70 hover:bg-linear-to-r from-green-500 via-blue-500 to-red-500 transition ease-in-out duration-400 group '><div className='text-white text-3xl font-semibold h-full w-full rounded-lg flex items-center justify-center bg-adva group-hover:bg-linear-to-bl group-hover:from-vercity group-hover:to-advbut  group-hover:transition group-hover:ease-in-out group-hover:duration-300'>
                        Start Learning</div></button>
                </Link>
            </div>

            <div className='basis-2xl float-right -mr-2'>
                <div className="heroimg ">

                    <div className='grid grid-cols-2 gap-4 '>
                        <img src={heroImages.IMG1} alt="" className="rounded-xl h-70 w-70" />
                        <img src={heroImages.IMG2} alt="" className="rounded-xl h-70 w-70" />
                        <img src={heroImages.IMG3} alt="" className="rounded-xl h-70 w-70" />
                        <img src={heroImages.IMG4} alt="" className="rounded-xl h-70 w-70" />


                    </div>

                </div>
            </div>

            

        </div>
      <div>
            <section className='bg-vercity/8 flex flex-col justify-center gap-10 h-100'>

                <h2 className=' font-semibold text-4xl mx-15'>Transform your career</h2>
                <div className="explore mx-20 ">
                    <div className="section-container mx-5 grid grid-cols-3 gap-40">

                        <div className='flex flex-col gap-2'>
                            <div><img src={icons.explore} alt="explore icon" className='w-10 h-10'/></div>
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


            </section>
        </div>
      <div>
      <section className='bg-gray-100 pt-20 '>
        <h1 className='capitalize text-5xl text-center'>Real skills for real careers</h1>
        <div className="container pt-20 pb-10 flex justify-center items-center  gap-4 ">
          <img src={girlie} alt="girl background" className='w-3xl' />
        <Carousel />
        </div>
      </section>
    </div>
<div>
            <aside className='h-180 flex flex-col justify-center'>
                <div className="aside-container h-130 w-7/8 mx-auto rounded-3xl flex flex-col justify-center overflow-hidden">
                    <div className="top flex w-fit h-fit bg-aside/60 box-border">
                        <div className='w-lg flex flex-col justify-center'>
                            <div className='w-90 mx-auto flex flex-col gap-2'>
                                <h2 className=' font-medium text-4xl'>Crafted for all</h2>
                                <p className='leading-snug line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur magnam blanditiis enim perspiciatis voluptatem dignissimos, debitis ad quidem tempora quaerat!</p>
                            </div>
                        </div>
                        <img src={top1} alt="" className='object-cover'/>
                        <img src={top2} alt="" className='object-cover'/>
                        <img src={top3} alt=""className='object-cover' />

                    </div>
                    <div className="bottom flex">
                        <img src={bot1} alt="" className='object-cover'/>
                        <img src={bot2} alt="" className='object-cover'/>
                        <img src={bot3} alt="" className='object-cover'/>
                        <div className='w-lg flex flex-col bg-asidetwo justify-center items-center'>
                            <p className='capitalize '>We train students of all</p>
                            <h2 className=' font-medium text-4xl'>Career paths</h2>
                        </div>
                        <img src={bot4} alt="" />
                    </div>
                </div>
            </aside>
        </div>
      <div>
      <div className='flex justify-center mt-20'>
        <div className='flex gap-40 justify-between w-314px'>
          <div className='flex flex-col  gap-4'>
            <h1 className='font-medium text-[54px] leading-15'>Become An <br />Instructor</h1>
            <p className='text-xl'>Join and teach with us. Change <br />thousands of lives</p>
            <button className='text-white text-3xl font-semibold bg-vercity/0 p-px rounded-lg h-20 w-57 hover:bg-linear-to-r from-green-500 via-blue-500 to-red-500 transition ease-in-out duration-400 group '><div className='text-white text-3xl font-semibold h-full w-full rounded-lg flex items-center justify-center bg-adva group-hover:bg-linear-to-bl group-hover:from-vercity group-hover:to-advbut  group-hover:transition group-hover:ease-in-out group-hover:duration-300'>
              Get Started</div></button>          </div>
        
          <div className='mt-5 mb-1'> <svg width="742" height="394" viewBox="0 0 742 394" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_153_378)">
<path d="M611.223 392.062H475.893C475.893 392.062 473.15 351.823 489.38 351.366C505.611 350.909 503.782 369.199 524.127 344.05C544.472 318.901 569.161 320.273 572.361 335.133C575.562 349.994 566.189 361.883 583.334 358.225C600.479 354.567 625.168 364.169 611.223 392.062Z" fill="#F2F2F2"/>
<path d="M608.339 361.706C598.374 360.805 588.379 363.063 579.767 368.158C571.156 373.253 564.366 380.929 560.358 390.098C559.593 391.854 562.181 393.386 562.953 391.615C566.689 382.897 573.098 375.592 581.257 370.756C589.415 365.92 598.899 363.804 608.339 364.712C610.265 364.886 610.253 361.879 608.339 361.706Z" fill="white"/>
<path d="M488.354 352.986C492.682 358.011 495.946 363.861 497.95 370.183C499.955 376.504 500.657 383.167 500.015 389.768C499.826 391.692 502.833 391.679 503.02 389.768C503.665 382.772 502.886 375.718 500.731 369.031C498.575 362.344 495.088 356.163 490.479 350.86C489.206 349.399 487.088 351.533 488.354 352.986Z" fill="white"/>
<path d="M562.332 326.621C553.442 341.587 546.537 357.648 541.792 374.397C540.445 379.162 539.278 383.973 538.293 388.829C537.908 390.718 540.805 391.525 541.191 389.628C544.621 372.75 550.244 356.392 557.918 340.973C560.095 336.609 562.431 332.331 564.928 328.138C565.113 327.794 565.157 327.393 565.052 327.017C564.947 326.642 564.7 326.322 564.363 326.125C564.026 325.928 563.626 325.87 563.248 325.962C562.869 326.055 562.541 326.291 562.332 326.621Z" fill="white"/>
<path d="M670.321 143.148V248.787H383.782C382.602 248.788 381.433 248.555 380.342 248.104C379.251 247.652 378.26 246.99 377.425 246.155C376.59 245.32 375.928 244.329 375.477 243.238C375.025 242.147 374.793 240.977 374.793 239.797V134.157H661.331C662.512 134.157 663.681 134.389 664.772 134.841C665.862 135.292 666.854 135.955 667.688 136.79C668.523 137.624 669.185 138.616 669.637 139.707C670.089 140.798 670.321 141.967 670.321 143.148Z" fill="#6C63FF"/>
<path d="M740.808 394H1.19327C0.877515 393.999 0.575012 393.873 0.352062 393.649C0.129112 393.426 0.00390625 393.123 0.00390625 392.807C0.00390625 392.491 0.129112 392.188 0.352062 391.965C0.575012 391.741 0.877515 391.615 1.19327 391.614H740.808C741.124 391.614 741.427 391.74 741.651 391.963C741.875 392.187 742.001 392.491 742.001 392.807C742.001 393.123 741.875 393.427 741.651 393.651C741.427 393.874 741.124 394 740.808 394Z" fill="#3F3D56"/>
<path d="M537.583 248.787H535.58V393.064H537.583V248.787Z" fill="#3F3D56"/>
<path d="M690.356 249.789H382.807C380.417 249.786 378.125 248.836 376.435 247.145C374.745 245.455 373.794 243.163 373.791 240.772V111.524C373.794 109.133 374.745 106.842 376.435 105.151C378.125 103.461 380.417 102.51 382.807 102.507H690.356C692.747 102.51 695.038 103.461 696.728 105.151C698.419 106.842 699.37 109.133 699.372 111.524V240.772C699.37 243.163 698.419 245.455 696.728 247.145C695.038 248.836 692.747 249.786 690.356 249.789ZM382.807 104.511C380.948 104.513 379.165 105.252 377.851 106.567C376.536 107.882 375.797 109.665 375.795 111.524V240.772C375.797 242.631 376.536 244.414 377.851 245.729C379.165 247.044 380.948 247.783 382.807 247.785H690.356C692.215 247.783 693.998 247.044 695.312 245.729C696.627 244.414 697.367 242.631 697.369 240.772V111.524C697.367 109.665 696.627 107.882 695.312 106.567C693.998 105.252 692.215 104.513 690.356 104.511H382.807Z" fill="#3F3D56"/>
<path d="M605.204 170.637H423.88C423.083 170.637 422.319 170.321 421.755 169.757C421.192 169.193 420.875 168.429 420.875 167.632C420.875 166.835 421.192 166.07 421.755 165.506C422.319 164.943 423.083 164.626 423.88 164.626H605.204C606.001 164.626 606.766 164.943 607.329 165.506C607.893 166.07 608.209 166.835 608.209 167.632C608.209 168.429 607.893 169.193 607.329 169.757C606.766 170.321 606.001 170.637 605.204 170.637Z" fill="white"/>
<path d="M605.204 195.685H423.88C423.083 195.685 422.319 195.369 421.755 194.805C421.192 194.241 420.875 193.477 420.875 192.68C420.875 191.883 421.192 191.118 421.755 190.554C422.319 189.991 423.083 189.674 423.88 189.674H605.204C606.001 189.674 606.766 189.991 607.329 190.554C607.893 191.118 608.209 191.883 608.209 192.68C608.209 193.477 607.893 194.241 607.329 194.805C606.766 195.369 606.001 195.685 605.204 195.685Z" fill="white"/>
<path d="M605.204 220.733H423.88C423.083 220.733 422.319 220.417 421.755 219.853C421.192 219.289 420.875 218.525 420.875 217.728C420.875 216.931 421.192 216.166 421.755 215.602C422.319 215.039 423.083 214.722 423.88 214.722H605.204C606.001 214.722 606.766 215.039 607.329 215.602C607.893 216.166 608.209 216.931 608.209 217.728C608.209 218.525 607.893 219.289 607.329 219.853C606.766 220.417 606.001 220.733 605.204 220.733Z" fill="white"/>
<path d="M698.081 136.019C716.265 136.019 731.007 121.276 731.007 103.089C731.007 84.9028 716.265 70.1597 698.081 70.1597C679.897 70.1597 665.156 84.9028 665.156 103.089C665.156 121.276 679.897 136.019 698.081 136.019Z" fill="#CCCCCC"/>
<path d="M698.218 113.003L681.741 96.524C681.207 95.9864 680.908 95.259 680.909 94.5012C680.91 93.7434 681.212 93.017 681.748 92.4812C682.284 91.9453 683.01 91.6437 683.768 91.6424C684.525 91.6411 685.253 91.9403 685.79 92.4743L697.944 104.63L736.727 60.3974C737.228 59.8275 737.935 59.4798 738.692 59.4306C739.449 59.3814 740.195 59.6347 740.765 60.135C741.336 60.6353 741.684 61.3417 741.734 62.0988C741.784 62.856 741.532 63.6021 741.032 64.1732L698.218 113.003Z" fill="#6C63FF"/>
<path d="M146.93 77.451C146.93 77.451 167.22 64.6347 186.442 79.5871L199.257 213.09C199.257 213.09 151.202 250.471 139.455 215.226L146.93 77.451Z" fill="#E6E6E6"/>
<path d="M141.977 380.892L129.695 380.891L125.604 333.686L141.979 333.513L141.977 380.892Z" fill="#A66D44"/>
<path d="M120.922 377.381H144.608V392.297H106.009C106.009 390.338 106.395 388.399 107.144 386.589C107.893 384.779 108.992 383.135 110.377 381.75C111.762 380.365 113.406 379.266 115.215 378.517C117.025 377.767 118.964 377.381 120.922 377.381Z" fill="#2F2E41"/>
<path d="M186.37 380.892L198.652 380.891L204.495 333.512L186.368 333.513L186.37 380.892Z" fill="#A66D44"/>
<path d="M222.338 392.296L183.738 392.298L183.738 377.382L207.424 377.381C211.379 377.381 215.172 378.952 217.969 381.75C220.766 384.547 222.338 388.34 222.338 392.296Z" fill="#2F2E41"/>
<path d="M115.428 213.624L126.107 372.76L142.659 372.226L164.55 244.597L184.84 370.624L204.062 371.692L209.402 207.216C209.402 207.216 128.242 189.06 115.428 213.624Z" fill="#2F2E41"/>
<path d="M165.818 63.9418C179.407 63.9418 190.423 52.9244 190.423 39.3336C190.423 25.7429 179.407 14.7254 165.818 14.7254C152.229 14.7254 141.213 25.7429 141.213 39.3336C141.213 52.9244 152.229 63.9418 165.818 63.9418Z" fill="#A66D44"/>
<path d="M150.668 72.6449L144.261 76.917C144.261 76.917 117.564 76.917 115.428 92.9374C113.292 108.958 107.419 218.43 113.826 218.43C120.233 218.43 121.301 209.886 121.301 209.886C121.301 209.886 125.573 210.954 134.116 219.498C142.659 228.043 147.998 228.043 151.202 215.226C154.406 202.41 175.763 104.152 155.473 85.9952L150.668 72.6449Z" fill="#988CE9"/>
<path d="M181.637 72.6449L188.044 76.917C188.044 76.917 214.741 76.917 216.877 92.9374C219.013 108.958 224.886 218.43 218.479 218.43C212.071 218.43 211.003 209.886 211.003 209.886C211.003 209.886 206.732 210.954 198.189 219.498C189.646 228.043 184.306 228.043 181.103 215.226C177.899 202.41 156.541 104.152 176.831 85.9952L181.637 72.6449Z" fill="#988CE9"/>
<path d="M145.854 54.3383C144.025 52.4105 142.811 49.9822 142.366 47.3623C141.921 44.7424 142.265 42.0493 143.355 39.6256C144.445 37.2018 146.23 35.157 148.485 33.7512C150.74 32.3454 153.362 31.6422 156.018 31.7309C159.42 31.8447 162.626 33.2373 165.873 34.2592C170.794 35.9335 176.045 36.4064 181.186 35.6383C186.357 34.8352 191.024 32.0792 194.225 27.9378C197.269 23.7533 198.219 17.9493 196.068 13.2425C193.585 7.80862 187.786 4.8145 182.33 2.38173C180.13 1.28008 177.78 0.50784 175.355 0.0897883C174.14 -0.111976 172.897 -0.0607472 171.703 0.240269C170.509 0.541285 169.39 1.08561 168.416 1.83914C166.883 3.15796 165.985 5.14028 164.316 6.28321C162.438 7.56976 159.999 7.53599 157.734 7.76276C152.632 8.27354 147.806 10.3257 143.899 13.6462C139.992 16.9668 137.188 21.3984 135.86 26.3516C134.532 31.3048 134.744 36.5448 136.467 41.3748C138.19 46.2048 141.342 50.3957 145.504 53.3902" fill="black"/>
<path d="M229.666 230.117C230.817 229.044 231.719 227.732 232.308 226.273C232.897 224.814 233.158 223.243 233.075 221.672C232.991 220.101 232.564 218.567 231.823 217.179C231.083 215.79 230.047 214.581 228.789 213.637L228.499 185.396L213.722 188.199L213.173 216.34C211.727 218.559 211.144 221.232 211.536 223.852C211.928 226.472 213.268 228.857 215.301 230.555C217.334 232.254 219.919 233.147 222.567 233.066C225.215 232.986 227.741 231.936 229.666 230.117Z" fill="#A66D44"/>
<path d="M126.482 225.108C127.633 224.035 128.534 222.723 129.123 221.263C129.712 219.804 129.974 218.234 129.89 216.662C129.807 215.091 129.379 213.557 128.639 212.169C127.898 210.781 126.863 209.572 125.604 208.627L125.315 180.386L110.538 183.19L109.989 211.33C108.542 213.549 107.96 216.222 108.352 218.842C108.744 221.462 110.083 223.848 112.116 225.546C114.149 227.244 116.735 228.138 119.382 228.057C122.03 227.976 124.556 226.927 126.482 225.108Z" fill="#A66D44"/>
<path d="M213.139 91.3353L216.981 93.7702C216.981 93.7702 232.795 154.341 232.895 195.468C232.895 195.468 212.071 205.614 208.867 198.138C205.664 190.662 213.139 91.3353 213.139 91.3353Z" fill="#988CE9"/>
<path d="M119.166 91.3353L115.323 93.7702C115.323 93.7702 101.562 154.341 105.283 194.934C105.283 194.934 127.175 205.08 130.378 197.604C133.582 190.128 119.166 91.3353 119.166 91.3353Z" fill="#988CE9"/>
</g>
<defs>
<clipPath id="clip0_153_378">
<rect width="742" height="394" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
          
        </div>
      </div>
    </div>
      <div className="advance h-125 bg-adva flex flex-col justify-center ">
        <div className='w-10/12 flex flex-col items-center gap-6 mx-auto'>
          <h1 className='text-white font-normal text-6xl/snug text-center'>Advance Your Career With Our 100% Online Learning Programs Today!</h1>
          
          <Link to="/Login">
              <button className='text-white text-3xl font-semibold bg-vercity/0 p-px rounded-lg h-23 w-79 hover:bg-linear-to-r from-green-500 via-blue-500 to-red-500 transition ease-in-out duration-400 group '><div className='text-white text-3xl font-semibold h-full w-full rounded-lg flex items-center justify-center bg-advbut group-hover:bg-linear-to-bl group-hover:from-vercity group-hover:to-advbut  group-hover:transition group-hover:ease-in-out group-hover:duration-300'>
                Start Learning</div></button>
          </Link>
        </div>
      </div>
       <div className='footer bg-vercity h-162.5 flex flex-col'>
            <div className="footWrapper h-137.5 w-6/7 m-auto mt-20 flex ">
                <div className='w-10/12 flex flex-col items-center gap-4 '>
                    <h1 className='text-white font-semibold text-2xl mr-16'>Vercity</h1>
                    <ul className='gap-4 flex text-sm flex-col'>
                        <li className='text-white'><a href="">About</a></li>
                        <li className='text-white'><a href="">What We Offer</a></li>
                        <li className='text-white'><a href="">Career</a></li>
                        <li className='text-white'><a href="">Professional Certificate</a></li>
                        <li className='text-white'><a href="">Degree</a></li>
                        <li className='text-white'><a href="">Contact Us</a></li>
                    </ul>
                </div>
                <div className='w-10/12 flex flex-col text-sm items-center gap-4 '>
                    <h1 className='text-white font-semibold text-2xl'>Community</h1>
                    <ul className='gap-4 flex flex-col'>
                        <li className='text-white'><a href="">Contact Us</a></li>
                        <li className='text-white'><a href="">Resources</a></li>
                        <li className='text-white'><a href="">Privacy Policy</a></li>
                        <li className='text-white'><a href="">Terms & Conditions</a></li>
                        <li className='text-white'><a href="">Teach on Vercity</a></li>
                        <li className='text-white'><a href="">Help and Support</a></li>
                        <li className='text-white'><a href="">Documentation</a></li>
                        <li className='text-white'><a href="">Security</a></li>
                    </ul>
                </div>

                <div className='w-10/12 flex flex-col text-sm items-center gap-4 '>
                    <h1 className='text-white font-semibold text-2xl mr-13'>More</h1>
                    <ul className='gap-4 flex flex-col'>
                        <li className='text-white'><a href="">Discover</a></li>
                        <li className='text-white'><a href="">FAQ</a></li>
                        <li className='text-white'><a href="">Plans and Pricing</a></li>
                        <li className='text-white'><a href="">Help Centre</a></li>
                    </ul>
                </div>
            </div>

            <div className='w-6/7 m-auto text-white text-sm mb-20 border-t-2 border-white '>
                <div className='h-15 flex justify-center-safe'>
                    <div className='w-5/6 flex flex-row justify-between items-center '>
                        <p>
                            ©2026 Vercity All Rights Reserved
                        </p>
                        <div className='flex gap-10'>
                            <div className='appleLogo'><a href="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Apple--Streamline-Svg-Logos" height="24" width="24">
                                    <desc>
                                        Apple Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <path fill="#FFFFFF" d="M18.41345 12.7348c0.033025 3.5563 3.119825 4.73975 3.154025 4.75485 -0.0261 0.083475 -0.493225 1.686525 -1.626275 3.342375 -0.979475 1.431575 -1.996025 2.8579 -3.597425 2.887425 -1.573525 0.029 -2.079475 -0.9331 -3.878475 -0.9331 -1.798425 0 -2.3606 0.903575 -3.8501 0.9621 -1.54575 0.0585 -2.7228 -1.54805 -3.710425 -2.974375C2.886725 17.8565 1.3445 12.529675 3.4153 8.933975c1.02875 -1.78565 2.867175 -2.916375 4.8626 -2.945375 1.5179 -0.02895 2.9506 1.021175 3.878475 1.021175 0.927325 0 2.66835 -1.262875 4.49865 -1.0774 0.7662 0.031875 2.917 0.3095 4.298075 2.33105 -0.111275 0.068975 -2.566325 1.4982 -2.53965 4.471375Zm-2.95725 -8.732675C16.27685 3.008775 16.8292 1.6259225 16.6785 0.25c-1.182875 0.0475425 -2.613275 0.78825 -3.46175 1.7810625 -0.760375 0.8791875 -1.4263 2.2863625 -1.246625 3.6350625 1.318475 0.102 2.6654 -0.67 3.486075 -1.664Z" stroke-width="0.25"></path>
                                </svg>
                            </a></div>
                            <div className='facebook'>
                                <a href="">
                                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Facebook--Streamline-Simple-Icons" height="24" width="24">
                                        <desc>
                                            Facebook Streamline Icon: https://streamlinehq.com
                                        </desc>
                                        <title>Facebook</title>
                                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0 -4.085 1.848 -5.978 5.858 -5.978 0.401 0 0.955 0.042 1.468 0.103a8.68 8.68 0 0 1 1.141 0.195v3.325a8.623 8.623 0 0 0 -0.653 -0.036 26.805 26.805 0 0 0 -0.733 -0.009c-0.707 0 -1.259 0.096 -1.675 0.309a1.686 1.686 0 0 0 -0.679 0.622c-0.258 0.42 -0.374 0.995 -0.374 1.752v1.297h3.919l-0.386 2.103 -0.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0 -6.627 -5.373 -12 -12 -12s-12 5.373 -12 12c0 5.628 3.874 10.35 9.101 11.647Z" fill="#FFFFFF" stroke-width="1"></path>
                                    </svg>
                                </a>
                            </div>
                            <div className='gmailLogo'>
                                <a href="">
                                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Gmail--Streamline-Simple-Icons" height="24" width="24">
                                        <desc>
                                            Gmail Streamline Icon: https://streamlinehq.com
                                        </desc>
                                        <title>Gmail</title>
                                        <path d="M24 5.457v13.909c0 0.904 -0.732 1.636 -1.636 1.636h-3.819V11.73L12 16.64l-6.545 -4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0 -2.023 2.309 -3.178 3.927 -1.964L5.455 4.64 12 9.548l6.545 -4.91 1.528 -1.145C21.69 2.28 24 3.434 24 5.457z" fill="#FFFFFF" stroke-width="1"></path>
                                    </svg>
                                </a>
                            </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>



    </>

  )
}
