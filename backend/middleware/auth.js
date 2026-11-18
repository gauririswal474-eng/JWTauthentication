import jwt from 'jsonwebtoken'

// Protects a route: requires "Authorization: Bearer <token>" with a valid JWT.
export default function authenticate(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET) // { id, username, iat, exp }
    next()
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired. Please log in again.' : 'Invalid token.'
    res.status(401).json({ message })
  }
}
