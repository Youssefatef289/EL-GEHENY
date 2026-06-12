import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n'

import alJarhi from '../../images/Partners in Success/Al-Jarhi Iron.jpeg'
import bitunil from '../../images/Partners in Success/bitunil.png'
import cementHelwan from '../../images/Partners in Success/Cement HeIwan.webp'
import cleopatra from '../../images/Partners in Success/cleopatra_logo.png'
import elsewedy from '../../images/Partners in Success/elsewedy_electric_ar.jpg'
import ezzsteel from '../../images/Partners in Success/ezzsteel.jpeg'
import jotun from '../../images/Partners in Success/jotun.png'
import kessel from '../../images/Partners in Success/kessel logo.webp'
import knauf from '../../images/Partners in Success/KNAUF_Logo_2024.svg.png'
import vodafone from '../../images/Partners in Success/logo Vodafone.png'
import we from '../../images/Partners in Success/logo we.png'
import prima from '../../images/Partners in Success/Prima-Elios-Egypt-30013-1518532901-og.webp'
import sika from '../../images/Partners in Success/Sika.webp'
import suezSteel from '../../images/Partners in Success/suez-steel-logo.jpg'
import tourah from '../../images/Partners in Success/Tourah Cement logo.webp'
import venus from '../../images/Partners in Success/venus.jpeg'

const partners = [
  { src: venus, name: 'Venus' },
  { src: suezSteel, name: 'Suez Steel' },
  { src: ezzsteel, name: 'Ezz Steel' },
  { src: alJarhi, name: 'Al-Jarhi Iron' },
  { src: elsewedy, name: 'Elsewedy Electric' },
  { src: vodafone, name: 'Vodafone' },
  { src: we, name: 'WE' },
  { src: knauf, name: 'Knauf' },
  { src: jotun, name: 'Jotun' },
  { src: sika, name: 'Sika' },
  { src: cleopatra, name: 'Ceramica Cleopatra' },
  { src: bitunil, name: 'BituNil' },
  { src: kessel, name: 'Kessel' },
  { src: prima, name: 'Prima Elios' },
  { src: cementHelwan, name: 'Helwan Cement' },
  { src: tourah, name: 'Tourah Cement' },
]

function PartnerCard({ partner }) {
  return (
    <div className="card-3d group relative mr-5 flex h-28 w-48 flex-shrink-0 items-center justify-center rounded-2xl border border-primary-200/60 bg-surface/85 p-5 shadow-[0_24px_60px_-45px_rgba(15,23,34,0.5)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.05] sm:mr-6 sm:h-32 sm:w-56">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent" />
      <img
        src={partner.src}
        alt={partner.name}
        loading="lazy"
        draggable="false"
        className="max-h-16 max-w-[80%] object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-20"
        style={{ transform: 'translateZ(40px)' }}
      />
    </div>
  )
}

export default function Partners() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()
  const loop = [...partners, ...partners]

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-400/15 blur-[130px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow={t('partners.eyebrow')}
          title={t('partners.title')}
          description={t('partners.description')}
        />
      </div>

      <div className="perspective relative mt-14" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fcfbf7] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fcfbf7] to-transparent sm:w-28" />

        <div className="[transform:rotateX(9deg)]">
          <motion.div
            className="flex w-max"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 34, ease: 'linear', repeat: Infinity }
            }
          >
            {loop.map((partner, index) => (
              <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
