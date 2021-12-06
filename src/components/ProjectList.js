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
            <h3>
              { proj.name }
              { proj.comments.length > 0 && <span className="material-icons" style={{ margin: '0 15px' }}>comment</span> }
            </h3>
            <p>
              Due by <span className={`${checkDueDate(proj.dueDate.toDate().toDateString()) ? 'active' : 'expired'}`}>
                {proj.dueDate.toDate().toDateString()}
              </span>
              { !checkDueDate(proj.dueDate.toDate().toDateString()) && <span className="material-icons" style={{ margin: '0 15px', color: 'rgb(252, 118, 118)' }}>error_outline</span> }
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
