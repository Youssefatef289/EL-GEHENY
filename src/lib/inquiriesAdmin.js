import { inquiriesDB } from '../admin/storage'
import {
  isApiConfigured,
  fetchInquiriesApi,
  updateInquiryStatusApi,
  deleteInquiryApi,
} from './apiClient'

function normalizeInquiry(row) {
  if (!row) return row
  return {
    ...row,
    id: row.id,
    source: row.type === 'booking' ? 'project_detail' : (row.source || 'contact'),
    status: row.status || 'new',
  }
}

function mergeInquiries(...lists) {
  const map = new Map()
  for (const list of lists) {
    for (const item of list) {
      map.set(String(item.id), item)
    }
  }
  return [...map.values()].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export async function getAllInquiries() {
  const results = []

  if (isApiConfigured()) {
    try {
      const rows = await fetchInquiriesApi()
      results.push(...rows.map(normalizeInquiry))
    } catch (err) {
      console.error('API fetch inquiries failed:', err)
    }
  }

  const local = (await inquiriesDB.getAll()).map(normalizeInquiry)
  return mergeInquiries(results, local)
}

export async function updateInquiryStatus(id, status) {
  if (isApiConfigured()) {
    try {
      await updateInquiryStatusApi(id, status)
      return true
    } catch (err) {
      console.error('API status update failed:', err)
    }
  }
  return inquiriesDB.updateStatus(id, status)
}

export async function deleteInquiry(id) {
  if (isApiConfigured()) {
    try {
      await deleteInquiryApi(id)
      return true
    } catch (err) {
      console.error('API delete failed:', err)
    }
  }
  return inquiriesDB.delete(id)
}

export async function countNewInquiries() {
  const all = await getAllInquiries()
  return all.filter((item) => item.status === 'new').length
}
