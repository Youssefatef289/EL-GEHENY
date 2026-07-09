import { compressImageFile, compressToDataUrl } from './imageCompress'

const MAX_BYTES = 5 * 1024 * 1024

async function uploadImage(file, projectId, subfolder) {
  if (!file?.type?.startsWith('image/')) {
    throw new Error('الملف يجب أن يكون صورة (JPG, PNG, WebP)')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('حجم الصورة يجب أن يكون أقل من 5MB')
  }

  await compressImageFile(file)
  const dataUrl = await compressToDataUrl(file)
  return { url: dataUrl, method: 'inline' }
}

export async function uploadSectionImage(file, sectionId, imageKey) {
  return uploadImage(file, `section-${sectionId}`, imageKey)
}

export async function uploadTeamImage(file, memberId) {
  return uploadImage(file, `team-${memberId}`, 'photo')
}

export async function uploadProjectCover(file, projectId) {
  return uploadImage(file, projectId, 'cover')
}

export async function uploadProjectImage(file, projectId, category = 'gallery') {
  return uploadImage(file, projectId, category)
}

export function coverPreviewUrl(cover) {
  return typeof cover === 'string' && cover.trim() ? cover.trim() : ''
}

export function normalizeImageList(list) {
  if (!Array.isArray(list)) return []
  return list.filter((url) => typeof url === 'string' && url.trim()).map((url) => url.trim())
}

export function uploadResultMessage() {
  return 'تم حفظ الصورة ✓'
}
