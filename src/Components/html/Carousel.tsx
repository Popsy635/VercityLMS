import {useState} from 'react'

import image18 from '../../assets/image18.png'
import image19 from '../../assets/image19.png'
import image20 from '../../assets/image20.png'

type Slide = {
    image: string
    title: string
    description: string
}

const slideData: Slide[] = [
    { image: image18, title: 'Data Science', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
    { image: image19, title: 'Product Design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
    { image: image20, title: 'Web Development', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio distinctio illum sint!' },
]

export const Carousel = () => {

    const [slide, setSlide] = useState (0);

    const nextSlide = () => {
        setSlide(slide === slideData.length - 1 ? 0 : slide + 1)
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? slideData.length - 1 : slide - 1)
    };



    return (
        <div className='carousel flex flex-col justify-center items-center h-140 w-140 rounded-3xl relative transition-transform duration-500 ease-in-out' >

            {slideData.map((item, idx) => {
                return (<div className={slide===idx? "slide h-140 w-140 " : "hidden h-140 w-140"} >
                <div key={idx} className='flex justify-center items-end h-140 w-140 rounded-3xl '>
                    <img src={item.image} alt={item.title} className=' w-full h-full object-cover rounded-3xl' />
                    <div className=' w-110   flex flex-col gap-2 absolute -ml-7 mb-10'>
                        <h1 className='text-white font-semibold text-4xl'>{item.title}</h1>
                        <p className='text-white '>{item.description}</p>
                        <button className='bg-white rounded-lg p-2 w-35'>Learn More</button>
                        <div className='flex justify-center gap-6 '>
                            <div className='flex justify-between items-center w-120 mt-5'>
                                
                                <div className='flex gap-2'>
                                    {slideData.map((_, idx) =>{
                                        return( <button key={idx}  onClick={undefined} className= {slide===idx?" bg-white h-2 w-6 rounded-full" : "bg-white h-2 w-2 rounded-full d"  }></button> )
                                    })}
                                </div>

                                <div className='flex absolute right-0 translate-x-20 gap-6'>
                                    <div className='left-arrow cursor-pointer ' onClick={prevSlide}><svg width="88" height="24" viewBox="0 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M79.0003 20.67C78.8103 20.67 78.6203 20.6 78.4703 20.45L71.9503 13.93C70.8903 12.87 70.8903 11.13 71.9503 10.07L78.4703 3.55002C78.7603 3.26002 79.2403 3.26002 79.5303 3.55002C79.8203 3.84002 79.8203 4.32002 79.5303 4.61002L73.0103 11.13C72.5303 11.61 72.5303 12.39 73.0103 12.87L79.5303 19.39C79.8203 19.68 79.8203 20.16 79.5303 20.45C79.3803 20.59 79.1903 20.67 79.0003 20.67Z" fill="#ffffff" />
                                    </svg>
                                    </div>
                                    <div className='right-arrow cursor-pointer' onClick={nextSlide}><svg width="88" height="24" viewBox="0 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z" fill="#ffffff" />
                                    </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
            })}
            


        </div>
    );
}
