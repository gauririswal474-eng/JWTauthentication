const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, options)
  } catch {
    throw new ApiError('Cannot reach the server. Please try again.', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.message || `Request failed (${res.status})`, res.status)
  return data
}

const json = (body) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

export const register = (username, password) => request('/register', json({ username, password }))
export const login = (username, password) => request('/login', json({ username, password }))

// Sends the stored JWT in the Authorization header
export const getProtected = (token) => request('/protected', { headers: { Authorization: `Bearer ${token}` } })
