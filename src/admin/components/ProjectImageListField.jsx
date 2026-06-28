import { useState } from 'react'
import { uploadResultMessage } from '../../lib/uploadImage'

export function ProjectImageListField({
  label,
  description,
  images = [],
  onChange,
  onUpload,
  multiple = true,
}) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return

    setError('')
    setUploading(true)
    try {
      const next = [...images]
      for (const file of files) {
        const result = await onUpload(file)
        next.push(result.url)
      }
      onChange(next)
    } catch (err) {
      setError(err.message || 'فشل رفع الصور')
    } finally {
      setUploading(false)
    }
  }

  const addUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    onChange([...images, url])
    setUrlInput('')
  }

  const removeAt = (index) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
      <div>
        <p className="text-sm font-bold text-[#1a1a2e]">{label}</p>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, index) => (
            <div key={`${index}-${src.slice(0, 24)}`} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
              <img src={src} alt="" className="h-28 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute left-2 top-2 rounded-lg bg-red-600/90 px-2 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">لا توجد صور بعد</p>
      )}

      <div className="flex flex-wrap gap-2">
        <label className={`admin-btn-secondary cursor-pointer ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
          {uploading ? 'جاري الرفع...' : multiple ? 'رفع صور' : 'رفع صورة'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            multiple={multiple}
            disabled={uploading}
            onChange={handleFiles}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          className="admin-input min-w-0 flex-1"
          dir="ltr"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://..."
        />
        <button type="button" onClick={addUrl} className="admin-btn-secondary">إضافة رابط</button>
      </div>

      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
    </div>
  )
}
