import { Link } from 'react-router-dom'

// css
import './Navbar.css'

import Temple from '../assets/temple.svg'
// import ActivityIcon from '../assets/activity_icon.svg'

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo" />
          <Link to="/">
            <span>ProjectGerente</span>
          </Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/signup">Signup</Link>
        </li>

        <li>
          <button 
            className="btn"
            // onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
