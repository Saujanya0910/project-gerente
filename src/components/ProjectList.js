// css
import './ProjectList.css'

export default function ProjectList({ projects }) {
  return (
    <div>
      { !projects.length && 
        <p>
          No projects available.
        </p> 
      }
      
      { projects.map(proj => (
          <div key={proj.id}>
            { proj.name }
          </div>
        ))
      }
    </div>
  )
}
