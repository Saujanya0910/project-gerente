import { useParams } from 'react-router'
import { useDocument } from '../../hooks/useDocument'

// css
import './Project.css'

export default function Project() {
  // fetch url param
  const { id } = useParams()

  const { document, error, isPending } = useDocument('projects', id)

  if(error) { 
    return <div className="error">{ error }</div> 
  }

  return (
    <div className="project-details">
      { isPending && <p>Loading...</p> }

      { document && 
        <div>
          <h2>{ document.name }</h2>
        </div>
      }
    </div>
  )
}
