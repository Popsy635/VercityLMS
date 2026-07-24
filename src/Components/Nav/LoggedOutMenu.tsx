import { Link } from "react-router-dom"

export const LoggedOutMenu = () => {
  return (
    <div><div className=' flex items-center gap-3 lg:gap-6'>

                        <Link to="/Login">
                            <button className='text-vercity  border border-vercity rounded-xl px-4 lg:px-6 py-2'>Login</button>
                        </Link>
                        <Link to="/SignUp">
                            <button className='bg-vercity  text-white rounded-xl px-4 lg:px-6 py-2'>Sign Up</button>
                        </Link>
                    </div></div>
  )
}
