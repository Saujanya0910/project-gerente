const filterList = ['All', 'Mine', 'Development', 'Design', 'Marketing', 'Sales', 'Business']

export default function ProjectFilter({ currentFilter, changeFilter }) {

  const handleFilter = (filter) => {
    console.log(filter)
    changeFilter(filter)
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
