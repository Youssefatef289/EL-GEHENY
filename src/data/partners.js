import alJarhi from '../../images/Partners in Success/Al-Jarhi Iron.jpeg'
import bitunil from '../../images/Partners in Success/bitunil.png'
import cementHelwan from '../../images/Partners in Success/Cement_HeIwan-removebg-preview.png'
import cleopatra from '../../images/Partners in Success/cleopatra_logo.png'
import elsewedy from '../../images/Partners in Success/elsewedy_electric_ar-removebg-preview.png'
import ezzsteel from '../../images/Partners in Success/ezzsteel.jpeg'
import jotun from '../../images/Partners in Success/jotun.png'
import kessel from '../../images/Partners in Success/kessel logo.webp'
import knauf from '../../images/Partners in Success/KNAUF_Logo_2024.svg.png'
import vodafone from '../../images/Partners in Success/logo_Vodafone-removebg-preview.png'
import we from '../../images/Partners in Success/logo_we-removebg-preview.png'
import prima from '../../images/Partners in Success/Prima-Elios-Egypt-30013-1518532901-og-removebg-preview.png'
import sika from '../../images/Partners in Success/Sika-removebg-preview.png'
import suezSteel from '../../images/Partners in Success/SUEZ_STEEL_CO.-removebg-preview.png'
import tourah from '../../images/Partners in Success/Tourah_Cement_logo-removebg-preview.png'

export const defaultPartners = [
  { src: alJarhi, name: 'Al-Jarhi Iron' },
  { src: bitunil, name: 'BituNil' },
  { src: cementHelwan, name: 'Helwan Cement', lightBg: true },
  { src: cleopatra, name: 'Ceramica Cleopatra' },
  { src: elsewedy, name: 'Elsewedy Electric', lightBg: true },
  { src: ezzsteel, name: 'Ezz Steel' },
  { src: jotun, name: 'Jotun' },
  { src: kessel, name: 'Kessel' },
  { src: knauf, name: 'Knauf' },
  { src: vodafone, name: 'Vodafone' },
  { src: we, name: 'WE' },
  { src: prima, name: 'Prima Elios', lightBg: true },
  { src: sika, name: 'Sika' },
  { src: suezSteel, name: 'Suez Steel' },
  { src: tourah, name: 'Tourah Cement', lightBg: true },
]

export function getPartnersList(overrides = {}) {
  const custom = overrides['partners.logos']
  if (Array.isArray(custom) && custom.length > 0) {
    return custom
      .filter((src) => typeof src === 'string' && src.trim())
      .map((src, i) => ({
        src: src.trim(),
        name: defaultPartners[i]?.name || `Partner ${i + 1}`,
        lightBg: defaultPartners[i]?.lightBg ?? false,
      }))
  }
  return defaultPartners
}
