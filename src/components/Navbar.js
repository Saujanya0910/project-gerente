import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// statics
import './Navbar.css'
import Temple from '../assets/temple.svg'
// import ActivityIcon from '../assets/activity_icon.svg'

export default function Navbar() {
  
  const { isPending, logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo" />
          <Link to="/">
            <span>ProjectGerente</span>
          </Link>
        </li>

        { !user &&
          <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          </>
        }

        { !user &&
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        }

        <li>
          { !isPending && user &&
            <button 
              className="btn"
              onClick={logout}
            >
              Logout
            </button>
          }
          { isPending && user &&
            <button 
              className="btn"
              onClick={logout}
              disabled
            >
              Logging out...
            </button>
          }
        </li>
      </ul>
    </div>
  )
}
