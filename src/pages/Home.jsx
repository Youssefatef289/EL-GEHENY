import { lazy, Suspense } from 'react'
import Hero from '../sections/Hero'
import AboutGeheny from '../sections/AboutGeheny'
import WhyUs from '../sections/WhyUs'
import Vision from '../sections/Vision'
import Partners from '../sections/Partners'
import SectionReveal from '../components/SectionReveal'

const Services = lazy(() => import('../sections/Services'))
const ProjectsSlider = lazy(() => import('../sections/ProjectsSlider'))
const ProjectsShowcase = lazy(() => import('../sections/ProjectsShowcase'))

function SectionFallback({ minH = 'min-h-[12rem]' }) {
  return <div className={minH} aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      <Hero />
      <SectionReveal from="right">
        <AboutGeheny />
      </SectionReveal>
      <SectionReveal from="left">
        <WhyUs />
      </SectionReveal>
      <SectionReveal from="right">
        <Vision />
      </SectionReveal>
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback minH="min-h-[100svh]" />}>
        <ProjectsSlider />
      </Suspense>
      <Suspense fallback={<SectionFallback minH="min-h-[24rem]" />}>
        <ProjectsShowcase />
      </Suspense>
      <SectionReveal from="right">
        <Partners />
      </SectionReveal>
    </>
  )
}
