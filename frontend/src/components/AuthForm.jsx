import { useState } from 'react'
import { register, login } from '../api.js'

// One form used for both Register and Login.
export default function AuthForm({ mode, onLoggedIn, onRegistered }) {
  const isLogin = mode === 'login'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (isLogin) {
        const data = await login(username, password)
        onLoggedIn(data.token, data.username) // parent stores the JWT in localStorage
      } else {
        await register(username, password)
        setPassword('')
        onRegistered(username)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>{isLogin ? 'Login' : 'Create an account'}</h2>
      <label>Username</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isLogin ? 'current-password' : 'new-password'} required />
      {error && <p className="error">{error}</p>}
      <button disabled={busy}>{busy ? 'Please wait...' : isLogin ? 'Login' : 'Register'}</button>
    </form>
  )
}
