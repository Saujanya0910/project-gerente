import { useState } from "react"

const filterList = ['All', 'Mine', 'Development', 'Design', 'Marketing', 'Sales', 'Business']

export default function ProjectFilter() {

  const [currentFilter, setCurrentFilter] = useState('All')

  const handleFilter = (filter) => {
    console.log(filter)
    setCurrentFilter(filter)
  }

  return (
    <div className="project-filter">
      <nav>
        { filterList.map(f => (
          <button 
            key={f}
            onClick={() => handleFilter(f)}
            className={currentFilter === f ? 'active' : ''}
          >
            { f }
          </button>
        )) }
      </nav>
    </div>
  )
}
