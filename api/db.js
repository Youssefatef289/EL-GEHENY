import { neon } from '@neondatabase/serverless'

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL)
}

function toPgPlaceholders(sql) {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

function createDb() {
  const sql = neon(process.env.DATABASE_URL)
  return {
    async execute(query, params = []) {
      const pgSql = toPgPlaceholders(query)
      const rows = await sql.query(pgSql, params)
      const list = Array.isArray(rows) ? rows : []
      const insertId = list[0]?.id ?? null
      return { rows: list, insertId }
    },
  }
}

export const db = isDbConfigured() ? createDb() : null
