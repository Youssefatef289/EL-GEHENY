import jwt from 'jsonwebtoken'

const ALLOWED_ORIGINS = [
  'https://el-geheny.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
]

export function applyCors(req, res) {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS[0])
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Max-Age', '86400')
}

export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    applyCors(req, res)
    res.status(204).end()
    return true
  }
  return false
}

export function sendJson(res, status, body) {
  res.status(status).json(body)
}

export function verifyToken(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token || !process.env.JWT_SECRET) return null
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export function requireAuth(req, res) {
  const user = verifyToken(req)
  if (!user) {
    sendJson(res, 401, { error: 'Unauthorized' })
    return null
  }
  return user
}
