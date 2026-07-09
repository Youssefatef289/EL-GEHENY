import { inquiriesDB } from '../admin/storage'

function normalizeInquiry(row) {
  if (!row) return row
  return {
    ...row,
    id: row.id,
    source: row.type === 'booking' ? 'project_detail' : (row.source || 'contact'),
    status: row.status || 'new',
  }
}

export async function getAllInquiries() {
  const rows = await inquiriesDB.getAll()
  return rows.map(normalizeInquiry)
}

export async function updateInquiryStatus(id, status) {
  return inquiriesDB.updateStatus(id, status)
}

export async function deleteInquiry(id) {
  return inquiriesDB.delete(id)
}

export async function countNewInquiries() {
  const all = await getAllInquiries()
  return all.filter((item) => item.status === 'new').length
}
