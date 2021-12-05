import { useState } from 'react'

// css
import './Signup.css'

export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
  }

  const handleThumbnail = (e) => {
    setThumbnail(null)
    let selectedFile = e.target.files[0]

    // file validations
    if(!selectedFile) {
      setThumbnailError('No file selected')
      return
    }

    if(!selectedFile.type.includes('image')) {
      setThumbnailError('Must be an image file')
      return
    }

    if(!selectedFile.size > 100000) {
      setThumbnailError('File size must be below 100kB')
      return
    }

    setThumbnailError(null)
    setThumbnail(selectedFile)
  }
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        <span>Email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>Password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      <label>
        <span>Display Name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>Profile Thumbnail:</span>
        <input 
          type="file" 
          onChange={handleThumbnail}
        />
        { thumbnailError && <div className="error">{thumbnailError}</div> }
      </label>

      <button className="btn">Submit</button>
    </form>
  )
}
