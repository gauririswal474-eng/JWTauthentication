import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { users } from '../data/users.js'
import authenticate from '../middleware/auth.js'

const router = Router()

const clean = (v) => (typeof v === 'string' ? v.trim() : '')

// POST /register: accepts username and password, stores the user in the array
router.post('/register', async (req, res, next) => {
  try {
    const username = clean(req.body?.username)
    const password = typeof req.body?.password === 'string' ? req.body.password : ''

    if (username.length < 3) return res.status(400).json({ message: 'Username must be at least 3 characters' })
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })
    if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ message: 'Username already taken' })
    }

    const passwordHash = await bcrypt.hash(password, 10) // never store plain-text passwords
    users.push({ id: users.length + 1, username, passwordHash })
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    next(err)
  }
})

// POST /login: validates credentials and returns a JWT
router.post('/login', async (req, res, next) => {
  try {
    const username = clean(req.body?.username)
    const password = typeof req.body?.password === 'string' ? req.body.password : ''
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' })

    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase())
    const valid = user && (await bcrypt.compare(password, user.passwordHash))
    if (!valid) return res.status(401).json({ message: 'Invalid username or password' })

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    })
    res.json({ message: 'Login successful', token, username: user.username })
  } catch (err) {
    next(err)
  }
})

// GET /protected: only reachable with a valid JWT
router.get('/protected', authenticate, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, you have accessed a protected route!`,
    user: { id: req.user.id, username: req.user.username },
    tokenExpiresAt: new Date(req.user.exp * 1000).toISOString(),
  })
})

export default router
