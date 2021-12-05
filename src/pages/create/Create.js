import Select from 'react-select'

// css
import { useState } from 'react'
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'business', label: 'Business' },
]

export default function Create() {

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a New Project</h2>

      <form className="" onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>

        <label>
          <span>Project Details:</span>
          <textarea 
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            required
          />
        </label>

        <label>
          <span>Set Due Date:</span>
          <input 
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>

        <label>
          <span>Project Category:</span>
          {/* category selector */}
          <Select 
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assign To:</span>
          {/* user selector */}
        </label>

        <button className="btn">Add Project</button>

        {/* { error && <div className="error">{ error }</div> } */}
      </form>
    </div>
  )
}
