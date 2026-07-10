// Client API layer for Vercel serverless (/api/*) and local Express (server.js).
// Enable with VITE_API_ENABLED=true

const TOKEN_KEY = 'elgeheny_admin_token'
const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || ''

export function isApiConfigured() {
  return import.meta.env.VITE_API_ENABLED === 'true' || Boolean(API_BASE)
}

export function getAdminToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  if (typeof window === 'undefined') return
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function apiFetch(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = getAdminToken()
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body && typeof options.body === 'object'
      ? JSON.stringify(options.body)
      : options.body,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    const error = new Error(data?.error || `Request failed (${res.status})`)
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export async function loginApi(username, password) {
  return apiFetch('/api/auth', {
    method: 'POST',
    body: { username, password },
  })
}

export async function fetchCmsTable(table) {
  const data = await apiFetch(`/api/cms?table=${encodeURIComponent(table)}`)
  return data.data
}

export async function cmsWrite(table, action, payload) {
  return apiFetch('/api/cms-write', {
    method: 'POST',
    body: { table, action, payload },
  })
}

export async function fetchInquiriesApi() {
  const data = await apiFetch('/api/inquiries')
  return data.inquiries || []
}

export async function submitInquiryApi(payload) {
  return apiFetch('/api/inquiries', {
    method: 'POST',
    body: payload,
  })
}

export async function updateInquiryStatusApi(id, status) {
  return apiFetch('/api/inquiry-status', {
    method: 'PATCH',
    body: { id, status },
  })
}

export async function deleteInquiryApi(id) {
  return apiFetch('/api/inquiries', {
    method: 'DELETE',
    body: { id },
  })
}
