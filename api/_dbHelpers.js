const JSON_FIELDS = {
  projects: ['title', 'location', 'status', 'description', 'features', 'gallery', 'units', 'payload'],
  services: ['title', 'description', 'payload'],
  blog_posts: ['title', 'content', 'excerpt', 'payload'],
  site_settings: ['company', 'stats', 'social', 'team', 'section_images'],
  translations: ['ar', 'en'],
}

const TABLE_COLUMNS = {
  projects: ['id', 'title', 'location', 'status', 'progress', 'description', 'features', 'cover_url', 'gallery', 'units', 'payload', 'sort_order', 'updated_at'],
  services: ['id', 'title', 'description', 'icon_url', 'payload', 'sort_order'],
  blog_posts: ['id', 'title', 'content', 'excerpt', 'cover_url', 'published_at', 'slug', 'payload', 'sort_order', 'updated_at'],
}

export function parseJsonField(value) {
  if (value == null) return value
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export function parseRow(table, row) {
  if (!row) return row
  const fields = JSON_FIELDS[table] || []
  const out = { ...row }
  for (const field of fields) {
    if (field in out) out[field] = parseJsonField(out[field])
  }
  return out
}

export function serializeValue(value) {
  if (value == null) return null
  if (typeof value === 'object') return JSON.stringify(value)
  return value
}

export function isJsonColumn(table, column) {
  return (JSON_FIELDS[table] || []).includes(column)
}

export function pickRow(table, row) {
  const columns = TABLE_COLUMNS[table]
  if (!columns) return row
  const out = {}
  for (const col of columns) {
    if (row[col] !== undefined) out[col] = serializeValue(row[col])
  }
  return out
}

export async function upsertRow(db, table, row) {
  const data = pickRow(table, row)
  const keys = Object.keys(data)
  if (!keys.length) return

  const placeholders = keys
    .map((k) => (isJsonColumn(table, k) ? '?::jsonb' : '?'))
    .join(', ')
  const updates = keys
    .filter((k) => k !== 'id')
    .map((k) => `${k} = EXCLUDED.${k}`)
    .join(', ')
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) ON CONFLICT (id) DO UPDATE SET ${updates}`
  await db.execute(sql, keys.map((k) => data[k]))
}

export function readBody(req) {
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
