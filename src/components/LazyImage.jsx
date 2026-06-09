import { useState } from 'react'

// صورة مع Lazy Loading وتأثير ظهور تدريجي
export default function LazyImage({ src, alt, className = '', imgClassName = '', ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-navy-200 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy-200 to-navy-300" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ${
          loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        } ${imgClassName}`}
        {...props}
      />
    </div>
  )
}
