import { useState } from 'react'

// صورة مع Lazy Loading وتأثير ظهور تدريجي
// fit="contain" — عرض كامل بالعرض مع الحفاظ على أبعاد الصورة
export default function LazyImage({ src, alt, className = '', imgClassName = '', fit = 'cover', ...props }) {
  const [loaded, setLoaded] = useState(false)
  const isContain = fit === 'contain'

  return (
    <div
      className={`relative ${isContain ? 'w-full bg-transparent' : 'overflow-hidden bg-navy-200'} ${className}`}
    >
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-white/10 ${
            isContain ? 'min-h-[10rem]' : ''
          }`}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={
          isContain
            ? `block h-auto w-full max-w-full object-contain transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              } ${imgClassName}`
            : `h-full w-full object-cover transition-all duration-700 ${
                loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              } ${imgClassName}`
        }
        {...props}
      />
    </div>
  )
}
