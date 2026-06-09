import { Link } from 'react-router-dom'
import logoImage from '../../images/Logo-removebg-preview.png'

export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex shrink-0 items-center">
      <img
        src={logoImage}
        alt="الجهيني للتطوير العقاري"
        className="h-16 w-auto max-w-[240px] object-contain drop-shadow-[0_4px_16px_rgba(15,23,34,0.12)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-20 sm:max-w-[300px]"
      />
    </Link>
  )
}
