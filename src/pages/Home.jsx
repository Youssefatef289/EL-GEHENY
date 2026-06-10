import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import WhyUs from '../sections/WhyUs'
import Vision from '../sections/Vision'
import FeaturedProjects from '../sections/FeaturedProjects'
import Partners from '../sections/Partners'
import SectionReveal from '../components/SectionReveal'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
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
