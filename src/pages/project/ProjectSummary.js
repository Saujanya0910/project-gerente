import React from 'react';
import { useNavigate } from 'react-router';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import ReactTooltip from 'react-tooltip';

// css
import './Project.css'

const Projectsummary = ({ project }) => {

  const navigate = useNavigate()

  // current user
  const { user } = useAuthContext()

  const { deleteDocument, response } = useFirestore('projects')

  // mark as complete -> delete the doc
  const handleComplete = (e) => {
    deleteDocument(project.id)

    // redirect on success
    if(!response.error) {
      navigate('/')
    }
  }

  const checkDueDate = (date) => {
    let d1 = Date.parse(date)
    let d2 = Date.parse(new Date().toDateString())

    return d1 > d2
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">
          { project.name }
        </h2>

        <p>By { project.createdBy.displayName }</p>

        <p className="due-date">
          Project due by <span className={`${checkDueDate(project.dueDate.toDate().toDateString()) ? 'active' : 'expired'}`}>
            { project.dueDate.toDate().toDateString() }
          </span>
        </p>

        <p className="details">
          { project.details }
        </p>

        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          { project.assignedUsersList.map(user => (
              <div key={user.id}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a data-tip data-for={user.displayName}>
                  <Avatar src={user.photoURL} />
                </a>
                <ReactTooltip place="bottom" id={user.displayName} effect="solid">
                  <span>{ user.displayName }</span>
                </ReactTooltip>
              </div>
            )) 
          }
        </div>
      </div>

      { user.uid === project.createdBy.id && 
        (<button 
          className="btn"
          onClick={handleComplete}
        >
          Mark as Complete
        </button>)
      }
    </div>
  );
}

export default Projectsummary;
