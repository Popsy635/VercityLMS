import logo from '../../assets/Union.svg'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="Vercity Logo" className=' h-10 lg:h-12 ' />
      </Link>
    </div>
  )
}
