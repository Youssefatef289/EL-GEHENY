import { supabase, isSupabaseConfigured } from './supabase'

export const PROJECT_IMAGES_BUCKET = 'project-images'
const MAX_BYTES = 5 * 1024 * 1024

export async function uploadProjectCover(file, projectId) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase غير مُعد — استخدم رابط صورة مباشر')
  }
  if (!file?.type?.startsWith('image/')) {
    throw new Error('الملف يجب أن يكون صورة (JPG, PNG, WebP)')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('حجم الصورة يجب أن يكون أقل من 5MB')
  }

  const safeId = String(projectId || 'misc').replace(/[^a-zA-Z0-9-_]/g, '_')
  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const path = `${safeId}/cover-${Date.now()}.${ext}`

  const { error } = await supabase.storage.from(PROJECT_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type,
  })

  if (error) {
    if (error.message?.includes('Bucket not found')) {
      throw new Error('مجلد الصور غير موجود — شغّل supabase/storage.sql في SQL Editor')
    }
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export function coverPreviewUrl(cover) {
  return typeof cover === 'string' && cover.trim() ? cover.trim() : ''
}
