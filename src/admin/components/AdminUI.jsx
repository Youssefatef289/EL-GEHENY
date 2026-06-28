import { createContext, useCallback, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 start-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className={`pointer-events-auto rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${
                toast.type === 'error'
                  ? 'bg-red-600 text-white'
                  : 'bg-[#c8a95a] text-[#0f0f1a]'
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-[#1a1a2e]">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="admin-btn-secondary">
            إلغاء
          </button>
          <button type="button" onClick={onConfirm} className="admin-btn-danger">
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  )
}

export function BilingualInput({ label, value, onChange, multiline = false }) {
  const Input = multiline ? 'textarea' : 'input'
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-[#1a1a2e]">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs font-semibold text-gray-500">عربي</span>
          <Input
            value={value?.ar ?? ''}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
            className="admin-input"
            rows={multiline ? 4 : undefined}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-semibold text-gray-500">English</span>
          <Input
            value={value?.en ?? ''}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            className="admin-input"
            dir="ltr"
            rows={multiline ? 4 : undefined}
          />
        </label>
      </div>
    </div>
  )
}

export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e] sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function ImageUploadField({ label, value, onChange, onUpload, hint }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const preview = typeof value === 'string' ? value : ''

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const url = await onUpload(file)
      onChange(url)
    } catch (err) {
      setError(err.message || 'فشل رفع الصورة')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-[#1a1a2e]">{label}</p>
      {preview ? (
        <img
          src={preview}
          alt=""
          className="h-44 w-full max-w-md rounded-xl border border-gray-200 object-cover"
        />
      ) : (
        <div className="flex h-44 w-full max-w-md items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
          لا توجد صورة
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className={`admin-btn-secondary cursor-pointer ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
          {uploading ? 'جاري الرفع...' : 'رفع صورة من الجهاز'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
        {preview && (
          <button type="button" onClick={() => onChange('')} className="admin-btn-secondary">
            حذف الصورة
          </button>
        )}
      </div>
      <label className="block space-y-1">
        <span className="text-xs font-semibold text-gray-500">أو أدخل رابط الصورة</span>
        <input
          className="admin-input"
          dir="ltr"
          value={preview}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
        />
      </label>
      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
}
