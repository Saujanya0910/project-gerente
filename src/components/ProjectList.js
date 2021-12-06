import { Link } from 'react-router-dom'

// components
import Avatar from './Avatar'

// css
import './ProjectList.css'

export default function ProjectList({ projects }) {
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
              Due by {proj.dueDate.toDate().toDateString()}
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
