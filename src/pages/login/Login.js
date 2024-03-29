import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Helmet } from 'react-helmet'

// css
import './Login.css'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
  }
  
  return (
    <div>
      <Helmet>
        <title>Log In | ProjectGerente</title>
      </Helmet>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>

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

        { isPending && <button className="btn" disabled>Loading...</button> }
        { !isPending && <button className="btn">Login</button> }
        { error && <div className="error">{ error }</div> }
      </form>
    </div>
  )
}
