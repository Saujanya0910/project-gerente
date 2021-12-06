import { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// css
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {

  const { user } = useAuthContext()

  const [currentFilter, setCurrentFilter] = useState('All')

  const { documents, error } = useCollection('projects')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter(doc => {
    switch(currentFilter) {
      case 'All':
        return true

      case 'Mine':
        let assignedToMe = false
        doc.assignedUsersList.forEach(u => {
          if(user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
      case 'business':
        return doc.category === currentFilter

      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      { error && 
        <p 
          className="error"
        >
          { error }
        </p> 
      }

      { documents && 
        <ProjectFilter 
          currentFilter={currentFilter} 
          changeFilter={changeFilter}
        /> 
      }

      { projects && 
        <ProjectList 
          projects={projects} 
        /> 
      }
    </div>
  )
}
