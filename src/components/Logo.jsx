import { Link } from 'react-router-dom'
import logoImage from '../../images/Logo.png'

export default function Logo({ onClick, compact = false, className = '' }) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex shrink-0 items-center">
      <img
        src={logoImage}
        alt="الجهيني للتطوير العقاري"
        className={`w-auto object-contain drop-shadow-[0_4px_16px_rgba(15,23,34,0.12)] transition-transform duration-300 group-hover:scale-[1.03] ${
          compact
            ? 'h-14 max-w-[190px] sm:h-16 sm:max-w-[225px] lg:h-20 lg:max-w-[300px]'
            : 'h-16 max-w-[240px] sm:h-20 sm:max-w-[300px]'
        } ${className}`}
      />
    </Link>
  )
}
