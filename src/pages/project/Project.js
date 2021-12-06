import { useParams } from 'react-router'
import { useDocument } from '../../hooks/useDocument'

// css
import './Project.css'
import Projectcomments from './ProjectComments'
import Projectsummary from './ProjectSummary'

export default function Project() {
  // fetch url param
  const { id } = useParams()

  const { document, error, isPending } = useDocument('projects', id)

  if(error) {
    return <div className="error">{ error }</div> 
  }

  return (
    <div className="project-details">
      { isPending && <div className="loading">Loading...</div> }

      { document && 
        <div>
          <Projectsummary project={document} />
          <Projectcomments project={document} />
        </div>
      }
    </div>
  )
}
