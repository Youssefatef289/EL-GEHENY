import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db, isDbConfigured } from './db.js'
import { applyCors, handleOptions, sendJson } from './_utils.js'

export default async function handler(req, res) {
  applyCors(req, res)
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  if (!isDbConfigured() || !db || !process.env.JWT_SECRET) {
    return sendJson(res, 503, { error: 'API not configured' })
  }

  try {
    const { username, password } = req.body || {}
    if (!username || !password) {
      return sendJson(res, 400, { error: 'Missing credentials' })
    }

    const { rows } = await db.execute(
      'SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1',
      [username],
    )

    const admin = rows?.[0]
    if (!admin) {
      return sendJson(res, 401, { error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, admin.password_hash)
    if (!valid) {
      return sendJson(res, 401, { error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { sub: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    )

    return sendJson(res, 200, { token, username: admin.username })
  } catch (err) {
    return sendJson(res, 500, { error: err.message || 'Login failed' })
  }
}
