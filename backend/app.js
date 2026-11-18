import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || true }))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'JWT Auth API is running' }))
app.use('/', authRoutes)

app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }))

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON in request body' })
  console.error(err)
  res.status(500).json({ message: 'Something went wrong on the server' })
})

export default app
