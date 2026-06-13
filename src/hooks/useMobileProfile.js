import { useEffect, useState } from 'react'

export function useMobileProfile() {
  const [profile, setProfile] = useState({
    isMobile: false,
    isSmallMobile: false,
    reduceMotion: false,
    prefersLightAnim: false,
  })

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 768px)')
    const smallMq = window.matchMedia('(max-width: 390px)')
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      const isMobile = mobileMq.matches
      setProfile({
        isMobile,
        isSmallMobile: smallMq.matches,
        reduceMotion: reduceMq.matches,
        prefersLightAnim: isMobile || reduceMq.matches,
      })
    }

    update()
    mobileMq.addEventListener('change', update)
    smallMq.addEventListener('change', update)
    reduceMq.addEventListener('change', update)

    return () => {
      mobileMq.removeEventListener('change', update)
      smallMq.removeEventListener('change', update)
      reduceMq.removeEventListener('change', update)
    }
  }, [])

  return profile
}
