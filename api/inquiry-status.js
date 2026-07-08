import { db, isDbConfigured } from './db.js'
import { applyCors, handleOptions, requireAuth, sendJson } from './_utils.js'

const VALID_STATUSES = new Set(['new', 'in_progress', 'done'])

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

  if (req.method !== 'PATCH') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  if (!requireAuth(req, res)) return

  if (!isDbConfigured() || !db) {
    return sendJson(res, 503, { error: 'Database not configured' })
  }

  try {
    const { id, status } = readBody(req)
    if (!id || !VALID_STATUSES.has(status)) {
      return sendJson(res, 400, { error: 'Invalid id or status' })
    }

    await db.execute('UPDATE inquiries SET status = ? WHERE id = ?', [status, id])
    return sendJson(res, 200, { success: true })
  } catch (err) {
    return sendJson(res, 500, { error: err.message || 'Update failed' })
  }
}
