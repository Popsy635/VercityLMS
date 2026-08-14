import { Link } from 'react-router-dom'
import { Logo } from '../Nav/Logo'
import { Dropdown } from './Dropdown/Dropdown'
import { SearchBar } from '../Nav/SearchBar'
import useAuth from '../../hooks/useAuth'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedOutMenu } from '../Nav/LoggedOutMenu'
import { LoggedInMenu } from '../Nav/LoggedInMenu'
import axios from '../../api/axios'





export const Nav = () => {

    const { auth, setAuth } = useAuth();

    const isLoggedIn = !!auth.accessToken

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {


            if (auth.accessToken) {
                await axios.post("/auth/logout", {}, {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`
                    },
                });
            }


        } catch (error) {
            console.error("API Logout failed:", error)
        } finally {
            localStorage.removeItem("auth");
            sessionStorage.removeItem("auth");
            setAuth({});
            navigate("/Login");
        }
    };





    return (
        <header className='bg-white shadow-sm  sticky z-10 top-0'>
            <div className='mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 '>

                <nav className='h-20 flex w-full items-center justify-between gap-4 '>
                    <Logo />


                    <div className='hidden md:block'>
                        <Dropdown />
                    </div>




                    <Link to="/Dashboard" className='hidden lg:block'>
                        <button className='text-vercity rounded-lg px-4 py-2 hover:bg-vercity/10'>My Learning</button>
                    </Link>


                    <SearchBar />

                    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className='relative hidden lg:block'>
                        <Link to="/Teach">
                            <button className=''>Teach With Us <span style={{ transform: open ? "scaleX(1)" : "scaleX(0)", }} className='absolute -bottom-2 -left-2 -right-2 h-0.5 origin-left rounded-full bg-vercity transition-transform duration-200 ease-out'></span></button>
                        </Link>
                    </div>

                    {
                        isLoggedIn
                            ? <LoggedInMenu logout={handleLogout} />
                            : <LoggedOutMenu />
                    }


                </nav>


            </div>
        </header>
    )
}
