import mysql from 'mysql2/promise'
import { neon } from '@neondatabase/serverless'

function isLocalMysql() {
  const host = process.env.DATABASE_HOST
  return host === '127.0.0.1' || host === 'localhost'
}

export function isDbConfigured() {
  if (isLocalMysql()) {
    return Boolean(
      process.env.DATABASE_HOST
      && process.env.DATABASE_USERNAME
      && process.env.DATABASE_PASSWORD,
    )
  }
  return Boolean(process.env.DATABASE_URL)
}

export function getDbDialect() {
  if (isLocalMysql()) return 'mysql'
  if (process.env.DATABASE_URL) return 'postgres'
  return null
}

function toPgPlaceholders(sql) {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

let cachedDb = null

function createMysqlDb() {
  const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'elgeheny',
    waitForConnections: true,
    connectionLimit: 10,
  })

  return {
    dialect: 'mysql',
    async execute(query, params = []) {
      const [result] = await pool.execute(query, params)
      if (Array.isArray(result)) {
        return { rows: result, insertId: null }
      }
      return { rows: [], insertId: result.insertId ?? null }
    },
  }
}

function createNeonDb() {
  const sql = neon(process.env.DATABASE_URL)
  return {
    dialect: 'postgres',
    async execute(query, params = []) {
      const pgSql = toPgPlaceholders(query)
      const rows = await sql.query(pgSql, params)
      const list = Array.isArray(rows) ? rows : []
      return { rows: list, insertId: list[0]?.id ?? null }
    },
  }
}

function getDb() {
  if (cachedDb) return cachedDb
  if (!isDbConfigured()) return null
  cachedDb = isLocalMysql() ? createMysqlDb() : createNeonDb()
  return cachedDb
}

// Lazy proxy so env vars from server.js dotenv are available before first query
export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      const instance = getDb()
      if (!instance) return prop === 'dialect' ? null : undefined
      const value = instance[prop]
      return typeof value === 'function' ? value.bind(instance) : value
    },
  },
)
