import { useEffect, useState } from 'react'
import { getProtected } from '../api.js'

// Calls the protected route with the stored JWT.
export default function Protected({ token, username, onLogout, onExpired }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchProtected = async () => {
    setLoading(true)
    setError('')
    try {
      setData(await getProtected(token))
    } catch (err) {
      if (err.status === 401) onExpired(err.message) // invalid/expired token: log the user out
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProtected() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p className="hint">You are logged in. Your JWT is saved in localStorage.</p>
      <div className="result">
        {loading && <p>Loading protected data...</p>}
        {error && <p className="error">{error}</p>}
        {data && (
          <>
            <p><strong>{data.message}</strong></p>
            <p className="hint">Token expires at: {new Date(data.tokenExpiresAt).toLocaleString()}</p>
          </>
        )}
      </div>
      <div className="row">
        <button onClick={fetchProtected} disabled={loading}>Fetch protected route again</button>
        <button className="secondary" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}
