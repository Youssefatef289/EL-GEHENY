import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { STORAGE_KEYS } from './storage'

const SESSION_HOURS = 24
export const DEFAULT_CREDENTIALS = { username: 'admin', password: 'geheny2024' }

function getLocalCredentials() {
  if (typeof window === 'undefined') return DEFAULT_CREDENTIALS
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.credentials) || 'null') || DEFAULT_CREDENTIALS
  } catch {
    return DEFAULT_CREDENTIALS
  }
}

function saveLocalCredentials(credentials) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.credentials, JSON.stringify(credentials))
}

export async function adminLogin(username, password) {
  if (!isSupabaseConfigured() || !supabase) {
    const creds = getLocalCredentials()
    if (username !== creds.username || password !== creds.password) {
      return { success: false, ok: false, error: 'بيانات خاطئة' }
    }
    saveSession(username)
    return { success: true, ok: true }
  }

  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .eq('password_hash', password)
    .maybeSingle()

  if (error || !data) {
    return { success: false, ok: false, error: 'بيانات خاطئة' }
  }

  saveSession(data.username)
  return { success: true, ok: true }
}

function saveSession(username) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({
    username,
    expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
    expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  }))
}

export function isLoggedIn() {
  return isAuthenticated()
}

export function isAuthenticated() {
  const session = getSession()
  return Boolean(session)
}

export function getSession() {
  if (typeof window === 'undefined') return null
  try {
    const session = JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null')
    if (!session) return null
    const expires = session.expires ?? session.expiresAt
    if (!expires || Date.now() > expires) {
      adminLogout()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function adminLogout() {
  logout()
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.session)
}

export async function changePassword(username, newPassword) {
  if (!isSupabaseConfigured() || !supabase) {
    saveLocalCredentials({ username, password: newPassword })
    return true
  }
  const { error } = await supabase
    .from('admin_users')
    .update({ password_hash: newPassword })
    .eq('username', username)
  return !error
}

export async function login(username, password) {
  return adminLogin(username, password)
}

export function getCredentials() {
  return getLocalCredentials()
}

export function saveCredentials(credentials) {
  saveLocalCredentials(credentials)
}
