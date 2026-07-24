import logo from '../../assets/Union.svg'
import { Link } from 'react-router-dom'


export const OnboardNav = () => {
   

    return (
        <div className='bg-white flex flex-row items-center justify-center shadow-sm sticky z-20 top-0'>


            <div className=' w-322 mx-auto flex items-center'>
                <nav className='w-full  my-5   flex flex-row items-center justify-between '>
                    <div><Link to="/">
                        <img src={logo} alt="Vercity Logo" className=' h-12 ' />
                    </Link>
                    </div>

                    <div>
                        <Link to="/Teach">
                        <button className='text-vercity'>Exit</button>
                    </Link>
                        
                    </div>
                    
                </nav>
            </div>
        </div>
    )
}
