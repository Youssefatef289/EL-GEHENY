const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const JPEG_QUALITY = 0.85
const FALLBACK_MAX_BYTES = 900_000

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('تعذّر قراءة الصورة'))
    }
    img.src = url
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

export async function compressImageFile(file) {
  const img = await loadImageFromFile(file)
  let { width, height } = img
  const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1)
  width = Math.round(width * ratio)
  height = Math.round(height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
  let quality = JPEG_QUALITY
  let blob = await canvasToBlob(canvas, outputType, quality)

  while (blob && blob.size > FALLBACK_MAX_BYTES && quality > 0.45) {
    quality -= 0.08
    blob = await canvasToBlob(canvas, 'image/jpeg', quality)
  }

  if (!blob) throw new Error('فشل ضغط الصورة')

  const ext = outputType === 'image/png' ? 'png' : 'jpg'
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'cover'
  return new File([blob], `${baseName}.${ext}`, { type: blob.type || outputType })
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('فشل قراءة الصورة'))
    reader.readAsDataURL(file)
  })
}

export async function compressToDataUrl(file) {
  const compressed = await compressImageFile(file)
  return fileToDataUrl(compressed)
}
