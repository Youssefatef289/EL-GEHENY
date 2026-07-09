import { STORAGE_KEYS } from './storage'
import { isApiConfigured, loginApi, setAdminToken } from '../lib/apiClient'

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

function matchLocalCredentials(username, password) {
  const creds = getLocalCredentials()
  return username === creds.username && password === creds.password
}

function saveSession(username) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({
    username,
    expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
    expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  }))
}

async function loginViaApi(username, password) {
  try {
    const data = await loginApi(username, password)
    if (data?.token) {
      setAdminToken(data.token)
      saveSession(data.username || username)
      return { success: true, ok: true }
    }
  } catch {
    // API unavailable — fall back to local credentials
  }
  return null
}

// Login order: 1) PlanetScale JWT API  2) local credentials (admin/geheny2024)
// CMS content still loads from Supabase separately via storage.js
export async function adminLogin(username, password) {
  if (isApiConfigured()) {
    const apiResult = await loginViaApi(username, password)
    if (apiResult) return apiResult
  }

  if (!matchLocalCredentials(username, password)) {
    return { success: false, ok: false, error: 'بيانات الدخول غير صحيحة' }
  }

  saveSession(username)
  return {
    success: true,
    ok: true,
    apiOffline: isApiConfigured(),
  }
}

export function isLoggedIn() {
  return isAuthenticated()
}

export function isAuthenticated() {
  return Boolean(getSession())
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
  setAdminToken(null)
}

export async function changePassword(username, newPassword) {
  saveLocalCredentials({ username, password: newPassword })
  return true
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
