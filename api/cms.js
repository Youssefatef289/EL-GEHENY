import { db, isDbConfigured } from './db.js'
import { applyCors, handleOptions, sendJson } from './_utils.js'
import { parseRow } from './_dbHelpers.js'

const TABLE_QUERIES = {
  projects: 'SELECT * FROM projects ORDER BY sort_order',
  services: 'SELECT * FROM services ORDER BY sort_order',
  blog_posts: 'SELECT * FROM blog_posts ORDER BY sort_order',
  site_settings: "SELECT * FROM site_settings WHERE id = 'main' LIMIT 1",
  translations: "SELECT * FROM translations WHERE id = 'main' LIMIT 1",
}

export default async function handler(req, res) {
  applyCors(req, res)
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  if (!isDbConfigured() || !db) {
    return sendJson(res, 503, { error: 'Database not configured' })
  }

  const table = req.query?.table
  const sql = TABLE_QUERIES[table]
  if (!sql) {
    return sendJson(res, 400, { error: 'Invalid table' })
  }

  try {
    const { rows } = await db.execute(sql)
    const list = rows || []

    if (table === 'site_settings' || table === 'translations') {
      return sendJson(res, 200, { data: parseRow(table, list[0] || null) })
    }

    return sendJson(res, 200, { data: list.map((row) => parseRow(table, row)) })
  } catch (err) {
    return sendJson(res, 500, { error: err.message || 'Read failed' })
  }
}
