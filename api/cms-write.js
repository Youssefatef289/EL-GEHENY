import { db, isDbConfigured } from './db.js'
import { applyCors, handleOptions, requireAuth, sendJson } from './_utils.js'
import { readBody, upsertRow, serializeValue, jsonPlaceholder } from './_dbHelpers.js'

const LIST_TABLES = new Set(['projects', 'services', 'blog_posts'])

export default async function handler(req, res) {
  applyCors(req, res)
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  if (!requireAuth(req, res)) return

  if (!isDbConfigured() || !db) {
    return sendJson(res, 503, { error: 'Database not configured' })
  }

  const { table, action, payload } = readBody(req)
  if (!table || !action) {
    return sendJson(res, 400, { error: 'Missing table or action' })
  }

  try {
    if (LIST_TABLES.has(table)) {
      if (action === 'upsert') {
        const rows = Array.isArray(payload) ? payload : [payload]
        for (const row of rows) {
          if (row?.id) await upsertRow(db, table, row)
        }
        return sendJson(res, 200, { success: true })
      }

      if (action === 'delete') {
        const id = payload?.id
        if (!id) return sendJson(res, 400, { error: 'Missing id' })
        await db.execute(`DELETE FROM ${table} WHERE id = ?`, [id])
        return sendJson(res, 200, { success: true })
      }

      if (action === 'clear') {
        await db.execute(`DELETE FROM ${table} WHERE sort_order >= -1`)
        return sendJson(res, 200, { success: true })
      }
    }

    if (table === 'site_settings' && action === 'save') {
      const fields = ['company', 'stats', 'social', 'team', 'section_images']
      const sets = []
      const values = []
      for (const field of fields) {
        if (payload?.[field] !== undefined) {
          sets.push(`${field} = ${jsonPlaceholder(db, 'site_settings', field)}`)
          values.push(serializeValue(payload[field]))
        }
      }
      if (!sets.length) return sendJson(res, 400, { error: 'Nothing to save' })
      const ts = db.dialect === 'mysql' ? 'CURRENT_TIMESTAMP' : 'NOW()'
      await db.execute(
        `UPDATE site_settings SET ${sets.join(', ')}, updated_at = ${ts} WHERE id = 'main'`,
        values,
      )
      return sendJson(res, 200, { success: true })
    }

    if (table === 'translations' && action === 'save') {
      const cast = db.dialect === 'mysql' ? '?' : '?::jsonb'
      const ts = db.dialect === 'mysql' ? 'CURRENT_TIMESTAMP' : 'NOW()'
      await db.execute(
        `UPDATE translations SET ar = ${cast}, en = ${cast}, updated_at = ${ts} WHERE id = 'main'`,
        [serializeValue(payload?.ar ?? {}), serializeValue(payload?.en ?? {})],
      )
      return sendJson(res, 200, { success: true })
    }

    return sendJson(res, 400, { error: 'Invalid table or action' })
  } catch (err) {
    return sendJson(res, 500, { error: err.message || 'Write failed' })
  }
}
