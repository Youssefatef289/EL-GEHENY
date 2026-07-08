import { db, isDbConfigured } from './db.js'
import { applyCors, handleOptions, requireAuth, sendJson } from './_utils.js'

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return {}
}

export default async function handler(req, res) {
  applyCors(req, res)
  if (handleOptions(req, res)) return

  if (!isDbConfigured() || !db) {
    return sendJson(res, 503, { error: 'Database not configured' })
  }

  try {
    if (req.method === 'GET') {
      if (!requireAuth(req, res)) return

      const { rows } = await db.execute(
        'SELECT * FROM inquiries ORDER BY created_at DESC',
      )
      return sendJson(res, 200, { inquiries: rows || [] })
    }

    if (req.method === 'POST') {
      const body = readBody(req)
      const {
        name,
        phone,
        email = null,
        subject = null,
        message = null,
        project_name = null,
        district = null,
        type = 'contact',
      } = body

      if (!name?.trim() || !phone?.trim()) {
        return sendJson(res, 400, { error: 'Name and phone are required' })
      }

      const result = await db.execute(
        `INSERT INTO inquiries (name, phone, email, subject, message, project_name, district, type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name.trim(), phone.trim(), email, subject, message, project_name, district, type],
      )

      return sendJson(res, 201, { success: true, id: result.insertId })
    }

    if (req.method === 'DELETE') {
      if (!requireAuth(req, res)) return
      const body = readBody(req)
      const id = body.id
      if (!id) return sendJson(res, 400, { error: 'Missing id' })

      await db.execute('DELETE FROM inquiries WHERE id = ?', [id])
      return sendJson(res, 200, { success: true })
    }

    return sendJson(res, 405, { error: 'Method not allowed' })
  } catch (err) {
    return sendJson(res, 500, { error: err.message || 'Request failed' })
  }
}
