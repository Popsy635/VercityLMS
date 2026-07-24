import { OnboardNav } from '../Components/html/OnboardNav'
import { useState } from 'react'

// hot-reload check
export const OnboardOne = () => {
    const [formStep, setFormStep] = useState(0);
    
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const completeFormStep = () => {
        if (!isOptionSelected) return;
        setFormStep(curr => curr + 1)
        setIsOptionSelected(false);
    }

    const previousStep = () => {
        setFormStep(curr => curr - 1)
        setIsOptionSelected(true);
    }

    const renderButton = () => {
        if (formStep > 2) {
            return undefined
        } else if (formStep === 2) {
            return (<div className='flex gap-6'>
                <div >
                    <button onClick={previousStep} className='border-vercity border py-2 w-36.25 rounded-lg cursor-pointer flex items-center justify-center hover:hover:shadow-lg  group'> <span className='absolute translate-y-0.5 -translate-x-10 pl-4'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.57043 18.82C9.38043 18.82 9.19043 18.75 9.04043 18.6L2.97043 12.53C2.68043 12.24 2.68043 11.76 2.97043 11.47L9.04043 5.4C9.33043 5.11 9.81043 5.11 10.1004 5.4C10.3904 5.69 10.3904 6.17 10.1004 6.46L4.56043 12L10.1004 17.54C10.3904 17.83 10.3904 18.31 10.1004 18.6C9.96043 18.75 9.76043 18.82 9.57043 18.82Z" fill="#1D1073" />
                        <path d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z" fill="#1D1073" />
                    </svg>

                    </span>
                        Previous
                    </button>
                </div>
                <div >
                    <button onClick={completeFormStep} className='text-white flex items-center justify-center w-36.25  bg-vercity rounded-lg hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 '>
                        hi
                    </button>
                </div>

            </div>)
        } else {
            return (
                <div >
                    <button className='text-lg text-center text-white flex items-center justify-center w-36.25  bg-pink-300 rounded-lg hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 '>
                        Submit
                    </button>
                </div>
            )
        }
    }



    return (
        <div>
            <OnboardNav />

            <div className='forms h-195 '>
                {/* 1 of 3 */}
                {formStep === 0 && (<section className=' w-321.25 m-auto 0 flex flex-col gap-8 pt-10'>
                    <div className='w-2xl'>
                        <p className='text-xl'>Create engaging, video-based courses that help learners develop practical, real-world skills. Whether you're an experienced instructor or teaching for the first time, we'll support you in transforming your expertise into an online course that makes a meaningful impact.</p>
                    </div>
                    <div className='flex flex-col gap-6 w-xl'>
                        <h1 className='font-medium text-2xl'>
                            what kind of teaching have you done before?
                        </h1>
                        <div className='flex flex-col gap-6'>
                            <ul className='flex flex-col gap-6 '>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)} type="radio" id='op-1' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-1" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                       
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>One on one</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-2' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-2" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                    
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>In Person, Professional</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-3' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-3" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>Online</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-4' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-4" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                        

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>Others</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p>1 of 3 steps</p>
                        <div  className=''>
                            <button  onClick={completeFormStep} className='text-white flex items-center justify-center w-36.25 py-2 pr-5 bg-vercity rounded-lg hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 text-xl'>
                                Next <span className='absolute translate-x-7 pl-2'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4301 18.82C14.2401 18.82 14.0501 18.75 13.9001 18.6C13.6101 18.31 13.6101 17.83 13.9001 17.54L19.4401 12L13.9001 6.46C13.6101 6.17 13.6101 5.69 13.9001 5.4C14.1901 5.11 14.6701 5.11 14.9601 5.4L21.0301 11.47C21.3201 11.76 21.3201 12.24 21.0301 12.53L14.9601 18.6C14.8101 18.75 14.6201 18.82 14.4301 18.82Z" fill="#ffffff" />
                                    <path d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z" fill="#ffffff" />
                                </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </section>)}

                {/* 2 of 3 */}
                {formStep === 1 && (<section className=' w-321.25 m-auto flex flex-col gap-8 pt-10'>

                    <p className='text-xl'>Bring your course ideas to life with confidence. Whether you're a first-time creator or an experienced educator.</p>

                    <div className='flex flex-col gap-6 '>
                        <h1 className='font-medium text-2xl'>
                            How much of a video “pro” are you?
                        </h1>
                        <div className='flex flex-col gap-6 w-xl'>
                            <ul className='flex flex-col gap-6 '>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-1' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-1" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                       
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I'm a beginner</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input type="radio" id='op-2' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-2" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                    
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I don't have much experience</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-3' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-3" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I'm very experienced </label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-4' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-4" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                        

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I have ready videos for upload </label>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className='flex flex-col gap-6'>
                        <p>2 of 3 steps</p>
                        <div className='flex gap-6'>
                            <div >
                                <button onClick={previousStep} className=' flex items-center justify-center w-36.25 py-2 pl-5 border-vercity border rounded-lg hover:shadow-lg hover:ease-in-out hover:duration-300 text-xl text-vercity'> <span className='absolute -translate-x-15 pl-4'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.57043 18.82C9.38043 18.82 9.19043 18.75 9.04043 18.6L2.97043 12.53C2.68043 12.24 2.68043 11.76 2.97043 11.47L9.04043 5.4C9.33043 5.11 9.81043 5.11 10.1004 5.4C10.3904 5.69 10.3904 6.17 10.1004 6.46L4.56043 12L10.1004 17.54C10.3904 17.83 10.3904 18.31 10.1004 18.6C9.96043 18.75 9.76043 18.82 9.57043 18.82Z" fill="#1D1073" />
                                    <path d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z" fill="#1D1073" />
                                </svg>

                                </span>
                                    Previous
                                </button>
                            </div>
                            <div >
                                <button onClick={completeFormStep} className='text-white flex items-center justify-center w-36.25 py-2 pr-5 bg-vercity rounded-lg hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 text-xl'>
                                    Next <span className='absolute translate-x-7 pl-2'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.4301 18.82C14.2401 18.82 14.0501 18.75 13.9001 18.6C13.6101 18.31 13.6101 17.83 13.9001 17.54L19.4401 12L13.9001 6.46C13.6101 6.17 13.6101 5.69 13.9001 5.4C14.1901 5.11 14.6701 5.11 14.9601 5.4L21.0301 11.47C21.3201 11.76 21.3201 12.24 21.0301 12.53L14.9601 18.6C14.8101 18.75 14.6201 18.82 14.4301 18.82Z" fill="#ffffff" />
                                        <path d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z" fill="#ffffff" />
                                    </svg>
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </section>)}

                {/* 3 of 3 */}
                {formStep === 2 && (<section className=' w-321.25 m-auto  flex flex-col gap-8 pt-10'>

                    <p className='text-xl'>Publish your course, grow your audience, and reach more learners through our marketplace and your own marketing. We'll help connect your course with the right students.</p>

                    <div className='flex flex-col gap-6 '>
                        <h1 className='font-medium text-2xl'>
                            Do you have an audience to share your courses with?
                        </h1>
                        <div className='flex flex-col gap-6 w-xl'>
                            <ul className='flex flex-col gap-6 '>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-1' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-1" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                       
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I do not</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-2' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-2" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                    
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I don't have much experience</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-3' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-3" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                        before:duration-300
                                        before:ease-in

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I have a little following</label>
                                </li>
                                <li className=' flex gap-4  items-center text-lg w-full'>
                                    <input onChange={()=>setIsOptionSelected(true)}  type="radio" id='op-4' name='form-options' className='hidden peer' />
                                    <label htmlFor="op-4" className='cursor-pointer relative text-lg select-none transition-colors w-full  pl-13 p-4 duration-300 ease-in
                                        rounded-lg border border-gray-400 
                                        hover:bg-gray-400
                                        hover:text-white

                                        before:content-[""] before:absolute before:left-5 before:top-1/2  before:rounded-full
                                         before:-translate-y-1/2 
                                        before:transition-all
                                        
                                       
                                        before:w-5
                                        before:h-5
                                        before:border-2
                                        before:border-gray-500
                                        
                                        

                                        after:content-[""] 
                                        after:absolute after:left-3.5 after:top-1/2 after:w-2 after:h-2
                                        after:bg-adva
                                        after:scale-0
                                        after:transition-transform
                                        after:duration-300
                                        after:ease-in after:rounded-full after:-translate-y-1/2 
                                        after:translate-x-3
                                        
                                        peer-not-checked:hover:before:border-white
                                        peer-checked:before:bg-white/0
                                        peer-checked:before:border-vercity
                                        peer-checked:after:scale-100
                                        '>I have a good following </label>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className='flex flex-col gap-6'>
                        <p>3 of 3 steps</p>
                        <div className='flex gap-6'>
                            <div >
                                <button onClick={previousStep} className=' flex items-center justify-center w-36.25 py-2 pl-5 border-vercity border rounded-lg hover:shadow-lg hover:ease-in-out hover:duration-300 text-xl text-vercity'> <span className='absolute -translate-x-15 pl-4'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.57043 18.82C9.38043 18.82 9.19043 18.75 9.04043 18.6L2.97043 12.53C2.68043 12.24 2.68043 11.76 2.97043 11.47L9.04043 5.4C9.33043 5.11 9.81043 5.11 10.1004 5.4C10.3904 5.69 10.3904 6.17 10.1004 6.46L4.56043 12L10.1004 17.54C10.3904 17.83 10.3904 18.31 10.1004 18.6C9.96043 18.75 9.76043 18.82 9.57043 18.82Z" fill="#1D1073" />
                                    <path d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z" fill="#1D1073" />
                                </svg>

                                </span>
                                    Previous
                                </button>
                            </div>
                            <div  >
                                <button  onClick={completeFormStep} className='text-white flex items-center justify-center w-36.25 py-2 bg-vercity rounded-lg hover:bg-linear-to-bl hover:from-vercity hover:to-advbut  hover:transition hover:ease-in-out hover:duration-300 text-xl'>
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </section>)}

                {/* complete*/}
                {formStep === 3 && (<section className=' w-321.25   m-auto   gap-8 pt-10 h-195'>
                     <div className='flex flex-col justify-center items-center gap-6 h-80  rounded-xl shadow-2xl inset-shadow-2xl'>
                        <h1 className='font-bold text-3xl'>
                            Congratulations! Your submission was successful. Your review is underway.
                        </h1>
                        

                    </div>
                    <div className='flex flex-col gap-6'>
                        

                        {renderButton()}
                    </div>
                </section>)}



            </div>

        </div>
    )
}
