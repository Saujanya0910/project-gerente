import { useParams } from 'react-router'
import { useDocument } from '../../hooks/useDocument'
import { Helmet } from 'react-helmet'

// css
import './Project.css'

// components
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
      <Helmet>
        <title>Project Details | ProjectGerente</title>
      </Helmet>

      { isPending && <div className="loading">Loading...</div> }

      { document && 
        <>
          <Projectsummary project={document} />
          <Projectcomments project={document} />
        </>
      }
    </div>
  )
}
