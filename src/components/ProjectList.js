import { Link } from 'react-router-dom'

// components
import Avatar from './Avatar'

// css
import './ProjectList.css'

export default function ProjectList({ projects }) {

  const checkDueDate = (date) => {
    let d1 = Date.parse(date)
    let d2 = Date.parse(new Date().toDateString())

    return d1 > d2
  }

  return (
    <div className="project-list">
      { !projects.length && 
        <p>
          No projects available.
        </p> 
      }
      
      { projects.map(proj => (
          <Link 
            to={`projects/${proj.id}`} 
            key={proj.id}
          >
            {/* proj details */}
            <h4>
              { proj.name }
            </h4>
            <p>
              Due by <span className={`${checkDueDate(proj.dueDate.toDate().toDateString()) ? 'active' : 'expired'}`}>
                {proj.dueDate.toDate().toDateString()}
              </span>
            </p>

            <div className="assigned-to">
              <ul>
                { proj.assignedUsersList.map(user => (
                    <li key={user.photoURL}>
                      <Avatar src={user.photoURL} />
                    </li>
                  )) 
                }
              </ul>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
