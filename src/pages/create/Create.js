import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { Helmet } from 'react-helmet'

// css
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'business', label: 'Business' },
  { value: 'communications', label: 'Communications' }
]

export default function Create() {
  // users data collcn
  const { documents } = useCollection('users')
  // projs data doc
  const { addDocument, response } = useFirestore('projects')

  // auth user
  const { user } = useAuthContext()

  // setup nav
  let navigation = useNavigate()
  
  // states
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

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    // category selection validations
    if(!category) {
      setFormError('Please select a project category')
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
      
      return
    }

    // assigned users selection validations
    if(!assignedUsers.length) {
      setFormError('Please select a user to assign the project to')
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
      
      return
    }

    // proj creator details
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    // create assigned users data
    const assignedUsersList = assignedUsers.map(user => {
      return {
        displayName: user.value.displayName,
        id: user.value.id,
        photoURL: user.value.photoURL
      }
    })

    // proj data body to be stored
    const projBody = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(projBody)

    if(!response.error) {
      // on success, redirect
      navigation('/')
    }
  }

  return (
    <div className="create-form">
      <Helmet>
        <title>Add New Project | ProjectGerente</title>
      </Helmet>
      
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
            menuPlacement="auto"
          />
        </label>

        { !response.isPending &&
          <button 
            className="btn"
          >
            Add Project
          </button>
        }

        { response.isPending &&
          <button 
            className="btn"
            disabled
          >
            Processing...
          </button>
        }

        { response.error && 
          <p 
            className="error"
          >
            { response.error }
          </p> 
        }

        { formError && 
          <p 
            className="error"
          >
            { formError }
          </p> 
        }
      </form>
    </div>
  )
}
