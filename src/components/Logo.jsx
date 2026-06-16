import { Link } from 'react-router-dom'
import logoImage from '../../images/Logo.png'

export default function Logo({ onClick, compact = false, className = '' }) {
  const sizeClass =
    className ||
    (compact
      ? 'h-20 max-w-[280px] sm:h-24 sm:max-w-[340px] lg:h-24 lg:max-w-[360px]'
      : 'h-16 max-w-[240px] sm:h-20 sm:max-w-[300px]')

  return (
    <Link to="/" onClick={onClick} className="group inline-flex shrink-0 items-center">
      <img
        src={logoImage}
        alt="الجهيني للتطوير العقاري"
        className={`object-cover drop-shadow-[0_4px_16px_rgba(15,23,34,0.12)] transition-transform duration-300 group-hover:scale-[1.03] ${sizeClass}`}
      />
    </Link>
  )
}
