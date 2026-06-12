import Hero from '../sections/Hero'
import AboutGeheny from '../sections/AboutGeheny'
import WhyUs from '../sections/WhyUs'
import Vision from '../sections/Vision'
import FeaturedProjects from '../sections/FeaturedProjects'
import Partners from '../sections/Partners'
import SectionReveal from '../components/SectionReveal'

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
      <SectionReveal from="left">
        <FeaturedProjects />
      </SectionReveal>
      <SectionReveal from="right">
        <Partners />
      </SectionReveal>
    </>
  )
}
