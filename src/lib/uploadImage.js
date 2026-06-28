import { supabase, isSupabaseConfigured } from './supabase'
import { compressImageFile, compressToDataUrl } from './imageCompress'

export const PROJECT_IMAGES_BUCKET = 'project-images'
const MAX_BYTES = 5 * 1024 * 1024

function isBucketMissing(error) {
  const msg = error?.message?.toLowerCase() || ''
  return msg.includes('bucket not found') || error?.statusCode === '404'
}

async function uploadToStorage(file, projectId) {
  const safeId = String(projectId || 'misc').replace(/[^a-zA-Z0-9-_]/g, '_')
  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const path = `${safeId}/cover-${Date.now()}.${ext}`

  const { error } = await supabase.storage.from(PROJECT_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type || 'image/jpeg',
  })

  if (error) throw error

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, method: 'storage' }
}

/**
 * Upload project cover — tries Supabase Storage first, falls back to compressed data URL in DB.
 */
export async function uploadProjectCover(file, projectId) {
  if (!file?.type?.startsWith('image/')) {
    throw new Error('الملف يجب أن يكون صورة (JPG, PNG, WebP)')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('حجم الصورة يجب أن يكون أقل من 5MB')
  }

  const compressed = await compressImageFile(file)

  if (isSupabaseConfigured() && supabase) {
    try {
      return await uploadToStorage(compressed, projectId)
    } catch (error) {
      if (!isBucketMissing(error)) {
        throw new Error(error.message || 'فشل رفع الصورة')
      }
    }
  }

  const dataUrl = await compressToDataUrl(file)
  return { url: dataUrl, method: 'inline' }
}

export function coverPreviewUrl(cover) {
  return typeof cover === 'string' && cover.trim() ? cover.trim() : ''
}

export function uploadResultMessage(result) {
  if (result.method === 'storage') return 'تم رفع الصورة ✓'
  return 'تم حفظ الصورة ✓ (مخزّنة مع بيانات المشروع)'
}
