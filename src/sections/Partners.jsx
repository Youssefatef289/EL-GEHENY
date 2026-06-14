import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n'

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

const partners = [
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

function PartnerLogo({ partner }) {
  const imgClass =
    'max-h-10 w-auto max-w-full object-contain transition-all duration-300 ease-out sm:max-h-20 md:max-h-24 lg:max-h-28'

  const img = (
    <img
      src={partner.src}
      alt={partner.name}
      loading="lazy"
      draggable={false}
      className={`${imgClass} grayscale group-hover:scale-105 group-hover:grayscale-0`}
    />
  )

  if (partner.lightBg) {
    return (
      <div className="group flex h-20 w-44 flex-shrink-0 items-center justify-center px-3 sm:h-24 sm:w-52 md:h-28 md:w-60 lg:h-32 lg:w-64">
        <div className="flex h-[4.5rem] w-full items-center justify-center rounded-xl border border-white/10 bg-white px-4 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-primary-400/30 group-hover:shadow-[0_12px_32px_-10px_rgba(202,161,63,0.35)] sm:h-[5.5rem] sm:rounded-2xl sm:px-5 sm:py-4 md:h-[6.5rem] lg:h-[7rem]">
          {img}
        </div>
      </div>
    )
  }

  return (
    <div className="group flex h-20 w-44 flex-shrink-0 items-center justify-center px-5 sm:h-24 sm:w-52 md:h-28 md:w-60 lg:h-32 lg:w-64">
      {img}
    </div>
  )
}

export default function Partners() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()
  const loop = [...partners, ...partners]

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-20">
      <div className="container-x relative mb-10 sm:mb-12">
        <SectionHeading
          eyebrow={t('partners.eyebrow')}
          title={t('partners.title')}
          description={t('partners.description')}
        />
      </div>

      <div className="border-y border-white/20 bg-ink" dir="ltr">
        <div className="relative overflow-hidden py-10 sm:py-12 md:py-14">
          {reduceMotion ? (
            <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-8">
              {partners.map((partner) => (
                <PartnerLogo key={partner.name} partner={partner} />
              ))}
            </div>
          ) : (
            <motion.div
              className="flex w-max items-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
              {loop.map((partner, index) => (
                <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
