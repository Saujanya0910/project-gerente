const filterList = ['all', 'created by me', 'assigned to me', 'development', 'design', 'marketing', 'sales', 'business', 'communications']

export default function ProjectFilter({ currentFilter, changeFilter }) {

  const handleFilter = (filter) => {
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
