import Select from 'react-select'

// css
import { useEffect, useState } from 'react'
import './Create.css'
import { useCollection } from '../../hooks/useCollection'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'business', label: 'Business' },
]

export default function Create() {
  
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  // iterate over users doc and form data
  useEffect(() => {
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      
      setUsers(options)
    }

  }, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category) {
      setFormError('Please select a project category')
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
      
      return
    }

    if(!assignedUsers.length) {
      setFormError('Please select at least one user to assign the project to')
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
      
      return
    }

    console.log(name, details, dueDate, category, assignedUsers)
    setFormError(null)
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
          <Select 
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>

        { formError && <p className="error">{ formError }</p> }
        {/* { error && <div className="error">{ error }</div> } */}
      </form>
    </div>
  )
}
