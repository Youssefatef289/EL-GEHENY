import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}

export function isDbConfigured() {
  return Boolean(config.host && config.username && config.password)
}

export const db = isDbConfigured() ? connect(config) : null
