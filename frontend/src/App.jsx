import { useState } from 'react'
import AuthForm from './components/AuthForm.jsx'
import Protected from './components/Protected.jsx'

const TOKEN_KEY = 'token'
const USER_KEY = 'username'

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [username, setUsername] = useState(() => localStorage.getItem(USER_KEY) || '')
  const [tab, setTab] = useState('login')
  const [notice, setNotice] = useState('')

  const handleLoggedIn = (newToken, name) => {
    localStorage.setItem(TOKEN_KEY, newToken) // store the JWT in local storage
    localStorage.setItem(USER_KEY, name)
    setToken(newToken)
    setUsername(name)
    setNotice('')
  }

  const handleLogout = (message = '') => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUsername('')
    setTab('login')
    setNotice(typeof message === 'string' ? message : '')
  }

  return (
    <div className="card">
      <h1>JWT Authentication</h1>

      {token ? (
        <Protected token={token} username={username} onLogout={handleLogout} onExpired={handleLogout} />
      ) : (
        <>
          <div className="tabs">
            <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); setNotice('') }}>Login</button>
            <button className={tab === 'register' ? 'active' : ''} onClick={() => { setTab('register'); setNotice('') }}>Register</button>
          </div>
          {notice && <p className="success">{notice}</p>}
          <AuthForm
            key={tab}
            mode={tab}
            onLoggedIn={handleLoggedIn}
            onRegistered={() => { setTab('login'); setNotice('Registration successful! Please log in.') }}
          />
        </>
      )}
    </div>
  )
}
